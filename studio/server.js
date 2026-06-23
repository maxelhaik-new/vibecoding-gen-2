import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

// Load .env from workspace root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });

const app = express();
const PORT = process.env.STUDIO_PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`[Studio Request Log] ${req.method} ${req.url}`);
  next();
});

// Serve static frontend files from studio/dist if it exists
const distPath = path.join(__dirname, 'dist');
console.log('[Studio Debug] __dirname resolves to:', __dirname);
console.log('[Studio Debug] distPath is calculated as:', distPath);
const distExists = fs.existsSync(distPath);
console.log('[Studio Debug] distPath exists in filesystem:', distExists);
if (distExists) {
  try {
    console.log('[Studio Debug] Contents of dist:', fs.readdirSync(distPath));
  } catch (e) {
    console.error('[Studio Debug] Failed to read dist folder:', e);
  }
  app.use(express.static(distPath));
} else {
  console.log('[Studio Debug] WARNING: dist folder NOT found! Static frontend will not be served.');
}

// Serve static assets from workspace root (e.g. assets/ for Figma templates & generated images)
app.use('/assets', express.static(path.join(rootDir, 'assets')));
// Also serve module folders if images are stored there
app.use('/M1', express.static(path.join(rootDir, 'M1')));
app.use('/M2', express.static(path.join(rootDir, 'M2')));
app.use('/M3', express.static(path.join(rootDir, 'M3')));

// Helper to parse lesson slug like "m1c3l4"
function parseLessonSlug(slug) {
  const match = slug.toLowerCase().match(/^m(\d+)c(\d+)l(\d+)$/);
  if (match) {
    return {
      module: parseInt(match[1]),
      chapter: parseInt(match[2]),
      lesson: parseInt(match[3])
    };
  }
  return null;
}

// Helper to get lesson files paths from slug
function getLessonPaths(slug) {
  const parsed = parseLessonSlug(slug);
  if (!parsed) return null;
  const { module, chapter, lesson } = parsed;
  const lessonDir = path.join(rootDir, `M${module}`, `M${module}C${chapter}`, `M${module}C${chapter}L${lesson}`);
  return {
    dir: lessonDir,
    plan: path.join(lessonDir, `PLAN_M${module}C${chapter}L${lesson}.md`),
    final: path.join(lessonDir, `FINAL_M${module}C${chapter}L${lesson}.json`)
  };
}

