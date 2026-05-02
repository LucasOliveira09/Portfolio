import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let { name, amount, email } = body;

  // 1. Segurança: Sanitização básica
  name = name?.trim();
  amount = Number(amount);
  email = email?.trim();

  if (!name || name.length > 50) {
    throw createError({ statusCode: 400, statusMessage: 'Nome inválido ou muito longo (max 50 caracteres).' });
  }

  if (!email || !email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'E-mail inválido.' });
  }

  // 2. Segurança: Valor mínimo (Ex: R$ 1,00 para evitar spam de R$ 0,01)
  if (!amount || isNaN(amount) || amount < 1) {
    throw createError({ statusCode: 400, statusMessage: 'O valor mínimo para doação é R$ 1,00.' });
  }

  const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!mpAccessToken) {
    throw createError({ statusCode: 500, statusMessage: 'Credenciais do Mercado Pago não configuradas no servidor.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const externalReference = crypto.randomUUID();

    const orderPayload = {
      type: "online",
      total_amount: amount.toFixed(2),
      external_reference: externalReference,
      processing_mode: "automatic",
      transactions: {
        payments: [
          {
            amount: amount.toFixed(2),
            payment_method: {
              id: "pix",
              type: "bank_transfer"
            },
            expiration_time: "P3Y6M4DT12H30M5S"
          }
        ]
      },
      payer: {
        email: email
      }
    };

    const idempotencyKey = crypto.randomUUID();

    const response = await $fetch('https://api.mercadopago.com/v1/orders', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mpAccessToken}`,
        'X-Idempotency-Key': idempotencyKey
      },
      body: orderPayload
    });

    // Pega os dados do pagamento da resposta (Pode variar um pouco na documentação do /orders, mas tentamos os caminhos mais comuns)
    const payment = response?.transactions?.payments?.[0] || response;
    const paymentId = payment?.id?.toString() || response?.id?.toString();
    const qrCode = payment?.point_of_interaction?.transaction_data?.qr_code || payment?.qr_code;
    const qrCodeBase64 = payment?.point_of_interaction?.transaction_data?.qr_code_base64 || payment?.qr_code_base64;

    if (paymentId) {
      // Gravar no banco de forma segura. NOTA: Email NÃO é salvo por privacidade.
      await supabase.from('donations').insert({
        name,
        amount: amount,
        status: 'pending',
        payment_id: externalReference, // Salvamos o externalReference para linkar depois no webhook
      });
    }

    return {
      qr_code_base64: qrCodeBase64,
      qr_code: qrCode,
      payment_id: externalReference
    };
  } catch (error: any) {
    console.error('MercadoPago Error:', error.data || error);
    throw createError({ statusCode: 500, statusMessage: 'Erro interno ao gerar PIX via Orders.' });
  }
});
