import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let { name, amount } = body;

  // 1. Segurança: Sanitização básica
  name = name?.trim();
  amount = Number(amount);

  if (!name || name.length > 50) {
    throw createError({ statusCode: 400, statusMessage: 'Nome inválido ou muito longo (max 50 caracteres).' });
  }

  // 2. Segurança: Valor mínimo (Ex: R$ 1,00 para evitar spam de R$ 0,01)
  if (!amount || isNaN(amount) || amount < 1) {
    throw createError({ statusCode: 400, statusMessage: 'O valor mínimo para doação é R$ 1,00.' });
  }

  const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!mpAccessToken) {
    throw createError({ statusCode: 500, statusMessage: 'Credenciais do Mercado Pago não configuradas no servidor.' });
  }

  const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
  const payment = new Payment(client);

  const supabaseUrl = process.env.SUPABASE_URL || '';
  // IMPORTANTE: Para inserir no banco, a API Nuxt usa a SERVICE_KEY se estiver disponível
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const paymentResponse = await payment.create({
      body: {
        transaction_amount: amount,
        description: `Doação de ${name} para o NoShortVideos`,
        payment_method_id: 'pix',
        payer: {
          email: 'doador@noshortsvideos.com', // Obrigatório no MP
          first_name: name,
        },
      }
    });

    const paymentId = paymentResponse.id?.toString();

    if (paymentId) {
      // Gravar no banco de forma segura
      await supabase.from('donations').insert({
        name,
        amount: amount,
        status: 'pending',
        payment_id: paymentId,
      });
    }

    return {
      qr_code_base64: paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64,
      qr_code: paymentResponse.point_of_interaction?.transaction_data?.qr_code,
      payment_id: paymentId
    };
  } catch (error: any) {
    console.error('MercadoPago Error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Erro interno ao gerar PIX.' });
  }
});
