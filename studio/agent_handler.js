import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const getGeminiApiUrl = () => {
  const model = process.env.GEMINI_MODEL_NAME || process.env.GEMINI_TEXT_MODEL || 'gemini-3.5-flash';
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
};

// System prompt instructing the agent on its behavior
const SYSTEM_PROMPT = `You are Vibe Workspace Agent, an expert AI coding and writing assistant built directly into the Vibe Studio application.
You can read/write files, search, list directories, and execute course generation python pipelines.
You are running on a local workspace containing educational lessons, brand voice guidelines, and slicing templates.

Your goal is to help the user manage, slice, write, and verify educational lessons.
Always behave professionally, write clean files, and explain what actions you are performing.

Key guidelines:
1. Respect the rules in brand_voice.md and ai.md if writing content.
2. The active lesson slug is provided. Focus on the active lesson unless the user asks otherwise.
3. Keep logs and responses concise.
`;

const tools = [
  {
    functionDeclarations: [
      {
        name: "list_directory",
        description: "Lister le contenu d'un dossier du workspace (ex: '.', 'M1', 'M1/M1C1'). Utiliser '.' pour la racine.",
        parameters: {
          type: "OBJECT",
          properties: {
            dirPath: { type: "STRING", description: "Le chemin relatif du dossier" }
          },
          required: ["dirPath"]
        }
      },
      {
        name: "read_file",
        description: "Lire le contenu textuel d'un fichier du workspace.",
        parameters: {
          type: "OBJECT",
          properties: {
            filePath: { type: "STRING", description: "Le chemin relatif du fichier (ex: 'brand_voice.md', 'M1/M1C1/M1C1L1/PLAN_M1C1L1.md')" }
          },
          required: ["filePath"]
        }
      },
      {
        name: "write_file",
        description: "Créer ou écraser un fichier textuel dans le workspace.",
        parameters: {
          type: "OBJECT",
          properties: {
            filePath: { type: "STRING", description: "Le chemin relatif du fichier" },
            content: { type: "STRING", description: "Le contenu complet à écrire dans le fichier" }
          },
          required: ["filePath", "content"]
        }
      },
      {
        name: "run_pipeline",
        description: "Exécuter le pipeline Python de génération de cours pour une leçon et une phase spécifique.",
        parameters: {
          type: "OBJECT",
          properties: {
            lesson: { type: "STRING", description: "Le slug de la leçon (ex: 'm1c3l5')" },
            phase: { type: "STRING", description: "La phase à exécuter (decoupe, ecris, genere, intro, objectif-l1)" }
          },
          required: ["lesson", "phase"]
        }
      },
      {
        name: "regenerate_slide",
        description: "Régénérer une slide unique d'une leçon avec Claude en fournissant une consigne.",
        parameters: {
          type: "OBJECT",
          properties: {
            lesson: { type: "STRING", description: "Le slug de la leçon (ex: 'm1c3l5')" },
            slideIndex: { type: "INTEGER", description: "L'index de la slide à modifier (0-based)" },
            instruction: { type: "STRING", description: "La consigne spécifique de modification" }
          },
          required: ["lesson", "slideIndex", "instruction"]
        }
      },
      {
        name: "search_in_files",
        description: "Rechercher du texte ou une expression dans tous les fichiers du workspace.",
        parameters: {
          type: "OBJECT",
          properties: {
            query: { type: "STRING", description: "Le texte à rechercher" }
          },
          required: ["query"]
        }
      }
    ]
  }
];

function isSafePath(filePath, rootDir) {
  const resolved = path.resolve(rootDir, filePath);
  return resolved.startsWith(rootDir);
}

// Implement functions locally
function listDirectoryLocal(dirPath, rootDir) {
  const safePath = path.join(rootDir, dirPath);
  if (!isSafePath(safePath, rootDir)) {
    return { error: "Accès refusé : le chemin est en dehors du workspace." };
  }
  if (!fs.existsSync(safePath)) {
    return { error: `Le dossier ${dirPath} n'existe pas.` };
  }
  try {
    const items = fs.readdirSync(safePath);
    const result = items.map(name => {
      const p = path.join(safePath, name);
      const isDir = fs.statSync(p).isDirectory();
      return { name, type: isDir ? 'directory' : 'file' };
    });
    return { items: result };
  } catch (e) {
    return { error: e.message };
  }
}

