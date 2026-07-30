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

async function migrate() {
  const client = new Client(dbConfig);
  await client.connect();
  console.log('✅ Connected to Supabase Postgres database!');

  // 1. Create table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS lessons (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'no_plan',
      type TEXT NOT NULL DEFAULT 'theorique',
      slide_count INT NOT NULL DEFAULT 0,
      plan TEXT,
      final JSONB,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
    );
  `;
  await client.query(createTableQuery);
  console.log('✅ Table "lessons" created/verified in Supabase.');

  // 2. Traversal & Import
  const lessonsMap = new Map();

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        if (item.name.includes('.git') || item.name.includes('node_modules') || item.name === 'studio') continue;
        if (/^m\d+c\d+l\d+$/i.test(item.name)) {
          const slug = item.name.toLowerCase();
          const match = slug.match(/^m(\d+)c(\d+)l(\d+)$/);
          if (match) {
            const m = parseInt(match[1]), c = parseInt(match[2]), l = parseInt(match[3]);
            const planPath = path.join(fullPath, `PLAN_M${m}C${c}L${l}.md`);
            const finalPath = path.join(fullPath, `FINAL_M${m}C${c}L${l}.json`);

            const hasPlan = fs.existsSync(planPath);
            const hasFinal = fs.existsSync(finalPath);

            let planContent = null;
            if (hasPlan) {
              planContent = fs.readFileSync(planPath, 'utf-8');
            }

            let finalContent = null;
            let slideCount = 0;
            let title = slug.toUpperCase();
            let type = 'theorique';
            let status = 'no_plan';

            if (hasPlan) status = 'plan_only';

            if (hasFinal) {
              try {
                finalContent = JSON.parse(fs.readFileSync(finalPath, 'utf-8'));
                title = finalContent.lessonTitle || title;
                if (finalContent.lessonType) {
                  type = finalContent.lessonType;
                } else if (slug.endsWith('l1') || (title && title.toLowerCase().includes('objectifs'))) {
                  type = 'objectif';
                }
                if (Array.isArray(finalContent.slides)) {
                  slideCount = finalContent.slides.length;
                  status = slideCount <= 1 ? 'sliced' : 'written';
                }
              } catch (e) {
                console.error(`Error reading ${finalPath}:`, e);
              }
            }

            lessonsMap.set(slug, {
              slug,
              title,
              status,
              type,
              slide_count: slideCount,
              plan: planContent,
              final: finalContent
            });
          }
        } else {
          scanDir(fullPath);
        }
      }
    }
  }

  scanDir(rootDir);
  console.log(`🔍 Found ${lessonsMap.size} lessons to migrate.`);

  let inserted = 0;
  for (const lesson of lessonsMap.values()) {
    const query = `
      INSERT INTO lessons (slug, title, status, type, slide_count, plan, final, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        status = EXCLUDED.status,
        type = EXCLUDED.type,
        slide_count = EXCLUDED.slide_count,
        plan = EXCLUDED.plan,
        final = EXCLUDED.final,
        updated_at = NOW();
    `;
    await client.query(query, [
      lesson.slug,
      lesson.title,
      lesson.status,
      lesson.type,
      lesson.slide_count,
      lesson.plan,
      lesson.final ? JSON.stringify(lesson.final) : null
    ]);
    inserted++;
  }

  console.log(`🚀 Successfully migrated ${inserted} lessons to Supabase!`);
  await client.end();
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
