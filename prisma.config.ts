import { defineConfig } from "prisma/config";
import "dotenv/config";

// Supabase connection pooling (Prisma 7):
//   • App runtime  → pooled DATABASE_URL via the pg driver adapter (src/lib/db.ts).
//   • Migrate / db push → MUST use a direct (non-pooled) connection, configured
//     here as datasource.url. Prefer DIRECT_URL (port 5432); fall back to
//     DATABASE_URL when a separate direct URL isn't provided.
// process.env (not the strict env() helper) is used so the config still loads
// when these vars are absent (e.g. during `prisma validate`).
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
