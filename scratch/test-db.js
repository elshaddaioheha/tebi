const { Client } = require('pg');

const password = '!D0i1a2m3o4n5d6';
const ref = 'fddqrrwhkgpjzkwgqyhq';

const urls = [
  { name: 'Pooler 5432 with sslmode=no-verify', url: `postgresql://postgres.${ref}:${password}@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=no-verify` },
  { name: 'Pooler 6543 with sslmode=no-verify', url: `postgresql://postgres.${ref}:${password}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=no-verify` },
];

async function test(item) {
  console.log(`Testing ${item.name}...`);
  const client = new Client({ 
    connectionString: item.url, 
    connectionTimeoutMillis: 5000
  });
  try {
    await client.connect();
    console.log(`✅ Success: ${item.name} connected!`);
    await client.end();
    return true;
  } catch (err) {
    console.log(`❌ Fail: ${item.name} - ${err.message}`);
    return false;
  }
}

async function run() {
  for (const item of urls) {
    await test(item);
  }
}

run();
