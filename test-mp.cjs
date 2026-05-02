const fs = require('fs');
const crypto = require('crypto');
const env = fs.readFileSync('.env', 'utf8');
const token = env.split('\n').find(l => l.startsWith('MERCADOPAGO_ACCESS_TOKEN')).split('=')[1].replace(/['"\r]/g, '');
fetch('https://api.mercadopago.com/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'X-Idempotency-Key': crypto.randomUUID()
  },
  body: JSON.stringify({
    type: 'online',
    total_amount: '1.00',
    external_reference: 'ext_ref_test123',
    processing_mode: 'automatic',
    transactions: {
      payments: [
        {
          amount: '1.00',
          payment_method: {
            id: 'pix',
            type: 'bank_transfer'
          }
        }
      ]
    },
    payer: {
      email: 'test@testuser.com'
    }
  })
}).then(r => r.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error);
