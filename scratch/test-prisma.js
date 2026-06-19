const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
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
  console.log('Connecting to Prisma client with pg adapter...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const count = await prisma.course.count();
    console.log(`✅ Success! Prisma successfully connected at runtime. Total courses: ${count}`);
    const courses = await prisma.course.findMany({ select: { slug: true, title: true } });
    console.log('Available courses in DB:', courses);
  } catch (err) {
    console.error('❌ Failed to run Prisma query at runtime:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run();