function readFileLocal(filePath, rootDir) {
  const safePath = path.join(rootDir, filePath);
  if (!isSafePath(safePath, rootDir)) {
    return { error: "Accès refusé : le chemin est en dehors du workspace." };
  }
  if (!fs.existsSync(safePath)) {
    return { error: `Le fichier ${filePath} n'existe pas.` };
  }
  try {
    const content = fs.readFileSync(safePath, 'utf-8');
    return { content: content.length > 50000 ? content.slice(0, 50000) + "\n\n...[TRONQUÉ CAR TROP GRAND]..." : content };
  } catch (e) {
    return { error: e.message };
  }
}

function writeFileLocal(filePath, content, rootDir) {
  const safePath = path.join(rootDir, filePath);
  if (!isSafePath(safePath, rootDir)) {
    return { error: "Accès refusé : le chemin est en dehors du workspace." };
  }
  try {
    const parentDir = path.dirname(safePath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(safePath, content, 'utf-8');
    return { success: true, message: `Fichier ${filePath} écrit avec succès.` };
  } catch (e) {
    return { error: e.message };
  }
}

function runPipelineLocal(lesson, phase, rootDir) {
  try {
    const scriptPath = path.join(rootDir, 'scripts', 'generate_course_pipeline.py');
    const result = spawnSync('python3', [scriptPath, '--input', lesson, '--phase', phase], {
      cwd: rootDir,
      env: { ...process.env, PYTHONWARNINGS: 'ignore' },
      encoding: 'utf-8'
    });
    return {
      status: result.status,
      stdout: result.stdout || '',
      stderr: result.stderr || ''
    };
  } catch (e) {
    return { error: e.message };
  }
}

function regenerateSlideLocal(lesson, slideIndex, instruction, rootDir) {
  try {
    const scriptPath = path.join(rootDir, 'scripts', 'regenerate_single_slide.py');
    const result = spawnSync('python3', [scriptPath, lesson, String(slideIndex), '--instruction', instruction], {
      cwd: rootDir,
      env: { ...process.env, PYTHONWARNINGS: 'ignore' },
      encoding: 'utf-8'
    });
    return {
      status: result.status,
      stdout: result.stdout || '',
      stderr: result.stderr || ''
    };
  } catch (e) {
    return { error: e.message };
  }
}

function searchInFilesLocal(query, rootDir) {
  const results = [];
  const queryLower = query.toLowerCase();
  
  function scan(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const p = path.join(dir, file.name);
      if (file.isDirectory()) {
        if (
          file.name.startsWith('.') ||
          file.name === 'node_modules' ||
          file.name === 'studio' ||
          file.name === 'dist' ||
          file.name === 'assets' ||
          file.name === 'Archives' ||
          file.name === 'Imports'
        ) continue;
        scan(p);
      } else {
        // Only scan text-like extensions
        const ext = path.extname(file.name).toLowerCase();
        if (['.md', '.json', '.txt', '.js', '.ts', '.tsx', '.py', '.css'].includes(ext)) {
          try {
            const content = fs.readFileSync(p, 'utf-8');
            if (content.toLowerCase().includes(queryLower)) {
              // Find matching line snippets
              const lines = content.split('\n');
              const snippets = [];
              lines.forEach((line, idx) => {
                if (line.toLowerCase().includes(queryLower)) {
                  snippets.push({ lineNum: idx + 1, content: line.trim() });
                }
              });
              results.push({
                filePath: path.relative(rootDir, p),
                matches: snippets.slice(0, 5) // Cap matches per file
              });
            }
          } catch (e) {
            // Ignore unreadable files
          }
        }
      }
    }
  }

  try {
    scan(rootDir);
    return { results: results.slice(0, 20) }; // Cap total matching files
  } catch (e) {
    return { error: e.message };
  }
}

