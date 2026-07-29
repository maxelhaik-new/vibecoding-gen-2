import re
import os

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GLOSSARY_PATH = os.path.join(BASE_DIR, 'glossaire_formation_vibe_coding.md')
OUTPUT_PATH = os.path.join(BASE_DIR, 'glossaire_cheatsheet_complet.html')
DEMO_PATH = os.path.join(BASE_DIR, 'glossaire_cheatsheet_demo.html')

# Read glossaire_formation_vibe_coding.md
with open(GLOSSARY_PATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

table_lines = [l.strip() for l in lines if l.strip().startswith('|')]
data_rows = []
for line in table_lines[2:]: # skip header and separator
    parts = [p.strip() for p in line.split('|')[1:-1]]
    if len(parts) >= 5:
        word_raw, statut, category, definition, ref = parts[0], parts[1], parts[2], parts[3], parts[4]
        word = re.sub(r'\*\*(.*?)\*\*', r'\1', word_raw)
        data_rows.append({
            'word': word,
            'statut': statut,
            'category': category.replace('`', ''),
            'definition': definition,
            'ref': ref
        })

print(f"Total rows loaded: {len(data_rows)}")

# Split into chunks of 5 per page
chunk_size = 5
pages = [data_rows[i:i + chunk_size] for i in range(0, len(data_rows), chunk_size)]
total_pages = len(pages)

html_content = """<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibe Coding — Glossaire Officiel complet (Format A4)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap');

    :root {
      /* Palette officielle Vibe Coding */
      --color-brand-purple: #6634D9;
      --color-brand-fig: #18093B;
      --color-brand-sunny: #FFFF77;
      --color-brand-pink: #FFB2B2;
      --color-pink-20: #FCF1F0;
      --color-border-subtle: #e2e8f0;
      --color-bg-white: #FFFFFF;
      --font-main: 'Basic Sans Alt', 'Basic Sans', 'Plus Jakarta Sans', -apple-system, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-main);
      background-color: #cbd5e1;
      color: var(--color-brand-fig);
      padding: 1.5rem 0;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
      overflow-x: auto;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    .screen-actions {
      position: sticky;
      left: 1.5rem;
      width: fit-content;
      margin: 0 0 1.5rem 1.5rem;
      display: flex;
      gap: 1.5rem;
      align-items: center;
      background: var(--color-brand-fig);
      color: #FFFFFF;
      padding: 0.8rem 1.5rem;
      border-radius: 0px;
      box-shadow: 4px 4px 0px var(--color-brand-purple);
      z-index: 100;
    }

    .screen-actions span {
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--color-brand-sunny);
    }

    .btn-print {
      background: var(--color-brand-purple);
      color: var(--color-brand-sunny);
      border: 2px solid var(--color-brand-sunny);
      padding: 0.5rem 1.2rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
      text-transform: uppercase;
    }

    .pages-wrapper {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      padding: 0 1.5rem 2rem 1.5rem;
      min-width: max-content;
    }

    .a4-page {
      width: 210mm;
      height: 297mm;
      background: var(--color-bg-white);
      border: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      padding: 14mm 14mm 10mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      page-break-after: always;
      break-after: page;
    }

    .page-main-content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    header {
      background: var(--color-brand-fig);
      border: 2px solid var(--color-brand-fig);
      padding: 1rem 1.2rem;
      margin-bottom: 1.1rem;
      color: #FFFFFF;
    }

    header.compact {
      padding: 0.7rem 1rem;
      margin-bottom: 0.9rem;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.2rem;
    }

    .badge-header {
      background: var(--color-brand-sunny);
      color: var(--color-brand-fig);
      font-weight: 900;
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border: 1px solid var(--color-brand-fig);
      text-transform: uppercase;
    }

    h1 {
      font-size: 1.7rem;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    header.compact h1 {
      font-size: 1.25rem;
    }

    .header-sub {
      margin-top: 0.25rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-brand-sunny);
    }

    .glossary-list {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .term-item {
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-subtle);
      padding: 0.9rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .term-item:nth-child(even) {
      background: var(--color-pink-20);
    }

    .term-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
    }

    .term-name {
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--color-brand-fig);
      letter-spacing: -0.01em;
    }

    .type-tag {
      background: #18093B;
      color: #FFFF77;
      font-weight: 800;
      font-size: 0.7rem;
      padding: 0.2rem 0.55rem;
      border: 1px solid #18093B;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .term-definition {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-brand-fig);
      line-height: 1.42;
    }

    .term-footer {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.2rem;
      padding-top: 0.35rem;
      border-top: 1px dashed #cbd5e1;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .ref-code {
      background: var(--color-brand-purple);
      color: #FFFFFF;
      padding: 0.1rem 0.4rem;
      font-size: 0.72rem;
      font-weight: 900;
    }

    .ref-title {
      color: var(--color-brand-fig);
      font-weight: 700;
    }

    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.5rem;
      border-top: 2px solid var(--color-brand-fig);
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--color-brand-fig);
    }

    .page-number {
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
      padding: 0.15rem 0.6rem;
    }

    @media print {
      body {
        background: none;
        padding: 0;
        overflow-x: visible;
      }
      .screen-actions {
        display: none;
      }
      .pages-wrapper {
        display: block;
        padding: 0;
      }
      .a4-page {
        margin: 0;
        box-shadow: none;
        width: 210mm;
        height: 297mm;
      }
    }
  </style>
</head>
<body>

  <div class="screen-actions">
    <span>📄 Glossaire Complet — 57 termes ({total_pages} pages A4)</span>
    <button class="btn-print" onclick="window.print()">Imprimer / PDF</button>
  </div>

  <div class="pages-wrapper">
"""

for page_idx, page_items in enumerate(pages, start=1):
    is_first_page = (page_idx == 1)
    header_class = "" if is_first_page else "compact"
    sub_title = f"Fiche A4 — Page {page_idx} / {total_pages}"
    
    html_content += f"""
    <!-- PAGE {page_idx} -->
    <div class="a4-page">
      <div class="page-main-content">
        <header class="{header_class}">
          <div class="header-top">
            <span class="badge-header">Formation Vibe Coding</span>
            <span style="font-weight: 800; font-size: 0.8rem;">Modules 1 à 4</span>
          </div>
          <h1>Glossaire Officiel {' (Suite)' if not is_first_page else ''}</h1>
          <div class="header-sub">{sub_title}</div>
        </header>

        <div class="glossary-list">
"""
    for item in page_items:
        html_content += f"""
          <div class="term-item">
            <div class="term-header">
              <div class="term-name">{item['word']}</div>
              <span class="type-tag">{item['category']}</span>
            </div>
            <div class="term-definition">
              {item['definition']}
            </div>
            <div class="term-footer">
              <span class="ref-code">{item['ref'].split('—')[0].strip()}</span>
              <span class="ref-title">{item['ref'].split('—')[1].strip() if '—' in item['ref'] else item['ref']}</span>
            </div>
          </div>
"""
    html_content += f"""
        </div>
      </div>

      <div class="page-footer">
        <span>VIBE CODING — GLOSSAIRE OFFICIEL</span>
        <span class="page-number">PAGE {page_idx} / {total_pages}</span>
      </div>
    </div>
"""

html_content += """
  </div>
</body>
</html>
"""

with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    f.write(html_content)

with open(DEMO_PATH, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Glossaire HTML ré-énuméré dans {OUTPUT_PATH} et {DEMO_PATH}")
