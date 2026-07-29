import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

// System prompt instructing the agent on its behavior
const SYSTEM_PROMPT = `You are Vibe Workspace Agent, an expert AI coding and writing assistant built directly into the Vibe Studio application.
You can read/write files, search, list directories, and execute course generation python pipelines.
You are running on a local workspace containing educational lessons, brand voice guidelines, and slicing templates.

Your goal is to help the user manage, slice, write, and verify educational lessons.
Always behave professionally, write clean files, and explain what actions you are performing in French.

Key guidelines:
1. Respect the rules in brand_voice.md and ai.md if writing content.
2. The active lesson slug is provided. Focus on the active lesson unless the user asks otherwise.
3. Keep logs and responses concise.
`;

const geminiTools = [
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
        description: "Régénérer une slide unique d'une leçon en fournissant une consigne.",
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

const claudeTools = [
  {
    name: "list_directory",
    description: "Lister le contenu d'un dossier du workspace.",
    input_schema: {
      type: "object",
      properties: { dirPath: { type: "string", description: "Le chemin relatif du dossier" } },
      required: ["dirPath"]
    }
  },
  {
    name: "read_file",
    description: "Lire le contenu textuel d'un fichier du workspace.",
    input_schema: {
      type: "object",
      properties: { filePath: { type: "string", description: "Le chemin relatif du fichier" } },
      required: ["filePath"]
    }
  },
  {
    name: "write_file",
    description: "Créer ou écraser un fichier textuel dans le workspace.",
    input_schema: {
      type: "object",
      properties: {
        filePath: { type: "string", description: "Le chemin relatif du fichier" },
        content: { type: "string", description: "Le contenu complet" }
      },
      required: ["filePath", "content"]
    }
  },
  {
    name: "run_pipeline",
    description: "Exécuter le pipeline Python de génération pour une leçon.",
    input_schema: {
      type: "object",
      properties: {
        lesson: { type: "string", description: "Le slug de la leçon" },
        phase: { type: "string", description: "La phase (decoupe, ecris, genere)" }
      },
      required: ["lesson", "phase"]
    }
  },
  {
    name: "search_in_files",
    description: "Rechercher du texte dans tous les fichiers du workspace.",
    input_schema: {
      type: "object",
      properties: { query: { type: "string", description: "Le texte recherché" } },
      required: ["query"]
    }
  }
];

function isSafePath(filePath, rootDir) {
  const resolved = path.resolve(rootDir, filePath);
  return resolved.startsWith(rootDir);
}

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
        const ext = path.extname(file.name).toLowerCase();
        if (['.md', '.json', '.txt', '.js', '.ts', '.tsx', '.py', '.css'].includes(ext)) {
          try {
            const content = fs.readFileSync(p, 'utf-8');
            if (content.toLowerCase().includes(queryLower)) {
              const lines = content.split('\n');
              const snippets = [];
              lines.forEach((line, idx) => {
                if (line.toLowerCase().includes(queryLower)) {
                  snippets.push({ lineNum: idx + 1, content: line.trim() });
                }
              });
              results.push({
                filePath: path.relative(rootDir, p),
                matches: snippets.slice(0, 5)
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
    return { results: results.slice(0, 20) };
  } catch (e) {
    return { error: e.message };
  }
}

function executeTool(name, args, rootDir) {
  switch (name) {
    case 'list_directory': return listDirectoryLocal(args.dirPath || '.', rootDir);
    case 'read_file': return readFileLocal(args.filePath, rootDir);
    case 'write_file': return writeFileLocal(args.filePath, args.content, rootDir);
    case 'run_pipeline': return runPipelineLocal(args.lesson, args.phase, rootDir);
    case 'regenerate_slide': return regenerateSlideLocal(args.lesson, args.slideIndex, args.instruction, rootDir);
    case 'search_in_files': return searchInFilesLocal(args.query, rootDir);
    default: return { error: `Outil inconnu : ${name}` };
  }
}

// ── Claude Execution Loop ──
async function executeClaudeLoop(clientMessages, activeLessonSlug, rootDir, modelName) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { error: "ANTHROPIC_API_KEY non configurée dans .env" };
  }

  const fullSystemPrompt = `${SYSTEM_PROMPT}\n\nIMPORTANT: Vous êtes Vibe Workspace Agent fonctionnant sur le modèle Claude (${modelName}).\nWORKSPACE_ROOT: ${rootDir}\nACTIVE_LESSON_SLUG: ${activeLessonSlug || 'Aucune leçon sélectionnée'}`;

  const messages = clientMessages.filter(m => m.role !== 'system').map(m => {
    if (m.role === 'assistant') {
      return { role: 'assistant', content: m.content || (m.parts ? m.parts.map(p => p.text).join('\n') : '') };
    }
    return { role: 'user', content: m.content || (m.parts ? m.parts.map(p => p.text).join('\n') : '') };
  });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: modelName,
      max_tokens: 4096,
      system: fullSystemPrompt,
      messages: messages,
      tools: claudeTools
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const toolUseBlocks = (data.content || []).filter(c => c.type === 'tool_use');

  if (toolUseBlocks.length > 0) {
    const toolResults = [];
    for (const call of toolUseBlocks) {
      console.log(`[AI Agent - Claude] Executing tool: ${call.name} with args:`, call.input);
      const output = executeTool(call.name, call.input || {}, rootDir);
      toolResults.push({
        type: 'tool_result',
        tool_use_id: call.id,
        content: JSON.stringify(output)
      });
    }

    const assistantText = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');
    const nextHistory = [
      ...clientMessages,
      { role: 'assistant', content: assistantText || 'Analyse en cours...' },
      { role: 'user', content: toolResults }
    ];

    return executeClaudeLoop(nextHistory, activeLessonSlug, rootDir, modelName);
  }

  const textBlock = (data.content || []).find(c => c.type === 'text');
  return {
    content: textBlock ? textBlock.text : "Opération terminée par l'agent.",
    history: clientMessages
  };
}

// ── Gemini Execution Loop ──
async function executeGeminiLoop(clientMessages, activeLessonSlug, rootDir, modelName) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { error: "GEMINI_API_KEY non configurée dans .env" };
  }

  const fullUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const fullSystemPrompt = `${SYSTEM_PROMPT}\n\nIMPORTANT: Vous êtes Vibe Workspace Agent fonctionnant sur le modèle Google Gemini (${modelName}). Quand l'utilisateur vous demande qui vous êtes, indiquez clairement que vous êtes Vibe Workspace Agent sur le moteur Gemini (${modelName}).\nWORKSPACE_ROOT: ${rootDir}\nACTIVE_LESSON_SLUG: ${activeLessonSlug || 'Aucune leçon sélectionnée'}`;

  const contents = clientMessages.map(m => {
    if (m.role === 'tool') {
      return {
        role: 'user',
        parts: m.parts || [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
      };
    }
    return {
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: m.parts || [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
    };
  });

  const thinkingLevelEnv = process.env.GEMINI_THINKING_LEVEL || 'low';
  const requestBody = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: fullSystemPrompt }]
    },
    tools: geminiTools,
    generationConfig: {
      thinkingConfig: {
        thinkingLevel: thinkingLevelEnv.toUpperCase()
      }
    }
  };

  let response;
  let delay = 2000;
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
      if (attempt === maxRetries) throw e;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  if (!response || !response.ok) {
    const errText = response ? await response.text() : "No response";
    throw new Error(`Gemini API error (${response ? response.status : 'network'}): ${errText}`);
  }

  const data = await response.json();
  const candidate = data.candidates && data.candidates[0];
  if (!candidate || !candidate.content) {
    throw new Error("Réponse vide de Gemini");
  }

  const parts = candidate.content.parts || [];
  const functionCalls = parts.filter(p => p.functionCall);

  if (functionCalls.length > 0) {
    const toolOutputs = [];
    for (const callObj of functionCalls) {
      const call = callObj.functionCall;
      console.log(`[AI Agent - Gemini] Executing tool: ${call.name} with args:`, call.args);
      const output = executeTool(call.name, call.args || {}, rootDir);
      toolOutputs.push({
        functionResponse: {
          name: call.name,
          response: output
        }
      });
    }

    const nextHistory = [
      ...clientMessages,
      { role: 'assistant', parts: parts },
      { role: 'tool', parts: toolOutputs }
    ];
    return executeGeminiLoop(nextHistory, activeLessonSlug, rootDir, modelName);
  }

  const textContent = parts.filter(p => p.text && p.text.trim().length > 0).map(p => p.text).join('\n\n');
  return {
    content: textContent || "Opération effectuée avec succès.",
    history: clientMessages
  };
}

// ── Main Entrypoint for executeAgentLoop ──
export async function executeAgentLoop(clientMessages, activeLessonSlug, rootDir, modelOverride) {
  const chatProvider = (process.env.CHAT_AGENT_PROVIDER || 'GEMINI').toUpperCase();
  const defaultModel = chatProvider === 'CLAUDE'
    ? (process.env.CLAUDE_MODEL || 'claude-sonnet-4-6')
    : (process.env.GEMINI_TEXT_MODEL || process.env.GEMINI_MODEL_NAME || 'gemini-3.5-flash');

  const modelName = modelOverride || defaultModel;

  try {
    if (modelName.toLowerCase().startsWith('claude-')) {
      return await executeClaudeLoop(clientMessages, activeLessonSlug, rootDir, modelName);
    } else {
      return await executeGeminiLoop(clientMessages, activeLessonSlug, rootDir, modelName);
    }
  } catch (e) {
    console.error("[AI Agent] Error in executeAgentLoop:", e);
    return { error: `Erreur interne de l'agent : ${e.message}` };
  }
}
