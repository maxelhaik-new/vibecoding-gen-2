import base64

img_path = '/Users/maximeelhaik/.gemini/antigravity/brain/06535b43-ee24-40b8-84a0-5155722d7f72/pixelquest_art_direction_1784654415577.jpg'
with open(img_path, 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

html_content = f'''<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Direction Artistique - PixelQuest (Charte Templates Flat)</title>
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    body {{
      width: 1920px;
      height: 1080px;
      background-color: #FFFFFF;
      font-family: 'Basic Sans Alt', 'Basic Alt', sans-serif;
      color: #18093B;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }}
    .slide-container {{
      width: 1920px;
      height: 1080px;
      background-color: #FFFFFF;
      padding: 80px 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }}
    .header {{
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 1;
    }}
    .badge {{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 20px;
      background-color: #6634D9;
      width: max-content;
    }}
    .badge-text {{
      color: #FFFFFF;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }}
    .title {{
      color: #18093B;
      font-size: 72px;
      font-weight: 900;
      line-height: 100%;
      letter-spacing: -0.014em;
    }}
    .subtitle {{
      color: #555555;
      font-size: 32px;
      font-weight: 400;
      line-height: 130%;
      max-width: 1400px;
    }}
    .content-body {{
      display: flex;
      flex-direction: row;
      gap: 48px;
      z-index: 1;
      height: 680px;
      align-items: stretch;
    }}
    .hero-image-card {{
      flex: 1.1;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #F7F7F7;
      border: 1px solid #E0E0E0;
      overflow: hidden;
      position: relative;
    }}
    .hero-image-card img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }}
    .image-tag {{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #18093B;
      padding: 16px 24px;
    }}
    .image-tag-text {{
      color: #FFFFFF;
      font-size: 24px;
      font-weight: 700;
    }}
    .pillars-column {{
      flex: 0.9;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 24px;
    }}
    .pillar-card {{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 28px 32px;
      background: #F7F7F7;
      border-left: 6px solid #6634D9;
    }}
    .pillar-card-accent {{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 28px 32px;
      background: #6634D9;
      color: #FFFFFF;
    }}
    .pillar-title {{
      font-size: 30px;
      font-weight: 800;
      color: #18093B;
    }}
    .pillar-title-white {{
      font-size: 30px;
      font-weight: 800;
      color: #FFFFFF;
    }}
    .pillar-desc {{
      color: #555555;
      font-size: 24px;
      line-height: 130%;
    }}
    .pillar-desc-white {{
      color: #FFFFFF;
      font-size: 24px;
      line-height: 130%;
      opacity: 0.95;
    }}
    .swatch-group {{
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 8px;
    }}
    .swatch {{
      flex: 1;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
    }}
  </style>
</head>
<body>

  <div class="slide-container" data-figma-name="Slide Direction Artistique">

    <!-- Header -->
    <div class="header" data-figma-name="Header">
      <div class="badge" data-figma-name="Badge">
        <span class="badge-text" data-figma-name="Badge Texte">DIRECTION ARTISTIQUE</span>
      </div>
      <h1 class="title" data-figma-name="Titre">L'Univers Graphique Rétro-Arcade 16-Bit</h1>
      <p class="subtitle" data-figma-name="Intro">Une fusion unique entre l'esthétique arcade des années 90 et l'ergonomie web moderne pour une expérience de productivité immersive.</p>
    </div>

    <!-- Content -->
    <div class="content-body" data-figma-name="Corps Content">
      <!-- Hero Image (Inchangée) -->
      <div class="hero-image-card" data-figma-name="Carte Image Hero">
        <img src="data:image/jpeg;base64,{b64}" alt="PixelQuest Art Direction" />
        <div class="image-tag" data-figma-name="Tag Image">
          <span class="image-tag-text" data-figma-name="Texte Tag">Maquette Interface Pixel 16-Bit</span>
        </div>
      </div>

      <!-- Pillars -->
      <div class="pillars-column" data-figma-name="Colonne Piliers">
        <!-- Palette -->
        <div class="pillar-card" data-figma-name="Pilier Palette">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="pillar-title" data-figma-name="Titre 1">Palette de Couleurs Néon</span>
            <span style="color: #777777; font-size: 20px; font-weight: 600;">Contrastes Élevés</span>
          </div>
          <div class="swatch-group" data-figma-name="Groupe Couleurs">
            <div class="swatch" style="background: #0F0D1B; color: #FFF;">#0F0D1B</div>
            <div class="swatch" style="background: #9D4EDD; color: #FFF;">#9D4EDD</div>
            <div class="swatch" style="background: #FFD700; color: #000;">#FFD700</div>
            <div class="swatch" style="background: #00FF9D; color: #000;">#00FF9D</div>
          </div>
        </div>

        <!-- Typo -->
        <div class="pillar-card-accent" data-figma-name="Pilier Typo">
          <span class="pillar-title-white" data-figma-name="Titre 2">Typographie et Style Visuel</span>
          <p class="pillar-desc-white" data-figma-name="Texte 2">
            Titres en typographie d'inspiration rétro et corps de texte en Basic Sans Alt pour une lisibilité parfaite lors des sessions de travail prolongées.
          </p>
        </div>

        <!-- Micro-Interactions -->
        <div class="pillar-card" data-figma-name="Pilier Micro-Interactions">
          <span class="pillar-title" data-figma-name="Titre 3">Micro-Interactions et Retours Visuels</span>
          <p class="pillar-desc" data-figma-name="Texte 3">
            Particules d'animation lors de la validation des quêtes, barres de progression lumineuses et modales de félicitation lors des passages de niveau.
          </p>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
'''

out_path = '/Users/maximeelhaik/Documents/VIBE CODING GENERATION/scratch/pixelquest_standalone.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Updated standalone HTML matching exact flat template charter (no radius, no shadow, Basic Sans Alt font) to', out_path)