// 1. GET /api/lessons - List all lessons and their status
app.get('/api/lessons', (req, res) => {
  // Set cache control headers to prevent stale browser reads
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    const lessons = [];
    
    // Recursive directory traversal for finding lessons matching M*C*L*
    function scanDir(dir) {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir, { withFileTypes: true });
      
      // Check if this directory is a lesson folder (e.g. M1C2L3)
      const folderName = path.basename(dir);
      const isLessonFolder = /^m\d+c\d+l\d+$/i.test(folderName);
      
      if (isLessonFolder) {
        const slug = folderName.toLowerCase();
        const paths = getLessonPaths(slug);
        if (paths) {
          const hasPlan = fs.existsSync(paths.plan);
          const hasFinal = fs.existsSync(paths.final);
          
          let status = 'no_plan';
          let slideCount = 0;
          let lessonTitle = slug.toUpperCase();
          
          if (hasPlan) {
            status = 'plan_only';
          }
          
          if (hasFinal) {
            try {
              const data = JSON.parse(fs.readFileSync(paths.final, 'utf-8'));
              lessonTitle = data.lessonTitle || lessonTitle;
              const slides = data.slides || [];
              slideCount = slides.length;
              
              if (slides.length > 0) {
                // If first non-cover slide has content fields, it is 'written'
                const contentSlides = slides.filter(s => s.template !== 'VIBECODING - COVER' && s.template !== 'VIBECODING - COVER CHAP');
                const testSlide = contentSlides[0];
                
                if (testSlide && testSlide.content && Object.keys(testSlide.content).length > 0) {
                  // Check if images are generated for slides needing image
                  const needsImage = slides.some(s => {
                    const tName = (s.template || '').toUpperCase();
                    return tName.includes('PHOTO') || tName.includes('IMAGE') || tName.includes('USE CASE') || tName.includes('FOCUS OUTIL') || tName.includes('PODIUM');
                  });
                  const hasImageGenerated = slides.some(s => s.content && (s.content.image || s.content.Image));
                  
                  if (needsImage && hasImageGenerated) {
                    status = 'completed';
                  } else {
                    status = 'written';
                  }
                } else {
                  status = 'sliced';
                }
              }
            } catch (e) {
              console.error(`Error parsing FINAL file for ${slug}:`, e);
              status = 'error';
            }
          }
          
          lessons.push({
            slug,
            title: lessonTitle,
            hasPlan,
            hasFinal,
            status,
            slideCount
          });
        }
        return; // No need to scan inside a lesson folder
      }
      
      // Otherwise, scan subfolders
      for (const file of files) {
        if (
          file.isDirectory() && 
          !file.name.startsWith('.') && 
          file.name !== 'studio' && 
          file.name !== 'node_modules' && 
          file.name !== 'assets' &&
          file.name !== 'Archives' &&
          file.name !== 'Imports' &&
          file.name !== 'Exemples Slides' &&
          file.name !== 'scratch'
        ) {
          scanDir(path.join(dir, file.name));
        }
      }
    }
    
    scanDir(rootDir);
    
    // Sort lessons logically (M1 before M2, C1 before C2, L1 before L2)
    lessons.sort((a, b) => {
      const pa = parseLessonSlug(a.slug);
      const pb = parseLessonSlug(b.slug);
      if (!pa || !pb) return a.slug.localeCompare(b.slug);
      if (pa.module !== pb.module) return pa.module - pb.module;
      if (pa.chapter !== pb.chapter) return pa.chapter - pb.chapter;
      return pa.lesson - pb.lesson;
    });
    
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/lesson/:slug - Load plan and final content
app.get('/api/lesson/:slug', (req, res) => {
  const { slug } = req.params;
  const paths = getLessonPaths(slug);
  
  if (!paths) {
    return res.status(400).json({ error: 'Invalid lesson slug format. Must be like m1c2l3' });
  }
  
  // Set cache control headers to prevent stale browser reads
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  try {
    let planContent = '';
    let finalContent = null;
    
    if (fs.existsSync(paths.plan)) {
      planContent = fs.readFileSync(paths.plan, 'utf-8');
    }
    
    if (fs.existsSync(paths.final)) {
      try {
        finalContent = JSON.parse(fs.readFileSync(paths.final, 'utf-8'));
        // Normalize slide content array representation to dictionary format for frontend layouts compatibility
        if (finalContent && Array.isArray(finalContent.slides)) {
          finalContent.slides.forEach(s => {
            if (s && Array.isArray(s.content)) {
              const dict = {};
              s.content.forEach(item => {
                if (item && item.key) {
                  dict[item.key] = item.value || '';
                }
              });
              s.content = dict;
            }
          });
        }
      } catch (e) {
        console.error(`Error parsing ${paths.final}:`, e);
      }
    }
    
    res.json({
      slug,
      plan: planContent,
      final: finalContent,
      planPath: paths.plan,
      finalPath: paths.final
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2b. POST /api/lessons - Create a new lesson folder and files
app.post('/api/lessons', (req, res) => {
  const { slug, title } = req.body;
  if (!slug) {
    return res.status(400).json({ error: 'Lesson slug is required.' });
  }
  
  const parsed = parseLessonSlug(slug);
  if (!parsed) {
    return res.status(400).json({ error: 'Invalid lesson slug format. Must be like m1c2l3' });
  }
  
  const paths = getLessonPaths(slug);
  if (!paths) {
    return res.status(400).json({ error: 'Failed to resolve lesson paths.' });
  }
  
  try {
    // Create folder if it doesn't exist
    if (!fs.existsSync(paths.dir)) {
      fs.mkdirSync(paths.dir, { recursive: true });
    }
    
    const formattedTitle = title || slug.toUpperCase();
    
    // Create blank PLAN file if not exists
    if (!fs.existsSync(paths.plan)) {
      const initialPlan = `# Leçon ${slug.toUpperCase()} : ${formattedTitle}\n\n## 1. INTRODUCTION\n-\n\n## 2. NOTIONS CLÉS\n-\n\n## 3. CONCLUSION\n-\n`;
      fs.writeFileSync(paths.plan, initialPlan, 'utf-8');
    }
    
    // Create blank FINAL JSON file if not exists
    if (!fs.existsSync(paths.final)) {
      const initialFinal = {
        lessonTitle: formattedTitle,
        slides: []
      };
      fs.writeFileSync(paths.final, JSON.stringify(initialFinal, null, 2), 'utf-8');
    }
    
    res.json({ success: true, slug });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST /api/lesson/:slug - Save modifications
app.post('/api/lesson/:slug', (req, res) => {
  const { slug } = req.params;
  const { plan, final } = req.body;
  const paths = getLessonPaths(slug);
  
  if (!paths) {
    return res.status(400).json({ error: 'Invalid lesson slug format' });
  }
  
  try {
    // Create folder if it doesn't exist
    if (!fs.existsSync(paths.dir)) {
      fs.mkdirSync(paths.dir, { recursive: true });
    }
    
    if (plan !== undefined) {
      fs.writeFileSync(paths.plan, plan, 'utf-8');
    }
    
    if (final !== undefined) {
      fs.writeFileSync(paths.final, JSON.stringify(final, null, 2), 'utf-8');
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /api/templates - Get all templates
app.get('/api/templates', (req, res) => {
  const templatesPath = path.join(rootDir, 'templates.json');
  try {
    if (!fs.existsSync(templatesPath)) {
      return res.status(404).json({ error: 'templates.json not found' });
    }
    const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. GET /api/run-pipeline - SSE endpoint to execute script and stream output
app.get('/api/run-pipeline', (req, res) => {
  const { lesson, phase, model, image } = req.query;
  
  if (!lesson || !phase) {
    return res.status(400).json({ error: 'Missing parameters: lesson and phase are required.' });
  }
  
  // Set headers for Server-Sent Events (SSE)
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  
  const args = [
    path.join('scripts', 'generate_course_pipeline.py'),
    '--input', lesson,
    '--phase', phase
  ];
  
  if (model) {
    args.push('--model', model);
  }
  
  if (image === 'true') {
    args.push('--image');
  }
  
  res.write(`data: [System] Launching command: python3 ${args.join(' ')}\n\n`);
  
  // Send periodic keep-alive comments to prevent localtunnel/gateway from closing the connection
  const keepAlive = setInterval(() => {
    res.write(': keep-alive\n\n');
  }, 5000);
  
  // Spawn Python script process in root folder with warnings ignored
  const pyProcess = spawn('python3', args, { 
    cwd: rootDir,
    env: { ...process.env, PYTHONWARNINGS: 'ignore' }
  });
  
  pyProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim()) {
        res.write(`data: ${line}\n\n`);
      }
    }
  });
  
  pyProcess.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed) {
        // Filter out Python warnings and deprecations
        if (
          trimmed.includes('FutureWarning:') ||
          trimmed.includes('NotOpenSSLWarning:') ||
          trimmed.includes('DeprecationWarning:') ||
          trimmed.includes('UserWarning:') ||
          trimmed.includes('warnings.warn') ||
          trimmed.includes('urllib3 v2 only supports OpenSSL') ||
          trimmed.includes('You are using a Python version 3.9 past its end of life')
        ) {
          continue;
        }
        res.write(`data: [Stderr] ${line}\n\n`);
      }
    }
  });
  
  pyProcess.on('close', (code) => {
    clearInterval(keepAlive);
    res.write(`data: [System] Process exited with code ${code}\n\n`);
    res.end();
  });
  
  pyProcess.on('error', (err) => {
    clearInterval(keepAlive);
    res.write(`data: [System Error] Failed to start python process: ${err.message}\n\n`);
    res.end();
  });

  req.on('close', () => {
    clearInterval(keepAlive);
    pyProcess.kill();
  });
});

if (fs.existsSync(distPath)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Studio Server] Running locally on http://localhost:${PORT}`);
});
