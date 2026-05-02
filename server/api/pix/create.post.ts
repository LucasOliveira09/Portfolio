import { MercadoPagoConfig, Payment } from 'mercadopago';
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

  const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
  const payment = new Payment(client);

  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const externalReference = crypto.randomUUID();

    const paymentResponse = await payment.create({
      body: {
        transaction_amount: amount,
        description: `Doação de ${name} para o NoShortVideos`,
        payment_method_id: 'pix',
        external_reference: externalReference,
        statement_descriptor: 'NOSHORTVIDS', // Aparece na fatura (Recomendação MP)
        payer: {
          email: email,
          first_name: name,
        },
        additional_info: {
          items: [
            {
              id: 'donation', // Código do item
              title: 'Apoio Projeto NoShortVideos', // Nome do item
              description: `Doação feita por ${name}`, // Descrição
              category_id: 'donations', // Categoria
              quantity: 1, // Quantidade
              unit_price: amount // Preço
            }
          ]
        }
      },
      requestOptions: {
        idempotencyKey: crypto.randomUUID()
      }
    });

    const paymentId = paymentResponse.id?.toString();

    if (paymentId) {
      // Gravar no banco de forma segura. NOTA: Email NÃO é salvo por privacidade.
      await supabase.from('donations').insert({
        name,
        amount: amount,
        status: 'pending',
        payment_id: externalReference, // Salvamos o externalReference para bater com o webhook
      });
    }

    return {
      qr_code_base64: paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64,
      qr_code: paymentResponse.point_of_interaction?.transaction_data?.qr_code,
      payment_id: externalReference
    };
  } catch (error: any) {
    console.error('MercadoPago Error:', error.data || error);
    
    // Tenta extrair a mensagem de erro específica do Mercado Pago
    const mpErrorMessage = error?.data?.errors?.[0]?.message || error?.data?.message || error?.message || 'Erro interno ao gerar PIX.';
    
    throw createError({ 
      statusCode: error?.response?.status || 500, 
      statusMessage: mpErrorMessage
    });
  }
});
