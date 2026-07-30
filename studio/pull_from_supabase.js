import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pg from 'pg';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const rootDir = path.resolve(__dirname, '..');

const dbConfig = {
  connectionString: process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
};

// Helper to parse lesson slug and match folder structure
function getLessonPaths(slug) {
  const match = slug.toLowerCase().match(/^m(\d+)c(\d+)l(\d+)$/);
  if (!match) return null;
  const m = parseInt(match[1]), c = parseInt(match[2]), l = parseInt(match[3]);
  const lessonDir = path.join(rootDir, `M${m}`, `M${m}C${c}`, `M${m}C${c}L${l}`);
  return {
    dir: lessonDir,
    plan: path.join(lessonDir, `PLAN_M${m}C${c}L${l}.md`),
    final: path.join(lessonDir, `FINAL_M${m}C${c}L${l}.json`),
    m, c, l
  };
}

async function pull() {
  const client = new Client(dbConfig);
  await client.connect();
  console.log('✅ Connected to Supabase Postgres database!');

  const selectQuery = 'SELECT slug, plan, final FROM lessons;';
  const res = await client.query(selectQuery);
  console.log(`🔍 Found ${res.rows.length} lessons in Supabase.`);

  let updatedPlans = 0;
  let updatedFinals = 0;

  for (const row of res.rows) {
    const { slug, plan, final } = row;
    const paths = getLessonPaths(slug);

    if (!paths) {
      console.warn(`⚠️ Skipping invalid slug format: ${slug}`);
      continue;
    }

    // Make sure directory exists
    if (!fs.existsSync(paths.dir)) {
      fs.mkdirSync(paths.dir, { recursive: true });
      console.log(`📁 Created new folder: ${paths.dir}`);
    }

    // Write Plan file if present
    if (plan !== null && plan !== undefined) {
      fs.writeFileSync(paths.plan, plan, 'utf-8');
      updatedPlans++;
    }

    // Write Final JSON file if present
    if (final !== null && final !== undefined) {
      // Ensure we pretty-print the JSON representation
      const formattedJson = typeof final === 'string' ? JSON.stringify(JSON.parse(final), null, 2) : JSON.stringify(final, null, 2);
      fs.writeFileSync(paths.final, formattedJson, 'utf-8');
      updatedFinals++;
    }
  }

  console.log(`\n🎉 Sync from Supabase complete:`);
  console.log(`   - ${updatedPlans} plan files updated.`);
  console.log(`   - ${updatedFinals} JSON files updated.`);
  
  await client.end();
}

pull().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
