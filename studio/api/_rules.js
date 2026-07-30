import fs from 'fs';
import path from 'path';

export function getReferenceRules() {
  const configDir = path.join(process.cwd(), 'config');
  const filesToRead = ['brand_voice.md', 'ai.md', 'icon_mapping.md', 'image_style_guide.md', 'templates_charter.md'];
  
  let combinedRules = '';
  
  for (const filename of filesToRead) {
    const filePath = path.join(configDir, filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      combinedRules += `\n--- SOURCE DE VÉRITÉ : ${filename} ---\n${content}\n`;
    }
  }

  // Load templates.json rules and character constraints
  const templatesPath = path.join(process.cwd(), 'templates.json');
  if (fs.existsSync(templatesPath)) {
    try {
      const templatesData = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));
      const templateConstraints = templatesData.map(t => ({
        name: t.name,
        description: t.description,
        text_layers: t.text_layers ? t.text_layers.map(l => ({
          key: l.key,
          target_length: l.target_lenght,
          min_length: l.min_lenght,
          max_length: l.max_lenght
        })) : []
      }));

      combinedRules += `\n--- CONTRAINTES DE TEMPLATES ET LIMITES DE CARACTÈRES (templates.json) ---\n`;
      combinedRules += JSON.stringify(templateConstraints, null, 2);
    } catch (e) {
      console.error('Error parsing templates.json in rules helper:', e);
    }
  }

  return combinedRules;
}