// Main execution loop
export async function executeAgentLoop(clientMessages, activeLessonSlug, rootDir) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { error: "GEMINI_API_KEY non configurée dans .env" };
  }

  // Format messages for Gemini API
  // Convert standard role/content format to Gemini contents format
  const contents = clientMessages.map(m => {
    if (m.role === 'tool') {
      return {
        role: 'user', // Gemini expects tool responses to have role user or tool depending on API version, but actually v1beta wants role 'tool' or custom structure
        parts: m.parts || [{ text: m.content }]
      };
    }
    return {
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: m.parts || [{ text: m.content }]
    };
  });

  const fullUrl = `${getGeminiApiUrl()}?key=${apiKey}`;

  // Custom system prompt with active lesson context
  const fullSystemPrompt = `${SYSTEM_PROMPT}\n\nWORKSPACE_ROOT: ${rootDir}\nACTIVE_LESSON_SLUG: ${activeLessonSlug || 'Aucune leçon sélectionnée'}`;

  const modelName = process.env.GEMINI_MODEL_NAME || process.env.GEMINI_TEXT_MODEL || 'gemini-3.5-flash';
  const thinkingLevelEnv = process.env.GEMINI_THINKING_LEVEL || 'low';

  const generationConfig = {
    thinkingConfig: {
      thinkingLevel: thinkingLevelEnv.toUpperCase() // API expects UPPERCASE: 'LOW', 'MEDIUM', etc.
    }
  };

  const requestBody = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: fullSystemPrompt }]
    },
    tools: tools,
    generationConfig: generationConfig
  };

  try {
    let response;
    let delay = 2000; // Exponential backoff initial delay (2s)
    const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[AI Agent] Calling Gemini API (model: ${modelName}, attempt ${attempt}/${maxRetries})...`);
      response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.status === 503 || response.status === 429) {
        console.warn(`[AI Agent] Gemini API returned ${response.status} (attempt ${attempt}). Retrying in ${delay}ms...`);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
      }

      break;
    } catch (e) {
      console.warn(`[AI Agent] Network error (attempt ${attempt}): ${e.message}`);
      if (attempt === maxRetries) {
        throw e;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  if (!response || !response.ok) {
    const errText = response ? await response.text() : "No response from server";
    throw new Error(`Gemini API error: ${response ? response.status : 'network_error'} - ${errText}`);
  }

    const data = await response.json();
    const candidate = data.candidates && data.candidates[0];
    if (!candidate || !candidate.content) {
      throw new Error("Réponse vide de Gemini");
    }

    const responseContent = candidate.content;
    const parts = responseContent.parts || [];

    // Check if the model requested function calls
    const functionCalls = parts.filter(p => p.functionCall);

    if (functionCalls.length > 0) {
      const toolOutputs = [];
      const logs = [];

      for (const callObj of functionCalls) {
        const call = callObj.functionCall;
        const name = call.name;
        const args = call.args;

        console.log(`[AI Agent] Executing tool: ${name} with args:`, args);
        logs.push(`[Exécution outil] ${name}`);

        let output = {};
        switch (name) {
          case 'list_directory':
            output = listDirectoryLocal(args.dirPath || '.', rootDir);
            break;
          case 'read_file':
            output = readFileLocal(args.filePath, rootDir);
            break;
          case 'write_file':
            output = writeFileLocal(args.filePath, args.content, rootDir);
            break;
          case 'run_pipeline':
            output = runPipelineLocal(args.lesson, args.phase, rootDir);
            break;
          case 'regenerate_slide':
            output = regenerateSlideLocal(args.lesson, args.slideIndex, args.instruction, rootDir);
            break;
          case 'search_in_files':
            output = searchInFilesLocal(args.query, rootDir);
            break;
          default:
            output = { error: `Outil inconnu : ${name}` };
        }

        toolOutputs.push({
          functionResponse: {
            name: name,
            response: output
          }
        });
      }

      // Add the model's tool calls message and the tool responses message back to history, then recurse
      const nextHistory = [
        ...clientMessages,
        {
          role: 'assistant',
          parts: parts
        },
        {
          role: 'tool',
          parts: toolOutputs
        }
      ];

      // Recursively call the loop to allow multi-step tool calls
      return executeAgentLoop(nextHistory, activeLessonSlug, rootDir);
    }

    // Return the final text content of the agent
    const textPart = parts.find(p => p.text);
    return {
      content: textPart ? textPart.text : "Aucun texte généré par l'agent.",
      history: clientMessages
    };

  } catch (e) {
    console.error("[AI Agent] Error in executeAgentLoop:", e);
    return { error: `Erreur interne de l'agent : ${e.message}` };
  }
}
