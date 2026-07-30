import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from './_supabase.js';
import { getStaticReferenceRules, getExtractedTemplates } from './_rules.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const isSSE = req.headers.accept && req.headers.accept.includes('text/event-stream');

  const description =
    (req.body && req.body.description) || req.query.description || '';
  const projectTitle =
    (req.body && req.body.projectTitle) || req.query.projectTitle || 'Mon Projet';
  const rawSlug =
    (req.body && req.body.projectSlug) ||
    req.query.projectSlug ||
    projectTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  // Prefix with "projet-" to avoid collisions with lesson slugs
  const projectSlug = rawSlug.startsWith('projet-') ? rawSlug : `projet-${rawSlug}`;

  if (isSSE) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  }

  const sendEvent = (msg) => {
    if (isSSE) res.write(`data: ${msg}\n\n`);
  };

  const sendError = (msg) => {
    if (isSSE) {
      res.write(`data: [Erreur] ${msg}\n\n`);
      res.write(`data: [System] Process exited\n\n`);
      return res.end();
    }
    return res.status(400).json({ error: msg });
  };

  if (!description || description.trim().length < 10) {
    return sendError('La description du projet est trop courte (minimum 10 caractères).');
  }

  try {
    sendEvent(`[Projet] Démarrage de la génération pour "${projectTitle}"...`);

    // ── Load PROJET templates only ──────────────────────────────────────────
    const allTemplates = getExtractedTemplates(null);
    const projetTemplates = allTemplates.filter((t) =>
      t.name && t.name.startsWith('PROJET - ')
    );

    if (projetTemplates.length === 0) {
      return sendError('Aucun template PROJET - ... trouvé dans templates.json.');
    }

    sendEvent(`[Projet] ${projetTemplates.length} templates PROJET chargés.`);

    // ── Build the prompt ────────────────────────────────────────────────────
    const staticRules = getStaticReferenceRules();

    const templatesStr = projetTemplates
      .map((t) => {
        const keys = (t.text_layers || []).map((l) => `  - "${l.key}"`).join('\n');
        return `Template: ${t.name}\nCalques texte disponibles (clés EXACTES à utiliser):\n${keys}`;
      })
      .join('\n\n');

    const systemPrompt = `Tu es l'expert pédagogique Vibe Slicer.
Tu dois générer une suite de 13 slides de projet fil rouge au format JSON strict.

${staticRules}

─── RÈGLES CRITIQUES ────────────────────────────────────────────────────────
1. Chaque slide doit utiliser un template de la liste ci-dessous (nom EXACT).
2. Les clés de l'objet "content" DOIVENT correspondre EXACTEMENT aux noms des calques de texte listés pour ce template. Pas d'abréviation, pas d'ajout de clés inexistantes.
3. Ne génère JAMAIS de clé "Intro" ni de clé composée uniquement de chiffres ("1", "2", "3"...) : ces calques sont statiques et doivent être préservés.
4. Pour les labels transverses (ex: "LE CONSTAT", "Objectif de l'application", "User Story", "Stack technique choisie :", "L'Amorce") : inclus-les dans le JSON avec leur valeur d'ORIGINE EXACTE. Ne modifie pas ces labels.
5. Adapte UNIQUEMENT les contenus descriptifs sous ces labels (les textes qui décrivent le projet réel).
6. Pour le champ "Texte 1" de PROJET - BRIEF (l'objectif de l'application) : écris un texte long et détaillé d'au moins 40 mots.
7. L'image de la slide PROJET - BRIEF est ignorée (ne génère pas de clé "image").
8. Respecte l'ordre des 13 slides : BRIEF, PERSONA, USER STORY, CAHIER, DESIGN 1, DESIGN 2, DESIGN 3, DESIGN 4, DESIGN 5, PROMPT 1, PROMPT 2, PROMPT 3, PROMPT 4.

─── TEMPLATES DISPONIBLES ──────────────────────────────────────────────────
${templatesStr}

─── FORMAT DE SORTIE JSON STRICT ───────────────────────────────────────────
{
  "projectTitle": "Titre du projet",
  "projectSlug": "slug-du-projet",
  "slides": [
    {
      "template": "PROJET - BRIEF",
      "content": {
        "Titre": "...",
        "Titre Intro": "LE CONSTAT",
        "Intro": "...",
        "Titre 1": "Objectif de l'application",
        "Texte 1": "..."
      }
    }
  ]
}
Retourne EXCLUSIVEMENT le JSON valide brut, sans markdown ni backticks.`;

    const userPrompt = `Génère la suite complète de 13 slides du projet fil rouge pour :
Nom du projet : ${projectTitle}
Description : ${description}

Transpose entièrement le vocabulaire, le persona, la stack, les consignes de design et les prompts en fonction de ce projet spécifique.`;

    sendEvent('[Projet] Appel au modèle IA...');

    let generatedJsonText = '';

    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\n${userPrompt}`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });
      generatedJsonText = response.text;
    } else if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      });
      generatedJsonText = completion.choices[0].message.content;
    } else {
      return sendError('Aucune clé API IA configurée (GEMINI_API_KEY ou OPENAI_API_KEY).');
    }

    sendEvent('[Projet] Réponse IA reçue. Parsing...');

    // ── Clean & parse ───────────────────────────────────────────────────────
    let cleanJson = generatedJsonText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(cleanJson);
    parsed.projectTitle = parsed.projectTitle || projectTitle;
    parsed.projectSlug = projectSlug;

    const slideCount = parsed.slides ? parsed.slides.length : 0;
    sendEvent(`[Projet] ✅ ${slideCount} slides générées. Sauvegarde dans Supabase...`);

    // ── Persist in Supabase using the lessons table ─────────────────────────
    // The "final" field stores the slides, "plan" stores the raw description
    const lessonRecord = {
      slug: projectSlug,
      title: projectTitle,
      status: 'written',
      type: 'projet',
      slide_count: slideCount,
      plan: `# Projet : ${projectTitle}\n\n## Description\n${description}`,
      final: parsed,
      updated_at: new Date().toISOString(),
    };

    const { data: saved, error: saveErr } = await supabase
      .from('lessons')
      .upsert(lessonRecord)
      .select()
      .single();

    if (saveErr) {
      sendEvent(`[Projet] ⚠️ Sauvegarde Supabase échouée : ${saveErr.message}`);
    } else {
      sendEvent(`[Projet] 💾 Projet "${projectTitle}" sauvegardé (slug: ${projectSlug}).`);
    }

    if (isSSE) {
      res.write(`data: [Projet] JSON_RESULT:${JSON.stringify(parsed)}\n\n`);
      res.write(`data: [System] Process exited\n\n`);
      return res.end();
    }

    return res.status(200).json({ success: true, projet: parsed, saved: saved || null });
  } catch (err) {
    console.error('Error in generate-projet:', err);
    return sendError(`Erreur de traitement : ${err.message}`);
  }
}
