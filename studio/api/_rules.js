import fs from 'fs';
import path from 'path';

// Load static reference files (brand_voice, ai.md, icon_mapping, image_style_guide)
export function getStaticReferenceRules() {
  const configDir = path.join(process.cwd(), 'config');
  const filesToRead = ['brand_voice.md', 'ai.md', 'icon_mapping.md', 'image_style_guide.md'];
  
  let merged = '';
  for (const filename of filesToRead) {
    const filePath = path.join(configDir, filename);
    if (fs.existsSync(filePath)) {
      merged += `\n=== FILE: ${filename} ===\n` + fs.readFileSync(filePath, 'utf-8');
    }
  }
  return merged;
}

// Target extraction: Only load constraints for specific needed templates to save tokens
export function getExtractedTemplates(templateNames) {
  const templatesPath = path.join(process.cwd(), 'templates.json');
  if (!fs.existsSync(templatesPath)) return [];

  try {
    const allTemplates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));
    if (!templateNames || templateNames.length === 0) {
      // If no specific names, return simplified summary
      return allTemplates.map(t => ({
        name: t.name,
        description: t.description
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
