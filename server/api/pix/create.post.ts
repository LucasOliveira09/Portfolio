import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let { name, amount, email, url } = body;

  // 1. Segurança: Sanitização básica
  name = name?.trim();
  amount = Number(amount);
  email = email?.trim();
  url = url?.trim();

  if (!name || name.length > 50) {
    throw createError({ statusCode: 400, statusMessage: 'Nome inválido ou muito longo (max 50 caracteres).' });
  }

  if (!email || !email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'E-mail inválido.' });
  }

  // 2. Segurança: Valor mínimo
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
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const externalReference = crypto.randomUUID();

    // Separando o nome para evitar erros de validação da API
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').slice(1).join(' ') || 'Doador';

    const origin = getRequestURL(event).origin;
    const notificationUrl = `${origin}/api/pix/webhook`;

    // Payload enxuto e específico para PIX
    const paymentResponse = await payment.create({
      body: {
        transaction_amount: amount,
        description: `Doação de ${name} para o NoShortVideos`,
        payment_method_id: 'pix',
        external_reference: externalReference,
        notification_url: notificationUrl,
        payer: {
          email: email,
          first_name: firstName,
          last_name: lastName
        }
      },
      requestOptions: {
        idempotencyKey: crypto.randomUUID()
      }
    });

    const paymentId = paymentResponse.id?.toString();

    if (paymentId) {
      // Gravar no banco de forma segura.
      await supabase.from('donations').insert({
        name,
        amount: amount,
        status: 'pending',
        payment_id: externalReference,
        url: url || null,
      });
    }

    return {
      qr_code_base64: paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64,
      qr_code: paymentResponse.point_of_interaction?.transaction_data?.qr_code,
      payment_id: externalReference
    };

  } catch (error: any) {
    console.error('MercadoPago Error:', error);

    // Simplificando o repasse do erro para facilitar o debug se der problema de novo
    const mpErrorMessage = error?.message || 'Erro interno ao gerar PIX no Mercado Pago.';

    throw createError({
      statusCode: 500,
      statusMessage: mpErrorMessage
    });
  }
});