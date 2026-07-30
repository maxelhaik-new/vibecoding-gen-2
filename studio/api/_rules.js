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

  return combinedRules;
}
