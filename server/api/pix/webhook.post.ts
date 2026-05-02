import { createClient } from '@supabase/supabase-js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const type = query.type || query.topic;
  const id = query['data.id'] || query.id;

  if (!id || type !== 'payment') {
    return { status: 'ignored' };
  }

  const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!mpAccessToken) return { status: 'ignored' };

  const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
  const payment = new Payment(client);

  const supabaseUrl = process.env.SUPABASE_URL || '';
  // 1. Segurança: A atualização via Webhook requer a SUPABASE_SERVICE_KEY para bypassar o RLS do banco
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 2. Segurança: Buscamos a informação REAL direto na API do Mercado Pago
    // Isso previne que alguém dispare um webhook falso simulando um pagamento aprovado
    const paymentData = await payment.get({ id: String(id) });
    
    if (paymentData.status === 'approved' && paymentData.external_reference) {
      // 3. Segurança: Atualiza o banco garantindo que a quantia anotada é exatamente a que o Mercado Pago recebeu
      await supabase
        .from('donations')
        .update({ 
          status: 'approved',
          amount: paymentData.transaction_amount // Sobrescreve pelo valor real que caiu na conta
        })
        .eq('payment_id', paymentData.external_reference);
    }

    return { status: 'success' };
  } catch (error) {
    console.error('Webhook Error:', error);
    return { status: 'error' };
  }
});
