import fs from 'fs';
import path from 'path';

const possiblePaths = [
  path.join(process.cwd(), '..'), // Vercel Root Directory 'studio' or Local Dev
  process.cwd(),
  path.join(process.cwd(), 'config') // fallback
];

function findFile(filename) {
  for (const p of possiblePaths) {
    const fullPath = path.join(p, filename);
    if (fs.existsSync(fullPath)) return fullPath;
  }
  return null;
}

export function getStaticReferenceRules() {
  const filesToRead = ['brand_voice.md', 'ai.md', 'icon_mapping.md', 'image_style_guide.md'];
  
  let merged = '';
  for (const filename of filesToRead) {
    const filePath = findFile(filename);
    if (filePath) {
      merged += `\n=== FILE: ${filename} ===\n` + fs.readFileSync(filePath, 'utf-8');
    }
  }
  return merged;
}

export function getExtractedTemplates(templateNames) {
  const templatesPath = findFile('templates.json');
  if (!templatesPath) return [];

  try {
    const allTemplates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));
    
    // Always include text_layers so UI rendering (SlideCard) can render text fields
    if (!templateNames || templateNames.length === 0) {
      return allTemplates.map(t => ({
        name: t.name,
        description: t.description,
        text_layers: t.text_layers ? t.text_layers.map(l => ({
          key: l.key,
          target_length: l.target_lenght,
          min_length: l.min_lenght,
          max_length: l.max_lenght
        })) : []
      }));
    }

    const filtered = allTemplates.filter(t => templateNames.includes(t.name));
    return filtered.map(t => ({
      name: t.name,
      description: t.description,
      text_layers: t.text_layers ? t.text_layers.map(l => ({
        key: l.key,
        target_length: l.target_lenght,
        min_length: l.min_lenght,
        max_length: l.max_lenght
      })) : []
    }));
  } catch (e) {
    console.error('Error extracting templates:', e);
    return [];
  }
}
