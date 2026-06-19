const fs = require('fs');
const path = require('path');

// Manually load env variables from .env
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      let val = parts.slice(1).join('=').trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  });
}

async function run() {
  console.log('Testing Paystack API initialization...');
  console.log('PAYSTACK_SECRET_KEY:', process.env.PAYSTACK_SECRET_KEY);
  
  const reference = `tebi_test_${Date.now()}`;
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test-user@example.com",
      amount: 1400000,
      reference,
      callback_url: "http://localhost:3000/academy/confirm-payment",
    }),
  });

  const data = await response.json();
  console.log('Response Status:', response.status);
  console.log('Response Body:', data);
}

run();
