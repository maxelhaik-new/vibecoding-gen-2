// Affiche l'interface du plugin
figma.showUI(__html__, { width: 240, height: 170, themeColors: true });

// Fonction récursive pour récupérer tous les nœuds de texte d'un élément
function findTextNodes(node, list = []) {
  if (node.type === 'TEXT') {
    list.push(node);
  } else if ('children' in node) {
    for (const child of node.children) {
      findTextNodes(child, list);
    }
  }
  return list;
}

// Vérifie si un nœud et tous ses parents sont visibles
function isNodeVisible(node) {
  let current = node;
  while (current) {
    if (current.visible === false) return false;
    current = current.parent;
  }
  return true;
}

// Détecte le Bloc Bulle : soit par son nom, soit s'il est situé tout en bas (Y > 650) et est large (width > 800)
function isBulleGroup(gNode, slide) {
  const nameNorm = normalize(gNode.name);
  if (nameNorm.includes("bulle")) return true;

  const selectionY = slide.absoluteTransform[1][2];
  const gY = gNode.absoluteTransform[1][2] - selectionY;
  const gWidth = gNode.width;
  if (gY > 650 && gWidth > 800) return true;

  return false;
}

// Fonction pour normaliser les chaînes de caractères (insensible à la casse, aux accents, aux espaces et caractères spéciaux)
function normalize(str) {
  if (!str) return '';
  return str
    .normalize("NFD")                  // Sépare les lettres de leurs accents
    .replace(/[\u0300-\u036f]/g, "")   // Supprime les accents
    .toLowerCase()                     // Convertit en minuscules
    .replace(/[^a-z0-9]/g, "");        // Supprime tout ce qui n'est pas alphanumérique
}

// Convertit une couleur Hexadécimale (#RRGGBB) ou un nom de type/couleur en format Figma (RGB de 0 à 1)
function hexToFigmaColor(hexStr) {
  if (!hexStr || typeof hexStr !== 'string') return { r: 0.95, g: 0.95, b: 0.96 };
  
  const norm = normalize(hexStr);
  if (norm.includes("theorique") || norm.includes("gris")) return { r: 0.886, g: 0.894, b: 0.914 }; // #E2E4E9
  if (norm.includes("logiciel") || norm.includes("violet")) return { r: 0.768, g: 0.710, b: 0.992 }; // #C4B5FD
  if (norm.includes("hybride") || norm.includes("rose")) return { r: 1.0, g: 0.710, b: 0.910 };      // #FFB5E8
  if (norm.includes("caspratique") || norm.includes("pratique") || norm.includes("bleu")) return { r: 0.627, g: 0.823, b: 1.0 }; // #A0D2FF

  const hex = hexStr.replace('#', '').trim();
  if (hex.length < 6) return { r: 0.95, g: 0.95, b: 0.96 };

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return { r: 0.95, g: 0.95, b: 0.96 };
  }
  return { r, g, b };
}


// Convertit une couleur Figma (RGB de 0 à 1) en format Hexadécimal (#RRGGBB)
function figmaColorToHex(color) {
  if (!color) return "#000000";
  const r = Math.max(0, Math.min(255, Math.round(color.r * 255))).toString(16).padStart(2, '0');
  const g = Math.max(0, Math.min(255, Math.round(color.g * 255))).toString(16).padStart(2, '0');
  const b = Math.max(0, Math.min(255, Math.round(color.b * 255))).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toLowerCase();
}

// Mappe une couleur d'origine vers la palette DA V2
function mapDAColor(hex) {
  const h = hex.toLowerCase().replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);

  // 1. Blanc ou proche du blanc
  if (r > 240 && g > 240 && b > 240) {
    return "#ffffff";
  }

  // 2. Noir ou très sombre (texte principal, etc.)
  if (r < 50 && g < 50 && b < 50) {
    return "#1c1c1c";
  }

  // 3. Nuances de gris (bords, fond gris clair)
  if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20) {
    if (r > 200) return "#f2f3f6"; // Fond gris clair
    return "#444444"; // Gris moyen pour les bordures
  }

  // 4. Couleurs saturées ou accents (bleus, violets, roses, etc.) -> violet de marque
  if (b > r && b > g) {
    return "#6634d9";
  }
  if (r > g && b > g) {
    return "#6634d9";
  }
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max > 0 ? (max - min) / max : 0;
  if (saturation > 0.15) {
    return "#6634d9";
  }

  return "#444444";
}

// Adapte récursivement un nœud cloné aux polices et couleurs DA V2
async function adaptNode(node) {
  let targetNode = node;
  if (node.type === 'INSTANCE') {
    try {
      targetNode = node.detachInstance();
    } catch (e) {
      console.log("Could not detach instance", e);
    }
  }

  // 1. Adapter les couleurs de fond (fills)
  if ('fills' in targetNode && targetNode.fills && targetNode.fills !== figma.mixed) {
    const newFills = [];
    for (const fill of targetNode.fills) {
      if (fill.type === 'SOLID') {
        const oldHex = figmaColorToHex(fill.color);
        const newHex = mapDAColor(oldHex);
        newFills.push(Object.assign({}, fill, { color: hexToFigmaColor(newHex) }));
      } else {
        newFills.push(fill);
      }
    }
    targetNode.fills = newFills;
  }

  // 2. Adapter les couleurs de contour (strokes)
  if ('strokes' in targetNode && targetNode.strokes && targetNode.strokes !== figma.mixed && targetNode.strokes.length > 0) {
    const newStrokes = [];
    for (const stroke of targetNode.strokes) {
      if (stroke.type === 'SOLID') {
        const oldHex = figmaColorToHex(stroke.color);
        const newHex = mapDAColor(oldHex);
        newStrokes.push(Object.assign({}, stroke, { color: hexToFigmaColor(newHex) }));
      } else {
        newStrokes.push(stroke);
      }
    }
    targetNode.strokes = newStrokes;
  }

  // 3. Adapter la police si c'est du texte
  if (targetNode.type === 'TEXT') {
    const originalFont = targetNode.fontName;
    if (originalFont === figma.mixed) {
      const targetFont = { family: "Basic Sans Alt", style: "Regular" };
      await figma.loadFontAsync(targetFont);
      targetNode.fontName = targetFont;
    } else if (originalFont && typeof originalFont === 'object') {
      const targetFont = {
        family: "Basic Sans Alt",
        style: originalFont.style || "Regular"
      };
      try {
        await figma.loadFontAsync(targetFont);
        targetNode.fontName = targetFont;
      } catch (e) {
        const fallbackFont = { family: "Basic Sans Alt", style: "Regular" };
        await figma.loadFontAsync(fallbackFont);
        targetNode.fontName = fallbackFont;
      }
    }
  }

  // 4. Parcourir récursivement les enfants
  if ('children' in targetNode) {
    for (const child of targetNode.children) {
      await adaptNode(child);
    }
  }
}


// Trouve une forme (Rectangle, Vector, etc.) qui sert d'arrière-plan à un nœud
function findBackgroundForNode(node, container) {
  if (!container || !('children' in container)) return null;
  
  const nX = node.absoluteTransform[0][2];
  const nY = node.absoluteTransform[1][2];
  const nW = node.width;
  const nH = node.height;
  
  // Chercher parmi les enfants directs du conteneur qui ne sont pas des textes
  for (const child of container.children) {
    if (child.id === node.id) continue;
    if (child.type === 'TEXT') continue;
    
    // Doit être un élément géométrique
    if (
      child.type === 'RECTANGLE' ||
      child.type === 'VECTOR' ||
      child.type === 'FRAME' ||
      child.type === 'ELLIPSE' ||
      child.type === 'POLYGON' ||
      child.type === 'BOOLEAN_OPERATION'
    ) {
      const cX = child.absoluteTransform[0][2];
      const cY = child.absoluteTransform[1][2];
      const cW = child.width;
      const cH = child.height;
      
      // Le fond doit englober le nœud ou intersecter largement avec lui
      // On accepte une marge d'erreur pour que le texte puisse déborder un peu
      const margin = 20;
      if (
        cX - margin <= nX &&
        cX + cW + margin >= nX + nW &&
        cY - margin <= nY &&
        cY + cH + margin >= nY + nH
      ) {
        return child;
      }
    }
  }
  return null;
}

// Détermine si un texte est un chiffre, une statistique ou une date courte
function isChiffreText(text) {
  if (!text) return false;
  const cleaned = text.trim();
  if (cleaned.length === 0) return false;
  
  // Ex: "100+", "25", "1.5", "10%", "1er", "N°1", "1/3", "2024", "Août 2024"
  // Si la chaîne fait moins de 12 caractères et contient au moins un chiffre
  if (cleaned.length <= 12 && /\d/.test(cleaned)) {
    return true;
  }
  
  // Si c'est juste un mot très court avec un symbole ou chiffre
  if (cleaned.length <= 6) {
    return true;
  }
  
  return false;
}

// Détermine si un nœud ou sa couleur est proche du violet de la marque
function isVioletNode(node) {
  if (!node) return false;
  
  const normName = normalize(node.name);
  if (normName.includes("violet") || normName.includes("badge") || normName.includes("soustitre")) {
    return true;
  }
  
  // Vérifie la couleur du texte ou du fond
  const paint = extractPaintFromNode(node);
  if (paint && paint.value && paint.value[0] && paint.value[0].type === 'SOLID') {
    const c = paint.value[0].color;
    // Le violet de la marque (ex: r=0.48, g=0.22, b=0.93)
    // On teste si la composante bleue et rouge sont fortes et le vert est faible
    if (c.r > 0.35 && c.b > 0.5 && c.g < 0.45) {
      return true;
    }
  }
  
  return false;
}

// Récupère la taille de police d'un nœud, gère le cas des polices mixtes
function getFontSize(node) {
  if (node.type !== 'TEXT') return 0;
  if (node.fontSize === figma.mixed) {
    try {
      return node.getRangeFontSize(0, 1);
    } catch (e) {
      return 0;
    }
  }
  return typeof node.fontSize === 'number' ? node.fontSize : 0;
}

// Charge de manière asynchrone la police pour un nœud de texte (gère les polices mixtes)
async function loadFontForNode(node) {
  if (node.type !== 'TEXT') return;
  if (node.fontName === figma.mixed) {
    const len = node.characters.length;
    for (let i = 0; i < len; i++) {
      try {
        const font = node.getRangeFontName(i, i + 1);
        if (font) {
          await figma.loadFontAsync(font);
        }
      } catch (e) {
        // Continue en cas d'erreur de chargement d'un segment
      }
    }
  } else {
    await figma.loadFontAsync(node.fontName);
  }
}

// Fonction pour trier les nœuds par position de lecture (haut en bas, puis gauche à droite)
function sortNodesByPosition(nodes) {
  return [...nodes].sort((a, b) => {
    // Récupère les coordonnées absolues dans Figma
    const aX = a.absoluteTransform[0][2];
    const aY = a.absoluteTransform[1][2];
    const bX = b.absoluteTransform[0][2];
    const bY = b.absoluteTransform[1][2];

    // Si deux éléments sont sur la même ligne (seuil de 20px)
    if (Math.abs(aY - bY) < 20) {
      return aX - bX;
    }
    return aY - bY;
  });
}

// Fonction récursive pour récupérer tous les nœuds pouvant recevoir un remplissage (shapes/frames/vectors/ellipses)
function findPlaceholderNodes(node, list = []) {
  if (
    node.type === 'RECTANGLE' ||
    node.type === 'FRAME' ||
    node.type === 'VECTOR' ||
    node.type === 'ELLIPSE' ||
    node.type === 'POLYGON' ||
    node.type === 'STAR' ||
    node.type === 'BOOLEAN_OPERATION'
  ) {
    list.push(node);
  }
  if ('children' in node) {
    for (const child of node.children) {
      findPlaceholderNodes(child, list);
    }
  }
  return list;
}

// Extrait le style ou la couleur de remplissage/contour d'un nœud ou de ses descendants
function extractPaintFromNode(node) {
  // 1. Cherche d'abord dans les enfants de type vecteur (pour éviter les fonds blancs masqués du composant parent)
  if ('findAll' in node) {
    const childVectors = node.findAll(n =>
      n.type === 'VECTOR' ||
      n.type === 'BOOLEAN_OPERATION' ||
      n.type === 'STAR' ||
      n.type === 'LINE' ||
      n.type === 'ELLIPSE' ||
      n.type === 'RECTANGLE' ||
      n.type === 'POLYGON'
    );
    for (const cv of childVectors) {
      if ('fillStyleId' in cv && cv.fillStyleId) {
        return { type: 'fill', styleId: cv.fillStyleId, value: cv.fills };
      }
      if ('fills' in cv && Array.isArray(cv.fills)) {
        const visibleFills = cv.fills.filter(f => f.visible !== false);
        if (visibleFills.length > 0) {
          return { type: 'fill', value: cv.fills };
        }
      }
      if ('strokeStyleId' in cv && cv.strokeStyleId) {
        return { type: 'stroke', styleId: cv.strokeStyleId, value: cv.strokes };
      }
      if ('strokes' in cv && Array.isArray(cv.strokes)) {
        const visibleStrokes = cv.strokes.filter(s => s.visible !== false);
        if (visibleStrokes.length > 0) {
          return { type: 'stroke', value: cv.strokes };
        }
      }
    }
  }

  // 2. Repli sur le nœud lui-même si aucun vecteur enfant n'a de couleur
  if ('fillStyleId' in node && node.fillStyleId) {
    return { type: 'fill', styleId: node.fillStyleId, value: node.fills };
  }
  if ('fills' in node && Array.isArray(node.fills)) {
    const visibleFills = node.fills.filter(f => f.visible !== false);
    if (visibleFills.length > 0) {
      return { type: 'fill', value: node.fills };
    }
  }
  if ('strokeStyleId' in node && node.strokeStyleId) {
    return { type: 'stroke', styleId: node.strokeStyleId, value: node.strokes };
  }
  if ('strokes' in node && Array.isArray(node.strokes)) {
    const visibleStrokes = node.strokes.filter(s => s.visible !== false);
    if (visibleStrokes.length > 0) {
      return { type: 'stroke', value: node.strokes };
    }
  }

  return null;
}

// Applique le style ou la couleur extrait à toutes les formes vectorielles d'un nœud SVG
function applyPaintToNode(node, paint) {
  if (!paint) return;

  if (
    node.type === 'VECTOR' ||
    node.type === 'BOOLEAN_OPERATION' ||
    node.type === 'STAR' ||
    node.type === 'LINE' ||
    node.type === 'ELLIPSE' ||
    node.type === 'RECTANGLE' ||
    node.type === 'POLYGON'
  ) {
    if (paint.type === 'fill') {
      if (paint.styleId) {
        try {
          node.fillStyleId = paint.styleId;
        } catch (e) {
          if (paint.value) node.fills = JSON.parse(JSON.stringify(paint.value));
        }
      } else if (paint.value) {
        node.fills = JSON.parse(JSON.stringify(paint.value));
      }
    } else if (paint.type === 'stroke') {
      if (paint.styleId) {
        try {
          node.fillStyleId = paint.styleId;
        } catch (e) {
          if (paint.value) node.fills = JSON.parse(JSON.stringify(paint.value));
        }
      } else if (paint.value) {
        node.fills = JSON.parse(JSON.stringify(paint.value));
      }
    }
  }

  if ('children' in node) {
    for (const child of node.children) {
      applyPaintToNode(child, paint);
    }
  }
}

// Variables globales et détecteurs pour le chargement d'assets
let assetsResolve = null;
let replaceModeTargetId = null;
const isIconValue = (val) => typeof val === 'string' && (val.startsWith('iconify:') || /^[a-z0-9_-]+:[a-z0-9_-]+$/.test(val.trim()));
const isImageUrlValue = (val) => typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:image/'));

// Cherche un picto en priorité dans son bloc parent, puis par nom exact
function getTargetPictoNode(slideNode, key, shapeNodes, usedNodes) {
  const match = key.match(/\d+/);
  if (!match) return null;
  const blockNum = parseInt(match[0], 10);

  // 1. Recherche exacte par nom de calque (ex: "Picto 3")
  const exactNode = shapeNodes.find(node => 
    !usedNodes.has(node) && 
    normalize(node.name) === normalize(key)
  );
  if (exactNode) return exactNode;

  // Helper pour vérifier si un nœud est un placeholder de picto
  const isPictoPlaceholder = (node) => {
    const norm = node.name.toLowerCase();
    return isIconPlaceholderNode(node) ||
           norm.includes("picto") ||
           norm.includes("icon") ||
           norm.includes("svg") ||
           norm.includes("logo") ||
           norm.includes("mdi:") ||
           norm.includes("iconify:");
  };

  // 2. Recherche du conteneur du bloc (ex: "Bloc 3", "Colonne 3", "Item 3") et recherche du picto dedans
  const container = slideNode.findOne(node => {
    const norm = node.name.toLowerCase();
    const regex = new RegExp(`(?:bloc|colonne|item|point|étape|step)\\s*${blockNum}\\b`, 'i');
    return regex.test(norm);
  });
  if (container && 'findAll' in container) {
    const pictoInContainer = container.findOne(node => !usedNodes.has(node) && isPictoPlaceholder(node));
    if (pictoInContainer) return pictoInContainer;
  }

  // 3. Recherche du picto via un calque texte du même bloc (ex: "Titre 3" ou "Texte 3") et son parent
  const relativeTextNode = slideNode.findOne(node => {
    if (node.type !== 'TEXT') return false;
    const norm = node.name.toLowerCase();
    return norm === `titre ${blockNum}` || norm === `titre  ${blockNum}` || norm === `texte ${blockNum}`;
  });
  if (relativeTextNode) {
    let parent = relativeTextNode.parent;
    for (let depth = 0; depth < 3; depth++) {
      if (!parent || parent.type === 'PAGE' || parent.type === 'DOCUMENT') break;
      const pictoInParent = parent.findOne(node => !usedNodes.has(node) && isPictoPlaceholder(node));
      if (pictoInParent) return pictoInParent;
      parent = parent.parent;
    }
  }

  return null;
}

// Cherche récursivement un nœud contenant un remplissage de type IMAGE
function findImageNode(node) {
  if ('fills' in node && Array.isArray(node.fills) && node.fills.some(p => p.type === 'IMAGE')) {
    return node;
  }
  if ('children' in node) {
    for (const child of node.children) {
      const found = findImageNode(child);
      if (found) return found;
    }
  }
  return null;
}

// Découpe un texte de légende en deux parties (préfixe se terminant par le premier deux-points et valeur)
function splitLegendText(text) {
  const colonIndex = text.indexOf(':');
  if (colonIndex === -1) {
    return { prefix: '', value: text };
  }
  const prefix = text.substring(0, colonIndex + 1);
  const afterColon = text.substring(colonIndex + 1);
  const spacesMatch = afterColon.match(/^\s+/);
  const spaces = spacesMatch ? spacesMatch[0] : '';
  return {
    prefix: prefix + spaces,
    value: afterColon.substring(spaces.length)
  };
}

// Recherche le nœud de texte correspondant à la légende dans un groupe
function findLegendTextNode(groupNode, isTarget = false) {
  const textNodes = findTextNodes(groupNode).filter(isNodeVisible);
  if (textNodes.length === 0) return null;
  if (textNodes.length === 1) return textNodes[0];

  const keywords = isTarget 
    ? ["source", "credit", "legende", "image"] 
    : ["illustration", "image", "source", "credit", "legende"];

  for (const textNode of textNodes) {
    const nameLower = textNode.name.toLowerCase();
    const contentLower = textNode.characters.toLowerCase();
    if (keywords.some(kw => nameLower.includes(kw) || contentLower.includes(kw))) {
      return textNode;
    }
  }
  return textNodes[0];
}

// Renvoie un objet contenant les styles de caractères pour une position donnée dans un TextNode
function getCharStyles(textNode, index) {
  if (index < 0 || index >= textNode.characters.length) {
    index = 0;
  }
  if (textNode.characters.length === 0) {
    return {
      fontName: textNode.fontName !== figma.mixed ? textNode.fontName : null,
      fontSize: textNode.fontSize !== figma.mixed ? textNode.fontSize : null,
      fills: textNode.fills !== figma.mixed ? textNode.fills : null,
      textDecoration: textNode.textDecoration !== figma.mixed ? textNode.textDecoration : null,
      letterSpacing: textNode.letterSpacing !== figma.mixed ? textNode.letterSpacing : null,
      lineHeight: textNode.lineHeight !== figma.mixed ? textNode.lineHeight : null,
      textCase: textNode.textCase !== figma.mixed ? textNode.textCase : null,
    };
  }
  return {
    fontName: textNode.getRangeFontName(index, index + 1),
    fontSize: textNode.getRangeFontSize(index, index + 1),
    fills: textNode.getRangeFills(index, index + 1),
    textDecoration: textNode.getRangeTextDecoration(index, index + 1),
    letterSpacing: textNode.getRangeLetterSpacing(index, index + 1),
    lineHeight: textNode.getRangeLineHeight(index, index + 1),
    textCase: textNode.getRangeTextCase(index, index + 1),
  };
}

// Applique les styles de caractères à un intervalle donné d'un TextNode
function setCharStyles(textNode, start, end, styles) {
  if (start >= end) return;
  if (styles.fontName) textNode.setRangeFontName(start, end, styles.fontName);
  if (styles.fontSize) textNode.setRangeFontSize(start, end, styles.fontSize);
  if (styles.fills) textNode.setRangeFills(start, end, styles.fills);
  if (styles.textDecoration) textNode.setRangeTextDecoration(start, end, styles.textDecoration);
  if (styles.letterSpacing) textNode.setRangeLetterSpacing(start, end, styles.letterSpacing);
  if (styles.lineHeight) textNode.setRangeLineHeight(start, end, styles.lineHeight);
  if (styles.textCase) textNode.setRangeTextCase(start, end, styles.textCase);
}

// Met à jour la légende en préservant le formatage du template
async function updateLegendTextPreservingStyles(targetLegend, sourceText) {
  const targetText = targetLegend.characters;
  const targetParts = splitLegendText(targetText);
  const sourceParts = splitLegendText(sourceText);

  const prefixSampleIndex = targetParts.prefix.length > 0 ? 0 : -1;
  const valueSampleIndex = targetParts.value.length > 0 ? targetText.length - 1 : -1;

  let prefixStyles = null;
  let valueStyles = null;

  try {
    if (prefixSampleIndex !== -1) {
      prefixStyles = getCharStyles(targetLegend, prefixSampleIndex);
    }
    if (valueSampleIndex !== -1) {
      valueStyles = getCharStyles(targetLegend, valueSampleIndex);
    }
  } catch (e) {
    console.warn("Erreur lors de la lecture des styles de caractères :", e);
  }

  // Charger les polices requises
  await loadFontForNode(targetLegend);
  if (prefixStyles && prefixStyles.fontName) {
    await figma.loadFontAsync(prefixStyles.fontName);
  }
  if (valueStyles && valueStyles.fontName) {
    await figma.loadFontAsync(valueStyles.fontName);
  }

  // Mettre à jour le texte
  targetLegend.characters = sourceText;

  // Appliquer les styles aux nouveaux intervalles
  const newPrefixLen = sourceParts.prefix.length;
  const newTotalLen = sourceText.length;

  if (newPrefixLen > 0) {
    if (prefixStyles) {
      setCharStyles(targetLegend, 0, newPrefixLen, prefixStyles);
    } else if (valueStyles) {
      setCharStyles(targetLegend, 0, newPrefixLen, valueStyles);
    }
  }

  if (newTotalLen > newPrefixLen) {
    const start = newPrefixLen;
    const end = newTotalLen;
    if (valueStyles) {
      setCharStyles(targetLegend, start, end, valueStyles);
    } else if (prefixStyles) {
      setCharStyles(targetLegend, start, end, prefixStyles);
    }
  }
}

function findNodesOverlappingBackground(bgNode, container) {
  if (!container || !('children' in container)) return [];
  
  const bgX = bgNode.absoluteTransform[0][2];
  const bgY = bgNode.absoluteTransform[1][2];
  const bgW = bgNode.width;
  const bgH = bgNode.height;
  
  const overlapping = [];
  for (const child of container.children) {
    if (child.id === bgNode.id) continue;
    if (!isNodeVisible(child)) continue;
    
    const cX = child.absoluteTransform[0][2];
    const cY = child.absoluteTransform[1][2];
    const cW = child.width;
    const cH = child.height;
    
    const overlapX = Math.max(0, Math.min(bgX + bgW, cX + cW) - Math.max(bgX, cX));
    const overlapY = Math.max(0, Math.min(bgY + bgH, cY + cH) - Math.max(bgY, cY));
    const overlapArea = overlapX * overlapY;
    const childArea = cW * cH;
    
    if (childArea > 0 && (overlapArea / childArea) > 0.3) {
      overlapping.push(child);
    }
  }
  return overlapping;
}

function collectLeafContentNodes(node, excludedNodes, list = []) {
  if (excludedNodes.has(node.id)) return list;

  const isIconPlaceholder = node.name && (node.name.toLowerCase().startsWith("iconify:") || /^[a-z0-9_-]+:[a-z0-9_-]+$/i.test(node.name.trim()));
  const isLeaf = node.type === 'TEXT' || 
                 node.type === 'VECTOR' || 
                 node.type === 'RECTANGLE' || 
                 node.type === 'ELLIPSE' || 
                 node.type === 'POLYGON' || 
                 node.type === 'STAR' || 
                 node.type === 'BOOLEAN_OPERATION' ||
                 node.type === 'LINE' ||
                 node.type === 'INSTANCE' ||
                 isIconPlaceholder;

  if (isLeaf) {
    list.push(node);
  } else if ('children' in node) {
    for (const child of node.children) {
      collectLeafContentNodes(child, excludedNodes, list);
    }
  }
  return list;
}

const isIconPlaceholderNode = (node) => node.name && (node.name.toLowerCase().startsWith("iconify:") || /^[a-z0-9_-]+:[a-z0-9_-]+$/i.test(node.name.trim()));

// Filtre les formes d'une slide en excluant la slide elle-même et les calques de fond
function filterShapeNodes(nodes, slideRoot) {
  return nodes.filter(node => {
    if (node.id === slideRoot.id) return false;
    
    const normName = normalize(node.name);
    if (normName === 'fond' || normName === 'background' || normName === 'fond de slide' || normName === 'bg' || normName === 'arriere plan') {
      return false;
    }

    // Si la forme prend presque toute la taille de la slide, c'est probablement le fond,
    // sauf si son nom indique explicitement qu'il s'agit d'une image/photo.
    const isLargeBackground = node.width >= slideRoot.width * 0.95 && node.height >= slideRoot.height * 0.95;
    if (isLargeBackground) {
      const hasImageKeywords = normName.includes("image") || 
                               normName.includes("photo") || 
                               normName.includes("illustration") || 
                               normName.includes("visuel") ||
                               normName.includes("mockup") ||
                               normName.includes("screenshot");
      if (!hasImageKeywords) {
        return false;
      }
    }
    return true;
  });
}

// Fonction globale de renommage et d'organisation hiérarchique d'une slide
function performRenameTemplate(selection) {
  // Fonction d'aide pour marquer un nœud et ses enfants comme traités
  function markNodeProcessed(node, processedSet) {
    processedSet.add(node.id);
    if ('children' in node) {
      for (const child of node.children) {
        markNodeProcessed(child, processedSet);
      }
    }
  }

  // 1. Récupère tous les nœuds de texte visibles dans la sélection
  const visibleTextNodes = findTextNodes(selection).filter(isNodeVisible);

  if (visibleTextNodes.length === 0) {
    return 0;
  }

  const processedNodes = new Set();
  let renamedCount = 0;

  // A. Élimine les fonds de slide (rectangles ou frames de fond de la taille de la slide)
  for (const child of selection.children) {
    if (child.width >= selection.width * 0.95 && child.height >= selection.height * 0.95) {
      processedNodes.add(child.id);
    }
  }

  // 2. Trouve le Titre Principal (le plus grand texte)
  let mainTitle = null;
  let maxFontSize = 0;
  for (const node of visibleTextNodes) {
    if (processedNodes.has(node.id)) continue;
    const size = getFontSize(node);
    if (size > maxFontSize) {
      maxFontSize = size;
      mainTitle = node;
    }
  }

  if (mainTitle) {
    mainTitle.name = "Titre";
    markNodeProcessed(mainTitle, processedNodes);
    renamedCount++;
  }

  let remainingTextNodes = visibleTextNodes.filter(n => !processedNodes.has(n.id));

  // 3. Détection de l'Intro et création du "Bloc Intro"
  let introNode = null;
  introNode = remainingTextNodes.find(n => normalize(n.name).includes("intro"));
  
  if (!introNode && remainingTextNodes.length > 0) {
    // Tri du haut vers le bas
    remainingTextNodes.sort((a, b) => a.absoluteTransform[1][2] - b.absoluteTransform[1][2]);
    const highest = remainingTextNodes[0];
    const highestY = highest.absoluteTransform[1][2];
    const selectionY = selection.absoluteTransform[1][2];
    const relativeY = highestY - selectionY;

    if (relativeY < 340) {
      introNode = highest;
    }
  }

  if (introNode) {
    introNode.name = "Intro";
    renamedCount++;
    
    const nodesToIntroGroup = [introNode];
    
    try {
      const backgroundNode = findBackgroundForNode(introNode, selection);
      if (backgroundNode) {
        nodesToIntroGroup.push(backgroundNode);
        const overlapping = findNodesOverlappingBackground(backgroundNode, selection);
        for (const node of overlapping) {
          if (!mainTitle || node.id !== mainTitle.id) {
            nodesToIntroGroup.push(node);
          }
        }
      } else {
        // Si pas de fond, on regroupe tous les éléments de la zone en-tête (Y < 340px) hors titre principal
        for (const child of selection.children) {
          if (child.id === introNode.id || (mainTitle && child.id === mainTitle.id) || processedNodes.has(child.id)) continue;
          const relativeY = child.absoluteTransform[1][2] - selection.absoluteTransform[1][2];
          if (relativeY < 340 && child.width < selection.width * 0.8) {
            nodesToIntroGroup.push(child);
          }
        }
      }
      
      const uniqueIntroNodes = Array.from(new Set(nodesToIntroGroup));
      const parent = introNode.parent;
      
      let introGroup = null;
      if (parent && parent !== selection && (parent.type === 'GROUP' || parent.type === 'FRAME') && uniqueIntroNodes.every(n => n.parent === parent)) {
        parent.name = "Bloc Intro";
        introGroup = parent;
      } else {
        introGroup = figma.group(uniqueIntroNodes, selection);
        introGroup.name = "Bloc Intro";
      }
      
      markNodeProcessed(introGroup, processedNodes);
    } catch (err) {
      console.warn("Impossible de créer le Bloc Intro :", err);
      markNodeProcessed(introNode, processedNodes);
    }
    
    remainingTextNodes = visibleTextNodes.filter(n => !processedNodes.has(n.id));
  }

  // 4. Détection et création du "Bloc Bulle"
  let bulleNodes = [];
  let bulleGroup = null;

  // A. Cherche si un groupe/frame existant est un Bloc Bulle
  const childrenList = [...selection.children];
  for (const child of childrenList) {
    if (processedNodes.has(child.id)) continue;
    if (child.type === 'GROUP' || child.type === 'FRAME') {
      const nameNorm = normalize(child.name);
      const childY = child.absoluteTransform[1][2] - selection.absoluteTransform[1][2];
      if (nameNorm.includes("bulle") || (childY > 650 && child.width > 800)) {
        bulleGroup = child;
        bulleGroup.name = "Bloc Bulle";
        break;
      }
    }
  }

  if (bulleGroup) {
    const textsInBulle = findTextNodes(bulleGroup).filter(isNodeVisible);
    bulleNodes.push(...textsInBulle);
    
    try {
      const overlappingNodes = findNodesOverlappingBackground(bulleGroup, selection);
      const uniqueNodes = Array.from(new Set([bulleGroup, ...overlappingNodes]));
      bulleGroup = figma.group(uniqueNodes, selection);
      bulleGroup.name = "Bloc Bulle";
      markNodeProcessed(bulleGroup, processedNodes);
    } catch (err) {
      console.warn("Impossible de compléter le Bloc Bulle existant :", err);
      markNodeProcessed(bulleGroup, processedNodes);
    }
  } else {
    // B. Si pas de groupe bulle, on cherche des nœuds de texte individuels nommés "bulle" ou situés en bas
    const textsBulleFlat = remainingTextNodes.filter(node => {
      const nameNorm = normalize(node.name);
      const nodeY = node.absoluteTransform[1][2] - selection.absoluteTransform[1][2];
      return nameNorm.includes("bulle") || (nodeY > 650 && node.width > 800);
    });

    if (textsBulleFlat.length > 0) {
      bulleNodes.push(...textsBulleFlat);

      let bulleBackground = null;
      for (const node of textsBulleFlat) {
        const bg = findBackgroundForNode(node, selection);
        if (bg) {
          bulleBackground = bg;
          break;
        }
      }

      try {
        const nodesToGroup = [];
        if (bulleBackground) {
          nodesToGroup.push(bulleBackground);
          const overlapping = findNodesOverlappingBackground(bulleBackground, selection);
          const otherOverlapping = overlapping.filter(n => !textsBulleFlat.includes(n) && !processedNodes.has(n.id));
          nodesToGroup.push(...otherOverlapping);
        }
        nodesToGroup.push(...textsBulleFlat);
        
        bulleGroup = figma.group(nodesToGroup, selection);
        bulleGroup.name = "Bloc Bulle";
        markNodeProcessed(bulleGroup, processedNodes);
      } catch (err) {
        console.warn("Impossible de créer le Bloc Bulle :", err);
        textsBulleFlat.forEach(n => markNodeProcessed(n, processedNodes));
      }
    }
  }

  // Renommage des textes dans la bulle
  if (bulleNodes.length > 0) {
    const sortedBulleTexts = sortNodesByPosition(bulleNodes);
    sortedBulleTexts.forEach((node, nodeIdx) => {
      if (sortedBulleTexts.length === 1) {
        node.name = "Texte Bulle";
      } else {
        if (nodeIdx === 0) {
          node.name = "Titre Bulle";
        } else {
          node.name = "Texte Bulle";
        }
      }
      renamedCount++;
    });
  }

  remainingTextNodes = visibleTextNodes.filter(n => !processedNodes.has(n.id));

  // 5. Détection et création du "Bloc Image" / "Bloc Photo"
  let imageGroup = null;
  let imagePlaceholderNode = null;
  let sourceNode = null;

  // Recherche d'un placeholder d'image
  const allPlaceholders = findPlaceholderNodes(selection).filter(n => isNodeVisible(n) && !processedNodes.has(n.id));
  for (const node of allPlaceholders) {
    const normName = normalize(node.name);
    const hasImageFill = 'fills' in node && Array.isArray(node.fills) && node.fills.some(f => f.type === 'IMAGE');
    if (hasImageFill || normName.includes("image") || normName.includes("photo") || normName.includes("visuel") || normName.includes("mockup") || normName.includes("screenshot")) {
      imagePlaceholderNode = node;
      break;
    }
  }

  // Recherche d'un calque de source/légende
  sourceNode = remainingTextNodes.find(n => {
    const normName = normalize(n.name);
    const textVal = normalize(n.characters);
    return normName.includes("source") || normName.includes("credit") || textVal.includes("source") || textVal.includes("image");
  });

  if (sourceNode) {
    sourceNode.name = "Source";
    renamedCount++;
    markNodeProcessed(sourceNode, processedNodes);
  }

  if (imagePlaceholderNode) {
    const parent = imagePlaceholderNode.parent;
    if (parent && parent !== selection && (parent.type === 'GROUP' || parent.type === 'FRAME')) {
      imageGroup = parent;
      imageGroup.name = "Bloc Image";
      markNodeProcessed(imageGroup, processedNodes);
    } else {
      try {
        const nodesToGroup = [imagePlaceholderNode];
        if (sourceNode) {
          nodesToGroup.push(sourceNode);
        }
        imageGroup = figma.group(nodesToGroup, selection);
        imageGroup.name = "Bloc Image";
        markNodeProcessed(imageGroup, processedNodes);
      } catch (err) {
        console.warn("Impossible de créer le Bloc Image :", err);
        markNodeProcessed(imagePlaceholderNode, processedNodes);
      }
    }
  }

  remainingTextNodes = visibleTextNodes.filter(n => !processedNodes.has(n.id));

  // Détecteurs de cas de figure spécifiques
  const isComparaisonSlide = normalize(selection.name).includes("comparaison");
  const isChecklistSlide = normalize(selection.name).includes("checklist");
  const isAcronymeSlide = normalize(selection.name).includes("acronyme");

  if (isComparaisonSlide) {
    const childrenGroup = selection.children.filter(c => (c.type === 'GROUP' || c.type === 'FRAME') && !processedNodes.has(c.id));
    childrenGroup.sort((a, b) => a.absoluteTransform[0][2] - b.absoluteTransform[0][2]);
    
    let blocA = childrenGroup[0];
    let blocB = childrenGroup[1];
    
    if (blocA) {
      blocA.name = "Bloc A";
      markNodeProcessed(blocA, processedNodes);
    }
    if (blocB) {
      blocB.name = "Bloc B";
      markNodeProcessed(blocB, processedNodes);
    }
    
    const textsInA = blocA ? findTextNodes(blocA).filter(isNodeVisible) : [];
    const sortedA = sortNodesByPosition(textsInA);
    sortedA.forEach((node, idx) => {
      if (idx === 0) node.name = "Titre A";
      else node.name = `Texte A Item ${idx}`;
      renamedCount++;
    });
    
    const textsInB = blocB ? findTextNodes(blocB).filter(isNodeVisible) : [];
    const sortedB = sortNodesByPosition(textsInB);
    sortedB.forEach((node, idx) => {
      if (idx === 0) node.name = "Titre B";
      else node.name = `Texte B Item ${idx}`;
      renamedCount++;
    });
    
    const sortedItems = sortNodesByPosition(remainingTextNodes);
    sortedItems.forEach((node, idx) => {
      node.name = `Item ${idx + 1}`;
      renamedCount++;
    });
  } else if (isChecklistSlide) {
    const sortedChecklistTexts = sortNodesByPosition(remainingTextNodes);
    let startIndex = 0;
    if (sortedChecklistTexts.length > 1 && sortedChecklistTexts[0].characters.length > 50) {
      sortedChecklistTexts[0].name = "Intro Texte";
      renamedCount++;
      startIndex = 1;
    }
    for (let idx = startIndex; idx < sortedChecklistTexts.length; idx++) {
      sortedChecklistTexts[idx].name = `Titre ${idx - startIndex + 1}`;
      renamedCount++;
    }
    remainingTextNodes.forEach(n => markNodeProcessed(n, processedNodes));
  } else {
    // 6. Regroupement et nommage des colonnes/lignes standard ("Bloc {num}") par clustering géométrique
    const contentNodes = [];
    collectLeafContentNodes(selection, processedNodes, contentNodes);

    if (contentNodes.length > 0) {
      const nameNorm = normalize(selection.name);
      const isRowLayout = nameNorm.includes("process") || nameNorm.includes("checklist") || nameNorm.includes("evolution") || nameNorm.includes("etape") || nameNorm.includes("step") || nameNorm.includes("liste");
      const clusters = [];

      if (isRowLayout) {
        const sortedByY = [...contentNodes].sort((a, b) => a.absoluteTransform[1][2] - b.absoluteTransform[1][2]);
        for (const node of sortedByY) {
          if (node.height > selection.height * 0.6) continue;
          
          const nodeY = node.absoluteTransform[1][2] + node.height / 2;
          let added = false;
          for (const row of clusters) {
            const rowCenterY = row.reduce((sum, n) => sum + n.absoluteTransform[1][2] + n.height / 2, 0) / row.length;
            if (Math.abs(nodeY - rowCenterY) < 100) {
              row.push(node);
              added = true;
              break;
            }
          }
          if (!added) {
            clusters.push([node]);
          }
        }

        clusters.forEach(rowNodes => {
          const rowMinY = Math.min(...rowNodes.map(n => n.absoluteTransform[1][2]));
          const rowMaxY = Math.max(...rowNodes.map(n => n.absoluteTransform[1][2] + n.height));
          
          for (const child of selection.children) {
            if (processedNodes.has(child.id) || rowNodes.some(n => n.id === child.id)) continue;
            if (child.type === 'TEXT') continue;
            if (child.height > selection.height * 0.6) continue;
            
            const childY = child.absoluteTransform[1][2];
            const childH = child.height;
            
            const overlapY = Math.max(0, Math.min(rowMaxY, childY + childH) - Math.max(rowMinY, childY));
            if (childH > 0 && (overlapY / childH) > 0.4) {
              rowNodes.push(child);
            }
          }
        });
      } else {
        const sortedByX = [...contentNodes].sort((a, b) => a.absoluteTransform[0][2] - b.absoluteTransform[0][2]);
        for (const node of sortedByX) {
          if (node.width > selection.width * 0.6) continue;
          
          const nodeX = node.absoluteTransform[0][2] + node.width / 2;
          let added = false;
          for (const col of clusters) {
            const colCenterX = col.reduce((sum, n) => sum + n.absoluteTransform[0][2] + n.width / 2, 0) / col.length;
            if (Math.abs(nodeX - colCenterX) < 180) {
              col.push(node);
              added = true;
              break;
            }
          }
          if (!added) {
            clusters.push([node]);
          }
        }

        clusters.forEach(colNodes => {
          const colMinX = Math.min(...colNodes.map(n => n.absoluteTransform[0][2]));
          const colMaxX = Math.max(...colNodes.map(n => n.absoluteTransform[0][2] + n.width));
          
          for (const child of selection.children) {
            if (processedNodes.has(child.id) || colNodes.some(n => n.id === child.id)) continue;
            if (child.type === 'TEXT') continue;
            if (child.width > selection.width * 0.6) continue;
            
            const childX = child.absoluteTransform[0][2];
            const childW = child.width;
            
            const overlapX = Math.max(0, Math.min(colMaxX, childX + childW) - Math.max(colMinX, childX));
            if (childW > 0 && (overlapX / childW) > 0.4) {
              colNodes.push(child);
            }
          }
        });
      }

      clusters.sort((a, b) => {
        const aX = a.reduce((sum, n) => sum + n.absoluteTransform[0][2], 0) / a.length;
        const aY = a.reduce((sum, n) => sum + n.absoluteTransform[1][2], 0) / a.length;
        const bX = b.reduce((sum, n) => sum + n.absoluteTransform[0][2], 0) / b.length;
        const bY = b.reduce((sum, n) => sum + n.absoluteTransform[1][2], 0) / b.length;

        if (isRowLayout) {
          return aY - bY;
        } else {
          if (Math.abs(aY - bY) < 100) {
            return aX - bX;
          }
          return aY - bY;
        }
      });

      const blockGroups = [];
      clusters.forEach((colNodes, idx) => {
        const blockNum = idx + 1;
        try {
          const uniqueNodes = Array.from(new Set(colNodes));
          const finalNodes = uniqueNodes.filter(node => {
            let current = node.parent;
            while (current && current !== selection) {
              if (uniqueNodes.some(n => n.id === current.id)) {
                return false;
              }
              current = current.parent;
            }
            return true;
          });
          
          const newBlockGroup = figma.group(finalNodes, selection);
          newBlockGroup.name = `Bloc ${blockNum}`;
          
          blockGroups.push({ 
            parent: newBlockGroup, 
            nodes: uniqueNodes.filter(n => n.type === 'TEXT') 
          });
        } catch (err) {
          console.warn(`Impossible de grouper le Bloc ${blockNum} :`, err);
          blockGroups.push({ 
            parent: null, 
            nodes: colNodes.filter(n => n.type === 'TEXT') 
          });
        }
      });

      blockGroups.forEach((g, idx) => {
        const blockNum = idx + 1;
        const sortedTexts = sortNodesByPosition(g.nodes);

        if (isAcronymeSlide) {
          sortedTexts.forEach((node, sIdx) => {
            if (sIdx === 0) {
              node.name = `Lettre ${blockNum}`;
            } else if (sIdx === 1) {
              node.name = `Violet ${blockNum}`;
            } else if (sIdx === 2) {
              node.name = `Texte ${blockNum}`;
            } else {
              node.name = `Texte ${blockNum} - Ligne ${sIdx}`;
            }
            renamedCount++;
          });
        } else {
          const chiffres = sortedTexts.filter(node => isChiffreText(node.characters));
          const remainingAfterChiffres = sortedTexts.filter(node => !chiffres.includes(node));
          
          const violets = remainingAfterChiffres.filter(node => isVioletNode(node));
          const remainingAfterViolets = remainingAfterChiffres.filter(node => !violets.includes(node));

          const parametres = remainingAfterViolets.filter(node => normalize(node.name).includes("param"));
          const standardTexts = remainingAfterViolets.filter(node => !parametres.includes(node));

          chiffres.forEach((node, cIdx) => {
            node.name = chiffres.length === 1 ? `Chiffre ${blockNum}` : `Chiffre ${blockNum} - ${cIdx + 1}`;
            renamedCount++;
          });

          violets.forEach((node, vIdx) => {
            node.name = violets.length === 1 ? `Violet ${blockNum}` : `Violet ${blockNum} - ${vIdx + 1}`;
            renamedCount++;
          });

          parametres.forEach((node, pIdx) => {
            node.name = parametres.length === 1 ? `Parametre ${blockNum}` : `Parametre ${blockNum} - ${pIdx + 1}`;
            renamedCount++;
          });

          const hasTitleOrViolet = violets.length > 0;
          standardTexts.forEach((node, sIdx) => {
            let nameIndex = sIdx;
            if (hasTitleOrViolet) {
              nameIndex = sIdx + 1;
            }
            if (nameIndex === 0) {
              node.name = `Titre ${blockNum}`;
            } else if (nameIndex === 1) {
              node.name = `Texte ${blockNum}`;
            } else {
              node.name = `Texte ${blockNum} - Ligne ${nameIndex}`;
            }
            renamedCount++;
          });
        }

        if (g.parent) {
          const potentialIcons = findPlaceholderNodes(g.parent).filter(isNodeVisible);
          const iconNodes = [];
          for (const node of potentialIcons) {
            const normName = normalize(node.name);
            if (isIconPlaceholderNode(node) || normName.includes("picto") || normName.includes("icon") || normName.includes("svg") || normName.includes("logo") || normName.includes("group")) {
              iconNodes.push(node);
            }
          }
          
          iconNodes.forEach((node, iIdx) => {
            node.name = iconNodes.length === 1 ? `Picto ${blockNum}` : `Picto ${blockNum} - ${iIdx + 1}`;
            renamedCount++;
          });
        }
      });
    }
  }

  function sortContainerChildren(container) {
    if (container.type === 'INSTANCE') {
      return;
    }

    const children = [...container.children];
    if (children.length <= 1) return;

    const isRenamedNode = (node) => {
      const normName = normalize(node.name);
      if (/^(titre|intro|texte|violet|bloc|chiffre|parametre|source|photo|image|picto|lettre)\d*$/.test(normName)) return true;
      if (normName.includes("bulle")) return true;
      return false;
    };

    const otherChildren = children.filter(child => !isRenamedNode(child));
    const renamedBlocksAndFlatNodes = children.filter(child => {
      const norm = normalize(child.name);
      if (norm.includes("bulle")) return false;
      return isRenamedNode(child);
    });

    const bulleNodes = children.filter(child => normalize(child.name).includes("bulle"));

    renamedBlocksAndFlatNodes.sort((a, b) => {
      const numA = parseInt((normalize(a.name).match(/\d+/) || ["0"])[0], 10);
      const numB = parseInt((normalize(b.name).match(/\d+/) || ["0"])[0], 10);

      if (numA === numB) {
        const typeWeight = { "titre": 8, "intro": 7, "chiffre": 6, "picto": 5, "parametre": 4, "texte": 3, "violet": 2, "lettre": 1.5, "bloc": 1 };
        const typeA = (normalize(a.name).match(/^[a-z]+/) || [""])[0];
        const typeB = (normalize(b.name).match(/^[a-z]+/) || [""])[0];
        const wA = typeWeight[typeA] || 0;
        const wB = typeWeight[typeB] || 0;
        return wB - wA;
      }
      return numA - numB;
    });

    bulleNodes.sort((a, b) => {
      const typeWeight = { "titre": 2, "texte": 1 };
      const typeA = (normalize(a.name).match(/^[a-z]+/) || [""])[0];
      const typeB = (normalize(b.name).match(/^[a-z]+/) || [""])[0];
      const wA = typeWeight[typeA] || 0;
      const wB = typeWeight[typeB] || 0;
      return wB - wA;
    });

    const isAutoLayout = 'layoutMode' in container && container.layoutMode !== 'NONE';

    let targetOrder = [];
    if (isAutoLayout) {
      targetOrder = [...renamedBlocksAndFlatNodes, ...bulleNodes, ...otherChildren];
    } else {
      targetOrder = [...otherChildren, ...bulleNodes.slice().reverse(), ...renamedBlocksAndFlatNodes.slice().reverse()];
    }

    for (const child of targetOrder) {
      container.appendChild(child);
    }
  }

  sortContainerChildren(selection);

  function recurseSort(node) {
    if (node.type === 'GROUP' || node.type === 'FRAME') {
      sortContainerChildren(node);
      if ('children' in node) {
        for (const child of node.children) {
          recurseSort(child);
        }
      }
    }
  }
  for (const child of selection.children) {
    recurseSort(child);
  }

  return renamedCount;
}

// Fonction récursive de création de nœuds Figma à partir d'une spécification HTML/CSS
async function buildFigmaNodeFromSpec(spec) {
  if (!spec) return null;

  function parseCSSColor(cssColorStr) {
    if (!cssColorStr || cssColorStr === 'transparent' || cssColorStr === 'rgba(0, 0, 0, 0)') return null;
    const match = cssColorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      const opacity = match[4] !== undefined ? parseFloat(match[4]) : 1;
      if (opacity <= 0.01) return null;
      return {
        color: {
          r: parseInt(match[1]) / 255,
          g: parseInt(match[2]) / 255,
          b: parseInt(match[3]) / 255
        },
        opacity: opacity
      };
    }
    return null;
  }

  async function getFigmaFont(fontWeight) {
    const weightNum = parseInt(fontWeight) || 400;
    let styleName = "Regular";
    if (weightNum >= 900) styleName = "Black";
    else if (weightNum >= 800) styleName = "ExtraBold";
    else if (weightNum >= 700) styleName = "Bold";
    else if (weightNum >= 600) styleName = "SemiBold";
    else if (weightNum >= 500) styleName = "Medium";

    const fontFamilies = ["Basic Sans Alt", "Basic Sans", "Inter"];
    for (const family of fontFamilies) {
      try {
        const font = { family, style: styleName };
        await figma.loadFontAsync(font);
        return font;
      } catch (e) {
        try {
          const fontFallback = { family, style: "Regular" };
          await figma.loadFontAsync(fontFallback);
          return fontFallback;
        } catch (e2) {}
      }
    }
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    return { family: "Inter", style: "Regular" };
  }

  const frame = figma.createFrame();
  frame.name = spec.figmaName || spec.className || spec.tagName || "Custom Element";

  const w = spec.styles && spec.styles.width > 0 ? spec.styles.width : 1920;
  const h = spec.styles && spec.styles.height > 0 ? spec.styles.height : 1080;
  frame.resize(Math.max(10, Math.round(w)), Math.max(10, Math.round(h)));

  const isRootSlide = (w >= 1920 && h >= 1080) || (spec.styles && (spec.styles.width === 1920 || spec.styles.height === 1080));

  if (spec.styles && (spec.styles.display === 'flex' || spec.styles.display === 'block' || spec.styles.display === 'grid')) {
    let isVertical = (spec.styles.flexDirection === 'column');
    if (spec.styles.display === 'grid') {
      const cols = spec.styles.gridTemplateColumns;
      const colCount = (cols && cols !== 'none') ? cols.trim().split(/\s+/).length : 1;
      isVertical = (colCount <= 1);
    }
    frame.layoutMode = isVertical ? 'VERTICAL' : 'HORIZONTAL';
    if (spec.styles.paddingTop) frame.paddingTop = Math.round(spec.styles.paddingTop);
    if (spec.styles.paddingRight) frame.paddingRight = Math.round(spec.styles.paddingRight);
    if (spec.styles.paddingBottom) frame.paddingBottom = Math.round(spec.styles.paddingBottom);
    if (spec.styles.paddingLeft) frame.paddingLeft = Math.round(spec.styles.paddingLeft);
    if (spec.styles.gap && !isNaN(spec.styles.gap)) frame.itemSpacing = Math.round(spec.styles.gap);

    // justify-content → primaryAxisAlignItems
    if (spec.styles.justifyContent) {
      const jcMap = { 'flex-start': 'MIN', 'start': 'MIN', 'center': 'CENTER', 'flex-end': 'MAX', 'end': 'MAX', 'space-between': 'SPACE_BETWEEN' };
      if (jcMap[spec.styles.justifyContent]) frame.primaryAxisAlignItems = jcMap[spec.styles.justifyContent];
    }

    // align-items → counterAxisAlignItems
    if (spec.styles.alignItems) {
      const aiMap = { 'flex-start': 'MIN', 'start': 'MIN', 'center': 'CENTER', 'flex-end': 'MAX', 'end': 'MAX', 'baseline': 'BASELINE' };
      if (aiMap[spec.styles.alignItems]) frame.counterAxisAlignItems = aiMap[spec.styles.alignItems];
    }

    if (isRootSlide) {
      frame.primaryAxisSizingMode = 'FIXED';
      frame.counterAxisSizingMode = 'FIXED';
      frame.resize(1920, 1080);
    } else {
      frame.primaryAxisSizingMode = 'AUTO';
      frame.counterAxisSizingMode = 'AUTO';
    }
  }

  // Parsing des Arrières-plans (Solid & Gradients)
  let bgApplied = false;
  if (spec.styles && spec.styles.backgroundImage && spec.styles.backgroundImage.includes('gradient')) {
    const colorMatches = spec.styles.backgroundImage.match(/(?:rgba?\(.*?\)|#[0-9a-fA-F]{3,8})/g);
    if (colorMatches && colorMatches.length >= 2) {
      const stops = colorMatches.map((cStr, idx) => {
        const cParsed = parseCSSColor(cStr) || { color: { r: 0.1, g: 0.05, b: 0.2 }, opacity: 1 };
        return {
          color: { r: cParsed.color.r, g: cParsed.color.g, b: cParsed.color.b, a: cParsed.opacity },
          position: idx / (colorMatches.length - 1)
        };
      });
      frame.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: stops
      }];
      bgApplied = true;
    }
  }

  if (!bgApplied) {
    if (spec.styles && spec.styles.backgroundColor) {
      const bg = parseCSSColor(spec.styles.backgroundColor);
      if (bg) {
        frame.fills = [{ type: 'SOLID', color: bg.color, opacity: bg.opacity }];
      } else {
        frame.fills = [];
      }
    } else {
      frame.fills = [];
    }
  }

  if (spec.styles && spec.styles.borderRadius) {
    frame.cornerRadius = Math.round(spec.styles.borderRadius);
  }

  // --- Propriétés étendues ---

  // Opacity de l'élément
  if (spec.styles && spec.styles.opacity !== undefined && spec.styles.opacity < 1) {
    frame.opacity = Math.max(0, spec.styles.opacity);
  }

  // Overflow hidden → clipsContent
  if (spec.styles && spec.styles.overflow === 'hidden') {
    frame.clipsContent = true;
  }

  // Bordures → strokes
  if (spec.styles && spec.styles.borderWidth > 0 && spec.styles.borderStyle !== 'none') {
    const borderColor = parseCSSColor(spec.styles.borderColor);
    if (borderColor) {
      frame.strokes = [{ type: 'SOLID', color: borderColor.color, opacity: borderColor.opacity }];
      frame.strokeWeight = Math.round(spec.styles.borderWidth);
      frame.strokeAlign = 'INSIDE';
    }
  }

  // Box-shadow → DROP_SHADOW
  if (spec.styles && spec.styles.boxShadow && spec.styles.boxShadow !== 'none') {
    const colorMatch = spec.styles.boxShadow.match(/rgba?\([^)]+\)/);
    const numsMatch = spec.styles.boxShadow.match(/(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px(?:\s+([\d.]+)px)?/);
    if (numsMatch) {
      const shadowColor = colorMatch ? parseCSSColor(colorMatch[0]) : { color: { r: 0, g: 0, b: 0 }, opacity: 0.25 };
      if (shadowColor) {
        const dropShadowObj = {
          type: 'DROP_SHADOW',
          color: { r: shadowColor.color.r, g: shadowColor.color.g, b: shadowColor.color.b, a: shadowColor.opacity },
          offset: { x: parseFloat(numsMatch[1]) || 0, y: parseFloat(numsMatch[2]) || 0 },
          radius: parseFloat(numsMatch[3]) || 0,
          blendMode: 'NORMAL',
          visible: true
        };
        const spreadVal = parseFloat(numsMatch[4]);
        if (!isNaN(spreadVal) && spreadVal !== 0) {
          dropShadowObj.spread = spreadVal;
        }
        frame.effects = [dropShadowObj];
      }
    }
  }

  // Max-width constraint
  if (spec.styles && spec.styles.maxWidth > 0 && spec.styles.maxWidth < 9999) {
    frame.maxWidth = Math.round(spec.styles.maxWidth);
  }

  if (spec.children && spec.children.length > 0) {
    for (const childSpec of spec.children) {
      if (childSpec.type === 'TEXT') {
        if (childSpec.text) {
          const txt = figma.createText();
          const fontObj = await getFigmaFont(spec.styles ? spec.styles.fontWeight : 400);
          txt.fontName = fontObj;
          txt.name = childSpec.figmaName || "Texte";
          txt.characters = childSpec.text;
          if (spec.styles && spec.styles.fontSize) txt.fontSize = Math.min(140, Math.max(14, Math.round(spec.styles.fontSize)));
          if (spec.styles && spec.styles.color) {
            const c = parseCSSColor(spec.styles.color);
            if (c) txt.fills = [{ type: 'SOLID', color: c.color, opacity: c.opacity }];
          }
          if (spec.styles && spec.styles.textAlign) {
             if (spec.styles.textAlign === 'center') txt.textAlignHorizontal = 'CENTER';
             else if (spec.styles.textAlign === 'right') txt.textAlignHorizontal = 'RIGHT';
             else if (spec.styles.textAlign === 'justify') txt.textAlignHorizontal = 'JUSTIFIED';
             else txt.textAlignHorizontal = 'LEFT';
          }

          // Line-height
          if (spec.styles && spec.styles.lineHeight && spec.styles.lineHeight !== 'normal') {
            const lh = parseFloat(spec.styles.lineHeight);
            if (!isNaN(lh) && lh > 0) {
              txt.lineHeight = { value: lh, unit: 'PIXELS' };
            }
          }

          // Letter-spacing
          if (spec.styles && spec.styles.letterSpacing && spec.styles.letterSpacing !== 'normal') {
            const ls = parseFloat(spec.styles.letterSpacing);
            if (!isNaN(ls)) {
              txt.letterSpacing = { value: ls, unit: 'PIXELS' };
            }
          }

          // Text-transform → textCase
          if (spec.styles && spec.styles.textTransform) {
            const tcMap = { 'uppercase': 'UPPER', 'lowercase': 'LOWER', 'capitalize': 'TITLE' };
            if (tcMap[spec.styles.textTransform]) {
              txt.textCase = tcMap[spec.styles.textTransform];
            }
          }

          // Ajoute D'ABORD le texte au conteneur avant d'appliquer le STRETCH et HEIGHT auto
          frame.appendChild(txt);

          if (frame.layoutMode !== 'NONE') {
            if (frame.layoutMode === 'HORIZONTAL') {
              txt.layoutAlign = 'INHERIT';
              txt.textAutoResize = 'WIDTH_AND_HEIGHT'; // Hug contents horizontally
            } else {
              txt.layoutAlign = 'STRETCH';
              txt.textAutoResize = 'HEIGHT';
            }
          }
        }
      } else {
        const childFrame = await buildFigmaNodeFromSpec(childSpec);
        if (childFrame) {
          frame.appendChild(childFrame);
          
          // Position absolute → overlay dans le conteneur parent (uniquement si le parent est en Auto Layout)
          if (childSpec.styles && childSpec.styles.position === 'absolute' && frame.layoutMode !== 'NONE') {
            childFrame.layoutPositioning = 'ABSOLUTE';
            childFrame.x = childSpec.styles.left || 0;
            childFrame.y = childSpec.styles.top || 0;
            if (childSpec.styles.width > 0 && childSpec.styles.height > 0) {
              childFrame.resize(Math.max(1, Math.round(childSpec.styles.width)), Math.max(1, Math.round(childSpec.styles.height)));
            }
          } else if (childSpec.styles) {
            if (frame.layoutMode === 'HORIZONTAL') {
              childFrame.layoutGrow = childSpec.styles.flexGrow > 0 ? 1 : 0;
              // Fix: si le parent a alignItems stretch ou non défini, stretch l'enfant
              const shouldStretchH = childSpec.styles.alignSelf === 'stretch' || (!childSpec.styles.alignSelf && spec.styles && (spec.styles.alignItems === 'stretch' || (!spec.styles.alignItems || spec.styles.alignItems === 'normal')));
              childFrame.layoutAlign = shouldStretchH ? 'STRETCH' : 'INHERIT';
            } else if (frame.layoutMode === 'VERTICAL') {
              childFrame.layoutGrow = childSpec.styles.flexGrow > 0 ? 1 : 0;
              // Block elements typically stretch in vertical flex unless aligned otherwise
              const shouldStretch = childSpec.styles.alignSelf === 'stretch' || (!childSpec.styles.alignSelf && spec.styles && spec.styles.alignItems !== 'center' && spec.styles.alignItems !== 'flex-start' && spec.styles.alignItems !== 'flex-end');
              childFrame.layoutAlign = shouldStretch ? 'STRETCH' : 'INHERIT';
            }
          } else {
            if (frame.layoutMode === 'HORIZONTAL') {
              childFrame.layoutGrow = 0;
            } else if (frame.layoutMode === 'VERTICAL') {
              childFrame.layoutAlign = 'STRETCH';
            }
          }
        }
      }
    }
  }

  return frame;
}

// Écoute les messages provenant de l'interface utilisateur (ui.html)
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'resize-window') {
    figma.ui.resize(msg.width, msg.height);
    return;
  }

  if (msg.type === 'assets-loaded') {
    if (assetsResolve) {
      assetsResolve(msg.results);
      assetsResolve = null;
    }
    return;
  }

  // --- Construction de Slide sur-mesure depuis du HTML/CSS ---
  if (msg.type === 'build-custom-slide') {
    try {
      const spec = msg.data;
      if (!spec) {
        figma.ui.postMessage({ type: 'error', message: 'Spécification HTML invalide.' });
        return;
      }

      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });

      const slideFrame = await buildFigmaNodeFromSpec(spec);
      if (slideFrame) {
        slideFrame.x = figma.viewport.center.x - 960;
        slideFrame.y = figma.viewport.center.y - 540;
        figma.currentPage.selection = [slideFrame];
        figma.ui.postMessage({ type: 'success', message: 'Slide sur-mesure construite avec succès !' });
      }
    } catch (err) {
      console.error("Erreur de construction sur-mesure:", err);
      figma.ui.postMessage({ type: 'error', message: 'Erreur lors de la construction de la slide : ' + (err.message || err) });
    }
    return;
  }

  // --- Corrections structurées (rename_layer / delete_layer / set_text) ---
  if (msg.type === 'apply-corrections') {
    const corrections = msg.data && msg.data.corrections;
    if (!corrections || !Array.isArray(corrections)) {
      figma.ui.postMessage({ type: 'error', message: 'Format invalide : "corrections" doit être une liste.' });
      return;
    }



    let applied = 0;
    let skipped = 0;

    for (const correction of corrections) {
      // 1. Recherche du nœud cible (par ID exact, ou par sélecteur de nom sous un parent)
      let node = null;
      if (correction.node_id) {
        node = figma.getNodeById(correction.node_id);
      } else if (correction.parent_id && correction.selector) {
        const parent = figma.getNodeById(correction.parent_id);
        if (parent && 'findAll' in parent) {
          node = parent.findAll(n => normalize(n.name) === normalize(correction.selector))[0];
        }
      }

      // Pour la création de nœud, on tolère que node soit nul (on utilise parent_id ou la sélection)
      if (!node && correction.action !== 'create_node') {
        console.warn(`[Corrections] Cible introuvable pour la correction :`, correction);
        skipped++;
        continue;
      }

      try {
        if (correction.action === 'rename_layer') {
          node.name = correction.new_name;
          applied++;
        } else if (correction.action === 'delete_layer' || correction.action === 'delete_node') {
          node.remove();
          applied++;
        } else if (correction.action === 'set_text') {
          if (node.type === 'TEXT') {
            await loadFontForNode(node);
            node.characters = String(correction.text);
            applied++;
          } else {
            console.warn(`[Corrections] set_text ignoré : ${node.id} n'est pas un TEXT`);
            skipped++;
          }
        } else if (correction.action === 'set_property') {
          const prop = correction.property;
          const val  = correction.value;

          if (prop === undefined || val === undefined) {
            console.warn(`[Corrections] set_property sans property/value sur ${node.id}`);
            skipped++;
          } else if (prop === 'width') {
            node.resize(Number(val), node.height);
            applied++;
          } else if (prop === 'height') {
            node.resize(node.width, Number(val));
            applied++;
          } else if (prop === 'fills') {
            if (typeof val === 'string' && val.startsWith('#')) {
              node.fills = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
            } else if (Array.isArray(val)) {
              node.fills = val.map(f => {
                if (typeof f === 'string' && f.startsWith('#')) {
                  return { type: 'SOLID', color: hexToFigmaColor(f) };
                } else if (f && f.hex) {
                  return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                }
                return f;
              });
            }
            applied++;
          } else if (prop === 'strokes') {
            if (typeof val === 'string' && val.startsWith('#')) {
              node.strokes = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
            } else if (Array.isArray(val)) {
              node.strokes = val.map(f => {
                if (typeof f === 'string' && f.startsWith('#')) {
                  return { type: 'SOLID', color: hexToFigmaColor(f) };
                } else if (f && f.hex) {
                  return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                }
                return f;
              });
            }
            applied++;
          } else if (!(prop in node)) {
            console.warn(`[Corrections] Propriété inconnue "${prop}" sur ${node.id}`);
            skipped++;
          } else {
            node[prop] = val;
            applied++;
          }
        } else if (correction.action === 'create_node') {
          // Détermination du nœud parent
          let parentNode = null;
          if (correction.parent_id) {
            parentNode = figma.getNodeById(correction.parent_id);
          } else {
            parentNode = figma.currentPage.selection[0];
          }

          if (!parentNode || !('children' in parentNode)) {
            console.warn(`[Corrections] Parent de création invalide ou introuvable :`, correction.parent_id);
            skipped++;
            continue;
          }

          let newNode;
          const nodeType = (correction.node_type || 'FRAME').toUpperCase();
          if (nodeType === 'FRAME') {
            newNode = figma.createFrame();
          } else if (nodeType === 'TEXT') {
            newNode = figma.createText();
          } else if (nodeType === 'RECTANGLE') {
            newNode = figma.createRectangle();
          } else {
            console.warn(`[Corrections] Type de nœud inconnu pour la création : ${nodeType}`);
            skipped++;
            continue;
          }

          if (correction.name) {
            newNode.name = correction.name;
          }

          parentNode.appendChild(newNode);

          // Application des propriétés initiales du nouveau nœud
          if (correction.properties) {
            let w = newNode.width;
            let h = newNode.height;
            let hasWidth = false;
            let hasHeight = false;

            for (const [prop, val] of Object.entries(correction.properties)) {
              if (prop === 'width') {
                w = Number(val);
                hasWidth = true;
              } else if (prop === 'height') {
                h = Number(val);
                hasHeight = true;
              } else if (prop === 'fills') {
                if (typeof val === 'string' && val.startsWith('#')) {
                  newNode.fills = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                } else if (Array.isArray(val)) {
                  newNode.fills = val.map(f => {
                    if (typeof f === 'string' && f.startsWith('#')) {
                      return { type: 'SOLID', color: hexToFigmaColor(f) };
                    } else if (f && f.hex) {
                      return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                    }
                    return f;
                  });
                }
              } else if (prop === 'strokes') {
                if (typeof val === 'string' && val.startsWith('#')) {
                  newNode.strokes = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                } else if (Array.isArray(val)) {
                  newNode.strokes = val.map(f => {
                    if (typeof f === 'string' && f.startsWith('#')) {
                      return { type: 'SOLID', color: hexToFigmaColor(f) };
                    } else if (f && f.hex) {
                      return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                    }
                    return f;
                    });
                }
              } else if (prop === 'characters' && nodeType === 'TEXT') {
                await figma.loadFontAsync({ family: "Inter", style: "Regular" });
                newNode.characters = String(val);
              } else if (prop in newNode) {
                newNode[prop] = val;
              }
            }
            if (hasWidth || hasHeight) {
              newNode.resize(w, h);
            }
          }
          applied++;
        } else {
          console.warn(`[Corrections] Action inconnue : ${correction.action}`);
          skipped++;
        }
      } catch (e) {
        console.error(`[Corrections] Erreur lors de l'exécution de l'action :`, e);
        skipped++;
      }
    }

    const summary = `${applied} correction(s) appliquée(s)${skipped > 0 ? ` · ${skipped} ignorée(s)` : ''}.`;
    figma.ui.postMessage({
      type: skipped > 0 && applied === 0 ? 'error' : skipped > 0 ? 'warning' : 'success',
      message: summary,
      clearInput: true
    });
    return;
  }

  if (msg.type === 'generate-slides') {
    try {
      let data = msg.data;

      // Mode d'importation directe d'images (sans slides ni templates)
      let standaloneImages = [];
      if (data) {
        if (data.images && Array.isArray(data.images)) {
          standaloneImages = data.images;
        } else if (Array.isArray(data) && data.length > 0 && (typeof data[0] === 'string' && data[0].startsWith('http'))) {
          standaloneImages = data;
        } else if (Array.isArray(data) && data.length > 0 && data[0] && typeof data[0] === 'object' && (data[0].url || data[0].image || data[0].src)) {
          standaloneImages = data;
        } else if (data && typeof data === 'object' && (data.url || data.image) && !data.template && !data.slides && !data.lessons) {
          standaloneImages = [data];
        }
      }

      if (standaloneImages.length > 0) {
        const fetchTasks = [];
        const createdRects = [];
        let currentX = figma.viewport.center.x - ((standaloneImages.length * 2020) / 2);
        let currentY = figma.viewport.center.y - 540;

        for (let idx = 0; idx < standaloneImages.length; idx++) {
          const item = standaloneImages[idx];
          const imgUrl = typeof item === 'string' ? item : (item.url || item.image || item.src);
          const imgName = (typeof item === 'object' && item.name) ? item.name : `Image ${idx + 1}`;

          const rect = figma.createRectangle();
          rect.name = imgName;
          rect.resize(1920, 1080);
          rect.x = currentX + idx * 2020;
          rect.y = currentY;
          rect.fills = [{ type: 'SOLID', color: hexToFigmaColor("#E2E8F0") }];
          figma.currentPage.appendChild(rect);
          createdRects.push(rect);

          fetchTasks.push({
            id: rect.id,
            name: imgName,
            url: imgUrl,
            type: 'image'
          });
        }

        if (fetchTasks.length > 0) {
          figma.ui.postMessage({ type: 'fetch-assets', tasks: fetchTasks });
          const results = await new Promise((resolve) => { assetsResolve = resolve; });
          for (const result of results) {
            const node = figma.getNodeById(result.id);
            if (node && result.type === 'image' && result.data) {
              try {
                const image = figma.createImage(new Uint8Array(result.data));
                node.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];
              } catch (e) {
                console.error("Erreur de chargement d'image standalone :", e);
              }
            }
          }
        }
        if (createdRects.length > 0) {
          figma.currentPage.selection = createdRects;
        }
        figma.ui.postMessage({ type: 'success', message: `${standaloneImages.length} image(s) insérée(s) directement sur le canvas.` });
        return;
      }

      let lessons = [];
      if (data) {
        if (Array.isArray(data)) {
          if (data.length > 0 && (data[0].template || data[0].content)) {
            lessons = [{
              lessonTitle: "Leçon",
              slides: data
            }];
          } else {
            lessons = data;
          }
        } else if (data.lessons && Array.isArray(data.lessons)) {
          lessons = data.lessons;
        } else if (data.slides && Array.isArray(data.slides)) {
          lessons = [{
            lessonTitle: data.lessonTitle || "Leçon",
            slides: data.slides
          }];
        } else if (data.template || data.content) {
          lessons = [{
            lessonTitle: "Leçon",
            slides: [data]
          }];
        }
      }
      if (lessons.length === 0) {
        figma.ui.postMessage({ type: 'error', message: 'Format invalide : fourni une slide, une liste de slides ou un format leçons.' });
        return;
      }

    // Aplatit toutes les slides pour les traitements post-création (renommage, etc.)
    const flatSlidesData = [];
    for (const lesson of lessons) {
      if (lesson.slides && Array.isArray(lesson.slides)) {
        flatSlidesData.push(...lesson.slides);
      }
    }

    // 1. Récupère tous les composants et tous les cadres (Frames) de toutes les pages
    const allComponents = figma.root.findAllWithCriteria({ types: ['COMPONENT'] });
    const currentPageFrames = figma.root.findAllWithCriteria({ types: ['FRAME'] });

    // Calcul de la largeur totale pour centrer l'ensemble des leçons côte à côte
    const totalLessons = lessons.length;
    let totalWidth = 0;
    for (let idx = 0; idx < totalLessons; idx++) {
      const slidesCount = (lessons[idx].slides || []).length;
      const slidesWidth = slidesCount > 0 ? (slidesCount * 2020 - 100) : 1920;
      const lessonWidth = slidesWidth + 1000; // 500px padding à gauche et 500px à droite
      totalWidth += lessonWidth;
      if (idx < totalLessons - 1) {
        totalWidth += 500; // Espace entre les leçons plus proche
      }
    }

    // Position de départ toujours centrée sur le viewer actuel de l'utilisateur (figma.viewport.center)
    const isSingleSlideOverall = (flatSlidesData.length === 1);
    let currentX = 0;
    let currentY = 0;

    if (isSingleSlideOverall) {
      currentX = figma.viewport.center.x - 960;
      currentY = figma.viewport.center.y - 540;
    } else {
      currentX = figma.viewport.center.x - (totalWidth / 2);
      // Les slides dans un cadre de leçon sont positionnées à y = 500 et font 1080px de haut.
      // Le centre vertical des slides dans le cadre est donc y = 500 + 540 = 1040px.
      // Aligner ce centre avec figma.viewport.center.y place les slides exactement au centre du viewer.
      currentY = figma.viewport.center.y - 1040;
    }
    const startX = currentX;

    const createdInstances = [];
    const lessonFrames = [];
    const fetchTasks = [];

    // Boucle sur chaque leçon (côte à côte)
    for (let lessonIndex = 0; lessonIndex < totalLessons; lessonIndex++) {
      const lesson = lessons[lessonIndex];
      const slides = lesson.slides || [];
      const slidesWidth = slides.length > 0 ? (slides.length * 2020 - 100) : 1920;
      const lessonWidth = slidesWidth + 1000; // +1000px pour les marges gauche/droite de 500px

      // Création du conteneur (Frame) de la leçon uniquement si plusieurs slides sont générées au total
      const isSingleSlide = (flatSlidesData.length === 1);
      let lessonFrame = null;
      if (!isSingleSlide) {
        lessonFrame = figma.createFrame();
        lessonFrame.name = lesson.lessonId || lesson.code || lesson.lessonTitle || `Leçon ${lessonIndex + 1}`;
        lessonFrame.resize(lessonWidth, 10670);
        lessonFrame.x = currentX;
        lessonFrame.y = currentY;
        const bgColorHex = lesson.backgroundColor || lesson.color || lesson.fillColor || "#F2F3F6";
        lessonFrame.fills = [{ type: 'SOLID', color: hexToFigmaColor(bgColorHex) }]; // Couleur de fond personnalisée ou gris clair par défaut
        figma.currentPage.appendChild(lessonFrame);
        lessonFrames.push(lessonFrame);
      }

      // ... (slides loop) ...


      // Boucle sur chaque slide définie dans la leçon
      for (let i = 0; i < slides.length; i++) {
        const slideData = slides[i];
        const templateName = slideData.template;

        // Recherche du template (soit un Composant, soit un Cadre/Frame)
        let templateNode = null;

        // 1. Recherche dans les cadres (Frames) de la page active (nom exact + dimensions de slide 1920x1080)
        templateNode = currentPageFrames.find(f => normalize(f.name) === normalize(templateName) && f.width === 1920 && f.height === 1080);

        // 2. Recherche dans les composants (nom exact + dimensions de slide 1920x1080)
        if (!templateNode) {
          templateNode = allComponents.find(c => normalize(c.name) === normalize(templateName) && c.width === 1920 && c.height === 1080);
        }

        // 3. Recherche dans les variants de composants (nom exact)
        if (!templateNode) {
          templateNode = allComponents.find(c => {
            if (c.parent && c.parent.type === 'COMPONENT_SET') {
              const properties = c.name.split(',').map(p => {
                const parts = p.split('=');
                return parts[1] ? parts[1].trim() : p.trim();
              });
              return properties.some(val => normalize(val) === normalize(templateName));
            }
            return false;
          });
        }

        // 4. Repli de secours sans filtrage de dimensions
        if (!templateNode) {
          templateNode = currentPageFrames.find(f => normalize(f.name) === normalize(templateName));
        }
        if (!templateNode) {
          templateNode = allComponents.find(c => normalize(c.name) === normalize(templateName));
        }

        // Si le template n'a pas été trouvé
        if (!templateNode) {
          const availableNames = [
            ...allComponents.map(c => c.name),
            ...currentPageFrames.map(f => f.name)
          ].filter((val, idx, self) => self.indexOf(val) === idx);

          figma.ui.postMessage({
            type: 'error',
            message: `Template "${templateName}" introuvable.\n\n` +
              `Pour résoudre cela :\n` +
              `1. Assurez-vous d'avoir un cadre (Frame) ou un composant nommé exactement "${templateName}" dans votre fichier Figma (sur la page courante).\n` +
              `2. Si vos templates sont sur une autre page, allez sur cette page ou copiez-les ici.\n\n` +
              `Éléments trouvés : ` + (availableNames.slice(0, 10).join(', ') || 'aucun') +
              (availableNames.length > 10 ? '...' : '')
          });
          return;
        }

        // 2. Duplication du template (création d'une instance ou clonage du cadre)
        let instance;
        if (templateNode.type === 'COMPONENT') {
          instance = templateNode.createInstance();
        } else {
          instance = templateNode.clone();
        }

        // Ajout à l'intérieur du cadre de la leçon ou direct sur la page
        if (lessonFrame) {
          lessonFrame.appendChild(instance);
          // Positionnement local de la slide dans la leçon (marge interne de 500px à gauche et en haut)
          instance.x = 500 + i * 2020;
          instance.y = 500;
        } else {
          figma.currentPage.appendChild(instance);
          instance.x = currentX;
          instance.y = currentY;
        }

        // Renommage hiérarchique de la slide (ex: 1.1. NomTemplate, ou 1. NomTemplate)
        const prefixIndex = totalLessons > 1 ? `${lessonIndex + 1}.${i + 1}` : `${i + 1}`;
        instance.name = `${prefixIndex}. ${templateNode.name}`;

        createdInstances.push(instance);

        // 3. Remplissage des textes et préparation des assets dans l'instance (calques visibles uniquement)
        const textNodes = findTextNodes(instance).filter(isNodeVisible);
        const sortedTextNodes = sortNodesByPosition(textNodes);

        const allShapes = findPlaceholderNodes(instance).filter(isNodeVisible);
        const shapeNodes = filterShapeNodes(allShapes, instance);
        const sortedShapeNodes = sortNodesByPosition(shapeNodes);

        let slideContent = slideData.content || slideData.data;

        // Normalisation si le contenu est sous forme de tableau de paires clé-valeur [{"key": "...", "value": "..."}]
        if (Array.isArray(slideContent) && slideContent.length > 0 && typeof slideContent[0] === 'object' && slideContent[0] !== null && 'key' in slideContent[0]) {
          const normalized = {};
          for (const item of slideContent) {
            if (item && typeof item === 'object' && 'key' in item) {
              normalized[item.key] = item.value;
            }
          }
          slideContent = normalized;
        }

        if (Array.isArray(slideContent)) {
          // Cas A : Le contenu est une simple liste ordonnée de textes
          for (let j = 0; j < Math.min(slideContent.length, sortedTextNodes.length); j++) {
            const node = sortedTextNodes[j];
            const text = slideContent[j];
            await loadFontForNode(node);
            node.characters = text;
            node.visible = true; // S'assure que le calque est visible s'il a du contenu
          }
        } else if (typeof slideContent === 'object' && slideContent !== null) {
          // Cas B : Le contenu est un objet clé-valeur
          const keys = Object.keys(slideContent);
          const usedNodes = new Set();

          // Étape 1 : Correspondance exacte par le nom du calque
          for (const key of keys) {
            const val = slideContent[key];

            if (isImageUrlValue(val)) {
              // C'est une image. On cherche une forme correspondante (par nom exact, ou contenant "photo", "image", etc.)
              const targetNode = shapeNodes.find(node =>
                !usedNodes.has(node) &&
                (normalize(node.name) === normalize(key) ||
                 normalize(node.name).includes("photo") ||
                 normalize(node.name).includes("image") ||
                 normalize(node.name).includes("illustration"))
              );
              if (targetNode) {
                fetchTasks.push({ id: targetNode.id, url: val.trim(), name: key, type: 'image' });
                usedNodes.add(targetNode);
              }
            } else if (isIconValue(val)) {
              // C'est une icône. On cherche une forme correspondante (par bloc ou nom exact).
              const targetNode = getTargetPictoNode(instance, key, shapeNodes, usedNodes);
              if (targetNode) {
                const iconName = val.startsWith('iconify:') ? val.substring(8).trim() : val.trim();
                const parts = iconName.split(':');
                if (parts.length === 2) {
                  const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
                  fetchTasks.push({ id: targetNode.id, url: iconUrl, name: iconName, type: 'icon' });
                  usedNodes.add(targetNode);
                }
              }
            } else {
              // C'est du texte brut
              const targetNode = textNodes.find(node =>
                !usedNodes.has(node) &&
                normalize(node.name) === normalize(key)
              );

              if (targetNode) {
                await loadFontForNode(targetNode);
                targetNode.characters = String(val);
                targetNode.visible = true;
                usedNodes.add(targetNode);
              }
            }
          }

          // Étape 2 : Pour les clés restantes non associées, on remplit par ordre de position
          const remainingTextKeys = [];
          const remainingIconKeys = [];

          for (const key of keys) {
            const val = slideContent[key];
            const isConsumed = shapeNodes.some(node => usedNodes.has(node) && (normalize(node.name) === normalize(key) || (isImageUrlValue(val) && (normalize(node.name).includes("photo") || normalize(node.name).includes("image") || normalize(node.name).includes("illustration"))))) ||
              textNodes.some(node => usedNodes.has(node) && normalize(node.name) === normalize(key));

            if (!isConsumed) {
              if (isImageUrlValue(val)) {
                // C'est une image non consommée. On cherche une forme libre.
                const targetNode = shapeNodes.find(node =>
                  !usedNodes.has(node) &&
                  (normalize(node.name).includes("photo") ||
                   normalize(node.name).includes("image") ||
                   normalize(node.name).includes("illustration"))
                ) || shapeNodes.find(node => !usedNodes.has(node) && !isIconPlaceholderNode(node));
                if (targetNode) {
                  fetchTasks.push({ id: targetNode.id, url: val.trim(), name: key, type: 'image' });
                  usedNodes.add(targetNode);
                }
              } else if (isIconValue(val)) {
                remainingIconKeys.push(val);
              } else {
                remainingTextKeys.push({ key, val });
              }
            }
          }

          // A. Remplissage des textes par position
          const remainingTextNodes = sortedTextNodes.filter(node => !usedNodes.has(node));
          for (let j = 0; j < Math.min(remainingTextKeys.length, remainingTextNodes.length); j++) {
            const { val } = remainingTextKeys[j];
            const node = remainingTextNodes[j];
            await loadFontForNode(node);
            node.characters = String(val);
            node.visible = true;
            usedNodes.add(node);
          }

          // B. Remplissage des icônes par position
          const potentialIconNodes = sortedShapeNodes.filter(node => {
            if (usedNodes.has(node)) return false;
            return isIconPlaceholderNode(node) ||
              normalize(node.name).includes("picto") ||
              normalize(node.name).includes("icon") ||
              normalize(node.name).includes("svg") ||
              normalize(node.name).includes("logo");
          });
          for (let j = 0; j < Math.min(remainingIconKeys.length, potentialIconNodes.length); j++) {
            const val = remainingIconKeys[j];
            const node = potentialIconNodes[j];
            const iconName = val.startsWith('iconify:') ? val.substring(8).trim() : val.trim();
            const parts = iconName.split(':');
            if (parts.length === 2) {
              const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
              fetchTasks.push({ id: node.id, url: iconUrl, name: iconName, type: 'icon' });
              usedNodes.add(node);
            }
          }
        }

        // 3.5. Application des éléments sur-mesure (custom_elements)
        if (slideData.custom_elements && Array.isArray(slideData.custom_elements)) {
          for (const element of slideData.custom_elements) {
            try {
              if (element.action === 'create_node') {
                let parentNode = instance;
                if (element.parent_selector) {
                  parentNode = instance.findAll(n => normalize(n.name) === normalize(element.parent_selector))[0] || instance;
                }

                let newNode;
                const nodeType = (element.node_type || 'FRAME').toUpperCase();
                if (nodeType === 'FRAME') {
                  newNode = figma.createFrame();
                } else if (nodeType === 'TEXT') {
                  newNode = figma.createText();
                } else if (nodeType === 'RECTANGLE') {
                  newNode = figma.createRectangle();
                } else {
                  continue;
                }

                if (element.name) {
                  newNode.name = element.name;
                }

                parentNode.appendChild(newNode);

                // Renseigne les propriétés (position, dimensions, couleurs, texte)
                if (element.properties) {
                  let w = newNode.width;
                  let h = newNode.height;
                  let hasWidth = false;
                  let hasHeight = false;

                  // Charge la police en premier si elle est définie dans les propriétés pour éviter les erreurs Figma
                  let fontToLoad = { family: "Inter", style: "Regular" };
                  if (nodeType === 'TEXT') {
                    if (element.properties.fontName) {
                      const f = element.properties.fontName;
                      if (f.family && f.style) {
                        fontToLoad = { family: f.family, style: f.style };
                      }
                    }
                    await figma.loadFontAsync(fontToLoad);
                    newNode.fontName = fontToLoad;
                  }

                  for (const [prop, val] of Object.entries(element.properties)) {
                    if (prop === 'width') {
                      w = Number(val);
                      hasWidth = true;
                    } else if (prop === 'height') {
                      h = Number(val);
                      hasHeight = true;
                    } else if (prop === 'fills') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        newNode.fills = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        newNode.fills = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'strokes') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        newNode.strokes = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        newNode.strokes = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'characters' && nodeType === 'TEXT') {
                      newNode.characters = String(val);
                    } else if (prop === 'image') {
                      fetchTasks.push({ id: newNode.id, url: val.trim(), name: 'image', type: 'image' });
                    } else if (prop === 'fontName') {
                      // Déjà appliqué en amont
                    } else if (prop in newNode) {
                      newNode[prop] = val;
                    }
                  }
                  if (hasWidth || hasHeight) {
                    newNode.resize(w, h);
                  }
                }

                // Chargement optionnel d'icône pour ce nouveau nœud
                if (element.icon) {
                  const iconName = element.icon.startsWith('iconify:') ? element.icon.substring(8).trim() : element.icon.trim();
                  const parts = iconName.split(':');
                  if (parts.length === 2) {
                    const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
                    fetchTasks.push({ id: newNode.id, url: iconUrl, name: iconName, type: 'icon' });
                  }
                }

                // Chargement optionnel d'image pour ce nouveau nœud
                if (element.image) {
                  fetchTasks.push({ id: newNode.id, url: element.image.trim(), name: 'image', type: 'image' });
                }
              } else if (element.action === 'delete_node' || element.action === 'delete_layer') {
                if (element.selector) {
                  const target = instance.findAll(n => normalize(n.name) === normalize(element.selector))[0];
                  if (target) target.remove();
                }
              } else if (element.action === 'set_property') {
                if (element.selector) {
                  const target = instance.findAll(n => normalize(n.name) === normalize(element.selector))[0];
                  if (target) {
                    const prop = element.property;
                    const val = element.value;
                    if (prop === 'width') {
                      target.resize(Number(val), target.height);
                    } else if (prop === 'height') {
                      target.resize(target.width, Number(val));
                    } else if (prop === 'fills') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        target.fills = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        target.fills = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'strokes') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        target.strokes = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        target.strokes = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'fontName' && target.type === 'TEXT') {
                      if (val && val.family && val.style) {
                        await figma.loadFontAsync(val);
                        target.fontName = val;
                      }
                    } else if (prop === 'characters' && target.type === 'TEXT') {
                      await figma.loadFontAsync(target.fontName);
                      target.characters = String(val);
                    } else if (prop === 'image') {
                      fetchTasks.push({ id: target.id, url: val.trim(), name: 'image', type: 'image' });
                    } else if (prop in target) {
                      target[prop] = val;
                    }
                  }
                }
              }
            } catch (err) {
              console.error("Erreur lors de la création d'un élément sur-mesure :", err);
            }
          }
        }
      }
      // Ajout du rectangle séparateur rose sous les slides de cette leçon (bord à bord) uniquement si le cadre de leçon existe
      if (lessonFrame) {
        const separator = figma.createRectangle();
        separator.name = "Séparateur";
        separator.resize(lessonWidth, 200); // Toute la largeur de la leçon
        separator.x = 0; // Aligné sur le bord gauche
        separator.y = 1830; // 500px (top) + 1080px (slides) + 250px (gap)
        separator.fills = [{ type: 'SOLID', color: hexToFigmaColor("#FFB2B2") }];
        lessonFrame.appendChild(separator);
      }

      // Décalage pour la leçon suivante (retour à la ligne si nouveau chapitre ou newRow)
      const nextLesson = lessons[lessonIndex + 1];
      if (nextLesson && (nextLesson.newRow || (nextLesson.chapter && nextLesson.chapter !== lesson.chapter))) {
        currentX = startX;
        currentY += 11500; // Nouvelle ligne sous le chapitre précédent
      } else {
        currentX += lessonWidth + 500;
      }
    }

    // 4. Récupération et application asynchrone des assets (icônes uniquement)
    if (fetchTasks.length > 0) {
      figma.ui.postMessage({ type: 'fetch-assets', tasks: fetchTasks });

      const results = await new Promise((resolve) => {
        assetsResolve = resolve;
      });

      let assetErrors = 0;

      for (const result of results) {
        if (result.error) {
          console.error(`Échec du chargement de l'icône : ${result.message}`);
          assetErrors++;
          continue;
        }

        const node = figma.getNodeById(result.id);
        if (!node) continue;

        if (result.type === 'icon') {
          try {
            const svgNode = figma.createNodeFromSvg(result.data);

            // Conserve la géométrie du placeholder
            svgNode.x = node.x;
            svgNode.y = node.y;
            svgNode.name = result.name; // Conserve le nom de l'icône (ex: "mdi:gamepad-circle-left") pour Iconify
            svgNode.resize(node.width, node.height);

            // Configure les contraintes des enfants du SVG pour SCALE afin de supporter la déformation et le redimensionnement fluide
            for (const child of svgNode.children) {
              if ('constraints' in child) {
                child.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
              }
            }

            // Récupère et applique la couleur d'origine du picto d'illustration
            const paint = extractPaintFromNode(node);
            if (paint) {
              applyPaintToNode(svgNode, paint);
            }

            // Ajoute les métadonnées partagées pour la détection par le plugin Iconify
            const parts = result.name.split(':');
            if (parts.length === 2) {
              let hexColor = "#000000";
              if (paint && paint.value && paint.value[0] && paint.value[0].type === 'SOLID') {
                const c = paint.value[0].color;
                const r = Math.round(c.r * 255).toString(16).padStart(2, '0');
                const g = Math.round(c.g * 255).toString(16).padStart(2, '0');
                const b = Math.round(c.b * 255).toString(16).padStart(2, '0');
                hexColor = `#${r}${g}${b}`;
              }
              const props = {
                version: 3,
                name: result.name,
                props: {
                  color: hexColor
                },
                route: {
                  type: "icon-set",
                  prefix: parts[0],
                  state: {
                    keyword: "",
                    index: 0
                  },
                  parent: {
                    type: "icon-sets",
                    state: {}
                  }
                }
              };
              const propsStr = JSON.stringify(props);

              // Applique sur le conteneur racine SVG
              svgNode.setSharedPluginData('iconify', 'props', propsStr);

              // Applique aussi sur tous les enfants du SVG (pour la détection au niveau Vector)
              if ('findAll' in svgNode) {
                const childNodes = svgNode.findAll(n => 'setSharedPluginData' in n);
                for (const child of childNodes) {
                  child.setSharedPluginData('iconify', 'props', propsStr);
                }
              }
            }

            // Insertion dans le parent
            const parent = node.parent;
            if (parent) {
              const index = parent.children.indexOf(node);
              parent.insertChild(index, svgNode);
            }

            // Supprime le placeholder d'origine
            node.remove();
          } catch (e) {
            console.error("Erreur d'importation SVG de l'icône :", e);
            assetErrors++;
          }
        } else if (result.type === 'image') {
          try {
            const image = figma.createImage(new Uint8Array(result.data));
            node.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];
          } catch (e) {
            console.error("Erreur de chargement de l'image dans Figma :", e);
            assetErrors++;
          }
        }
      }

      if (assetErrors > 0) {
        figma.ui.postMessage({
          type: 'warning',
          message: `Présentation créée, mais ${assetErrors} icône(s) n'ont pas pu être chargées.`
        });
      }
    }

    // Renommer les calques des slides custom (à partir de templates vides ou contenant des éléments custom)
    for (let i = 0; i < createdInstances.length; i++) {
      const slideData = flatSlidesData[i];
      if (!slideData) continue;
      const instance = createdInstances[i];
      const templateNameNorm = normalize(slideData.template);
      if ((slideData.custom_elements && slideData.custom_elements.length > 0) || templateNameNorm.includes("blank") || templateNameNorm.includes("vide")) {
        try {
          performRenameTemplate(instance);
        } catch (e) {
          console.error("Erreur lors du renommage automatique de la slide custom :", e);
        }
      }
    }

    // Sélectionne et centre la vue du viewer sur les éléments générés
    const selectTargets = lessonFrames.length > 0 ? lessonFrames : createdInstances;
    if (selectTargets.length > 0) {
      figma.currentPage.selection = selectTargets;
    }

    figma.ui.postMessage({
      type: 'success',
      message: `Félicitations ! ${flatSlidesData.length} slides ont été créées avec succès.`
    });
    } catch (globalError) {
      console.error("Erreur de génération :", globalError);
      figma.ui.postMessage({
        type: 'error',
        message: `Une erreur est survenue lors de la génération : ${globalError.message || globalError}`
      });
    }
  } else if (msg.type === 'toggle-replace-mode') {
    if (replaceModeTargetId !== null) {
      replaceModeTargetId = null;
      figma.ui.postMessage({ type: 'replace-mode-state', active: false });
      figma.notify("Remplacement d'image désactivé.");
    } else {
      const selection = figma.currentPage.selection;
      if (selection.length !== 1) {
        figma.ui.postMessage({ type: 'replace-mode-state', active: false });
        figma.notify("⚠️ Sélectionnez d'abord l'image cible à remplacer.");
        return;
      }
      const target = findImageNode(selection[0]);
      if (!target) {
        figma.ui.postMessage({ type: 'replace-mode-state', active: false });
        figma.notify("⚠️ Aucun calque d'image trouvé dans la sélection.");
        return;
      }
      replaceModeTargetId = target.id;
      figma.ui.postMessage({ type: 'replace-mode-state', active: true });
      figma.notify("🎯 Mode remplacement actif. Cliquez sur l'image source...");
    }
  } else if (msg.type === 'rename-template') {
    // Vérifie qu'il y a bien une sélection active dans Figma
    const selection = figma.currentPage.selection[0];
    if (!selection || (selection.type !== 'FRAME' && selection.type !== 'COMPONENT')) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Sélectionnez un Cadre (Frame) ou un Composant à renommer dans votre plan de travail.'
      });
      return;
    }

    const renamedCount = performRenameTemplate(selection);

    figma.ui.postMessage({
      type: 'success',
      message: `Fait ! ${renamedCount} calques de texte ont été renommés et réorganisés dans "${selection.name}".`
    });
  } else if (msg.type === 'replace-pictos') {
    // 1. Vérifie la sélection active
    const selection = figma.currentPage.selection[0];
    if (!selection || (selection.type !== 'FRAME' && selection.type !== 'COMPONENT' && selection.type !== 'INSTANCE')) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Sélectionnez une slide (Cadre/Composant) pour remplacer ses pictos.'
      });
      return;
    }

    const data = msg.data;
    let fetchTasks = [];
    const usedNodes = new Set();

    const allShapes = findPlaceholderNodes(selection).filter(isNodeVisible);
    const shapeNodes = filterShapeNodes(allShapes, selection);
    const sortedShapeNodes = sortNodesByPosition(shapeNodes);

    const textNodes = findTextNodes(selection).filter(isNodeVisible);
    const sortedTextNodes = sortNodesByPosition(textNodes);

    // Essai 1 : Si du JSON valide est fourni et correspond à cette slide par son index
    let jsonSlideContent = null;
    if (data && data.slides && Array.isArray(data.slides)) {
      const match = selection.name.match(/^(\d+)\./);
      if (match) {
        const slideIndex = parseInt(match[1], 10) - 1;
        if (slideIndex >= 0 && slideIndex < data.slides.length) {
          jsonSlideContent = data.slides[slideIndex].content || data.slides[slideIndex].data;
          
          // Normalisation si le contenu est sous forme de tableau de paires clé-valeur [{"key": "...", "value": "..."}]
          if (Array.isArray(jsonSlideContent) && jsonSlideContent.length > 0 && typeof jsonSlideContent[0] === 'object' && jsonSlideContent[0] !== null && 'key' in jsonSlideContent[0]) {
            const normalized = {};
            for (const item of jsonSlideContent) {
              if (item && typeof item === 'object' && 'key' in item) {
                normalized[item.key] = item.value;
              }
            }
            jsonSlideContent = normalized;
          }
        }
      }
    }

    if (jsonSlideContent && typeof jsonSlideContent === 'object') {
      const keys = Object.keys(jsonSlideContent);

      // A. Correspondance par bloc ou nom exact de calque (ex: "Picto 1")
      for (const key of keys) {
        const val = jsonSlideContent[key];
        if (isIconValue(val)) {
          const targetNode = getTargetPictoNode(selection, key, shapeNodes, usedNodes);
          if (targetNode) {
            const iconName = val.startsWith('iconify:') ? val.substring(8).trim() : val.trim();
            const parts = iconName.split(':');
            if (parts.length === 2) {
              const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
              fetchTasks.push({ id: targetNode.id, url: iconUrl, name: iconName, type: 'icon' });
              usedNodes.add(targetNode);
            }
          }
        }
      }

      // B. Correspondance par position pour les icônes restantes dans le JSON
      const remainingIconKeys = [];
      for (const key of keys) {
        const val = jsonSlideContent[key];
        const isConsumed = shapeNodes.some(node => usedNodes.has(node) && normalize(node.name) === normalize(key));
        if (!isConsumed && isIconValue(val)) {
          remainingIconKeys.push(val);
        }
      }

      const potentialIconNodes = sortedShapeNodes.filter(node => {
        if (usedNodes.has(node)) return false;
        return isIconPlaceholderNode(node) ||
          normalize(node.name).includes("picto") ||
          normalize(node.name).includes("icon") ||
          normalize(node.name).includes("svg") ||
          normalize(node.name).includes("logo");
      });

      for (let j = 0; j < Math.min(remainingIconKeys.length, potentialIconNodes.length); j++) {
        const val = remainingIconKeys[j];
        const node = potentialIconNodes[j];
        const iconName = val.startsWith('iconify:') ? val.substring(8).trim() : val.trim();
        const parts = iconName.split(':');
        if (parts.length === 2) {
          const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
          fetchTasks.push({ id: node.id, url: iconUrl, name: iconName, type: 'icon' });
          usedNodes.add(node);
        }
      }
    }

    // Essai 2 : Remplacement direct des calques textuels contenant un code d'icône (ex: "lucide:cpu")
    for (const node of sortedTextNodes) {
      if (usedNodes.has(node)) continue;
      const textVal = node.characters.trim();
      if (isIconValue(textVal)) {
        const iconName = textVal.startsWith('iconify:') ? textVal.substring(8).trim() : textVal.trim();
        const parts = iconName.split(':');
        if (parts.length === 2) {
          const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
          fetchTasks.push({ id: node.id, url: iconUrl, name: iconName, type: 'icon' });
          usedNodes.add(node);
        }
      }
    }

    if (fetchTasks.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Aucun picto à remplacer trouvé dans cette slide (vérifiez le JSON ou vos calques textuels).'
      });
      return;
    }

    figma.ui.postMessage({ type: 'fetch-assets', tasks: fetchTasks });

    const results = await new Promise((resolve) => {
      assetsResolve = resolve;
    });

    let assetErrors = 0;
    for (const result of results) {
      if (result.error) {
        console.error(`Échec du chargement de l'icône : ${result.message}`);
        assetErrors++;
        continue;
      }

      const node = figma.getNodeById(result.id);
      if (!node) continue;

      try {
        const svgNode = figma.createNodeFromSvg(result.data);
        svgNode.x = node.x;
        svgNode.y = node.y;
        svgNode.name = result.name; // Conserve le nom de l'icône (ex: "mdi:gamepad-circle-left")
        svgNode.resize(node.width, node.height);

        // Configure les contraintes des enfants du SVG pour SCALE afin de supporter la déformation et le redimensionnement fluide
        for (const child of svgNode.children) {
          if ('constraints' in child) {
            child.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
          }
        }

        // Récupère et applique la couleur d'origine du picto d'illustration
        const paint = extractPaintFromNode(node);
        if (paint) {
          applyPaintToNode(svgNode, paint);
        }

        // Ajoute les métadonnées partagées pour la détection par le plugin Iconify
        const parts = result.name.split(':');
        if (parts.length === 2) {
          let hexColor = "#000000";
          if (paint && paint.value && paint.value[0] && paint.value[0].type === 'SOLID') {
            const c = paint.value[0].color;
            const r = Math.round(c.r * 255).toString(16).padStart(2, '0');
            const g = Math.round(c.g * 255).toString(16).padStart(2, '0');
            const b = Math.round(c.b * 255).toString(16).padStart(2, '0');
            hexColor = `#${r}${g}${b}`;
          }
          const props = {
            version: 3,
            name: result.name,
            props: {
              color: hexColor
            },
            route: {
              type: "icon-set",
              prefix: parts[0],
              state: {
                keyword: "",
                index: 0
              },
              parent: {
                type: "icon-sets",
                state: {}
              }
            }
          };
          const propsStr = JSON.stringify(props);

          // Applique sur le conteneur racine SVG
          svgNode.setSharedPluginData('iconify', 'props', propsStr);

          // Applique aussi sur tous les enfants du SVG (pour la détection au niveau Vector)
          if ('findAll' in svgNode) {
            const childNodes = svgNode.findAll(n => 'setSharedPluginData' in n);
            for (const child of childNodes) {
              child.setSharedPluginData('iconify', 'props', propsStr);
            }
          }
        }

        const parent = node.parent;
        if (parent) {
          const index = parent.children.indexOf(node);
          parent.insertChild(index, svgNode);
        }
        node.remove();
      } catch (e) {
        console.error("Erreur de remplacement SVG :", e);
        assetErrors++;
      }
    }

    if (assetErrors > 0) {
      figma.ui.postMessage({
        type: 'warning',
        message: `${fetchTasks.length - assetErrors} icône(s) remplacée(s). ${assetErrors} échec(s).`
      });
    } else {
      figma.ui.postMessage({
        type: 'success',
        message: `Fait ! Remplacement manuel de ${fetchTasks.length} picto(s) réussi.`
      });
    }
  } else if (msg.type === 'split-slides') {
    const selection = figma.currentPage.selection;
    if (!selection || selection.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'Sélectionnez au moins une slide ou une Frame de leçon.' });
      return;
    }
    // Résout la sélection pour obtenir les slides cibles (gère la sélection de la Frame leçon parente)
    let targetSlides = [];
    for (const node of selection) {
      if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        const isLessonFrame = /^[Mm]\d+/.test(node.name);
        const childSlides = 'children' in node 
          ? node.children.filter(child => {
              const isSlide = (child.type === 'FRAME' || child.type === 'COMPONENT' || child.type === 'INSTANCE') && child.width === 1920 && child.height === 1080;
              if (isLessonFrame) {
                return isSlide && child.y < 1830;
              }
              return isSlide;
            })
          : [];
        if (childSlides.length > 0) {
          targetSlides.push(...childSlides);
        } else {
          targetSlides.push(node);
        }
      }
    }

    if (targetSlides.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'Sélectionnez des slides ou une Frame de leçon valide.' });
      return;
    }

    // Trie les slides d'origine horizontalement (de gauche à droite)
    targetSlides.sort((a, b) => a.x - b.x);

    const createdSlides = [];

    for (const slide of targetSlides) {
      // Si la slide est une instance, on la détache pour pouvoir modifier sa structure (supprimer des calques)
      let workingSlide = slide;
      if (slide.type === 'INSTANCE') {
        try {
          workingSlide = slide.detachInstance();
        } catch (e) {
          console.error("Impossible de détacher l'instance de la slide:", e);
        }
      }

      // Analyse des rangs pour grouper les calques par étape logique (supporte l'arborescence)
      const getChildRanksMap = (slide) => {
        const ranks = new Map();

        const assignRanks = (node, parentBaseRank, isRoot, forceInherit = false) => {
          if (!node.visible) return;

          const normName = normalize(node.name);
          let localNumber = 0;
          let isItem = false;
          let isTexteA = false;
          let isTexteB = false;
          
          // Exclure les calques Figma par défaut avec des numéros (ex: "Group 2", "Vector 194")
          const isFigmaDefault = /^(group|groupe|vector|vecteur|rectangle|ellipse|line|ligne|polygon|polygone|star|etoile|frame|cadre|component|composant|instance|image|mask|masque)\d*$/.test(normName);
          
          if (!isFigmaDefault) {
            const match = normName.match(/(\d+)/);
            if (match) {
              localNumber = parseInt(match[1], 10);
              if (normName.startsWith("item")) {
                isItem = true;
              } else if (/^textea/.test(normName) || /^texte\d+a/.test(normName)) {
                isTexteA = true;
              } else if (/^texteb/.test(normName) || /^texte\d+b/.test(normName)) {
                isTexteB = true;
              }
            }
          }

          let isBase = false;
          let isIntro = false;
          let isBulle = false;

          if (normName.includes("intro") || normName.includes("introduction")) {
            isIntro = true;
          } else if (normName.includes("bulle") || normName.includes("source") || normName.includes("footer")) {
            isBulle = true;
          } else if (/^(fond|background|bg|grille|grid|decor|pattern|bg-)/.test(normName) ||
                     normName.includes("fond") || normName.includes("background") || normName.includes("grille") || normName.includes("grid") ||
                     normName === "header" || normName === "navigation" || normName === "logo") {
            isBase = true;
          } else if (node.parent && Math.abs(node.width - node.parent.width) < 10 && Math.abs(node.height - node.parent.height) < 10) {
            isBase = true;
          } else if (isRoot && normName === "titre") {
            isBase = true;
          } else if (localNumber > 0 && !normName.startsWith("_")) {
            isBase = false; // Numéroté = étape, sauf si commence par "_"
          } else {
            isBase = true; // Sans numéro = base de son conteneur
          }

          if (!isRoot && node.type !== "GROUP" && node.type !== "FRAME" && node.type !== "COMPONENT" && node.type !== "INSTANCE") {
            if (!isIntro && !isBulle) {
              isBase = true;
            }
          }

          let nodeRank = parentBaseRank;
          const isComparaison = workingSlide.name.toLowerCase().includes("comparaison");

          if (isComparaison && (normName === "bloca" || normName === "blocb")) {
            nodeRank = 0; // On gérera leur visibilité manuellement lors de la suppression
          } else if (forceInherit) {
            if (normName.startsWith("checklist") && localNumber > 0) {
              nodeRank = parentBaseRank + localNumber; // Ex: 200 + 1 = 201
            } else {
              nodeRank = parentBaseRank; // Le bloc apparaît d'un coup
            }
          } else if (isBulle) {
            nodeRank = 999999;
          } else if (isBase) {
            nodeRank = parentBaseRank;
          } else if (isIntro) {
            nodeRank = parentBaseRank + 1;
          } else if (isComparaison && (isItem || isTexteA || isTexteB)) {
            if (isItem) nodeRank = localNumber * 10 + 1; // Item en même temps que Texte A
            else if (isTexteA) nodeRank = localNumber * 10 + 1;
            else if (isTexteB) nodeRank = localNumber * 10 + 2;
          } else if (localNumber > 0) {
            if (isRoot) {
              nodeRank = localNumber * 100;
            } else {
              nodeRank = parentBaseRank + localNumber * 10;
            }
          }

          ranks.set(node.id, nodeRank);

          let nextForceInherit = forceInherit;
          if (normName.includes("bloc") || isBulle || isIntro || (isRoot && localNumber > 0)) {
            nextForceInherit = true;
          }

          if ('children' in node) {
            for (const child of node.children) {
              assignRanks(child, nodeRank, false, nextForceInherit);
            }
          }
        };

        for (const child of slide.children) {
          assignRanks(child, 0, true);
        }

        return ranks;
      };

      const originalRanks = getChildRanksMap(workingSlide);
      
      // On extrait les rangs uniques strictement positifs et on les trie
      const distinctSteps = [...new Set(Array.from(originalRanks.values()).filter(r => r > 0))].sort((a, b) => a - b);
      const k = distinctSteps.length; // Nombre d'étapes d'apparition

      const columnSlides = [];

      // Crée k+1 copies de la slide pour préserver l'originale
      // Si k=0, on crée 1 copie identique pour aligner la présentation générée
      for (let m = 0; m <= k; m++) {
        try {
          const clone = workingSlide.clone();
          workingSlide.parent.appendChild(clone);

          // Positionnement en colonne (en dessous de l'originale)
          clone.x = workingSlide.x;
          const isLessonFrame = workingSlide.parent && workingSlide.parent.type === 'FRAME' && /^[Mm]\d+/.test(workingSlide.parent.name);
          if (isLessonFrame) {
            clone.y = 2280 + m * (workingSlide.height + 200);
          } else {
            clone.y = workingSlide.y + (m + 1) * (workingSlide.height + 200);
          }

          // Renommage
          const baseName = workingSlide.name.replace(/ - Étape \d+$/, '');
          clone.name = k === 0 ? baseName : `${baseName} - Étape ${m + 1}`;

          columnSlides.push(clone);
        } catch (e) {
          console.error("Erreur lors du clonage de la slide:", e);
        }
      }

      // Suppression progressive des blocs sur chaque slide de la colonne
      for (let m = 0; m <= k; m++) {
        const colSlide = columnSlides[m];
        const colRanks = getChildRanksMap(colSlide);
        
        // Le rang maximum autorisé pour cette étape
        const maxAllowedRank = m === 0 ? 0 : distinctSteps[m - 1];

        // On supprime récursivement les enfants dont le rang est strictement supérieur
        const removeHiddenNodes = (node) => {
          if (colRanks.has(node.id)) {
            const rank = colRanks.get(node.id);
            const normName = normalize(node.name);
            const isComparaison = colSlide.name.toLowerCase().includes("comparaison");

            if (isComparaison && (normName === "bloca" || normName === "blocb")) {
              let shouldBeVisible = false;
              if (m === k) {
                shouldBeVisible = true; // Dernière slide, tout est visible
              } else {
                if (normName === "bloca" && maxAllowedRank >= 10 && (maxAllowedRank % 10 === 1 || maxAllowedRank % 10 === 0)) {
                  shouldBeVisible = true;
                } else if (normName === "blocb" && maxAllowedRank >= 10 && maxAllowedRank % 10 === 2) {
                  shouldBeVisible = true;
                }
              }

              if (!shouldBeVisible) {
                try {
                  node.remove();
                  return;
                } catch (e) {}
              }
            } else if (rank > maxAllowedRank) {
              try {
                node.remove();
                return; // Si on supprime le parent, ses enfants disparaissent avec
              } catch (err) {
                console.error(`Erreur de suppression du calque ${node.name}:`, err);
              }
            }
          }
          if ('children' in node) {
            for (const child of [...node.children]) {
              removeHiddenNodes(child);
            }
          }
        };

        for (const child of [...colSlide.children]) {
          removeHiddenNodes(child);
        }
      }

      // Ajoute toutes les slides de la colonne au résultat global
      createdSlides.push(...columnSlides);
    }

    // Sélectionne toutes les slides (originales + clones)
    figma.currentPage.selection = createdSlides;

    figma.ui.postMessage({
      type: 'success',
      message: `Découpage terminé. ${createdSlides.length} slides créées avec masquage progressif par suppression.`
    });

  } else if (msg.type === 'prototype-slides') {
    const selection = figma.currentPage.selection;
    if (!selection || selection.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'Sélectionnez les slides ou la Frame de leçon à relier.' });
      return;
    }
    // Résout la sélection pour obtenir les slides cibles (gère la sélection de la Frame leçon parente)
    let rawSlides = [];
    for (const node of selection) {
      if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        const isLessonFrame = /^[Mm]\d+/.test(node.name);
        const childSlides = 'children' in node 
          ? node.children.filter(child => {
              const isSlide = (child.type === 'FRAME' || child.type === 'COMPONENT' || child.type === 'INSTANCE') && child.width === 1920 && child.height === 1080;
              if (isLessonFrame) {
                return isSlide && child.y > 1830;
              }
              return isSlide;
            })
          : [];
        if (childSlides.length > 0) {
          rawSlides.push(...childSlides);
        } else {
          rawSlides.push(node);
        }
      }
    }

    if (rawSlides.length < 2) {
      figma.ui.postMessage({ type: 'error', message: 'Sélectionnez au moins 2 slides (ou une Frame de leçon contenant plusieurs slides) pour créer le prototype.' });
      return;
    }

    // Détache toutes les instances sélectionnées en amont pour pouvoir éditer leurs réactions
    const slides = [];
    for (const node of rawSlides) {
      if (node.type === 'INSTANCE') {
        try {
          const detached = node.detachInstance();
          slides.push(detached);
        } catch (e) {
          console.error("Impossible de détacher l'instance pour le prototype:", e);
          slides.push(node);
        }
      } else {
        slides.push(node);
      }
    }

    // Trie les slides par colonne (X croissant), puis de haut en bas au sein de chaque colonne (Y croissant)
    slides.sort((a, b) => {
      const diffX = a.x - b.x;
      if (Math.abs(diffX) < 300) {
        return a.y - b.y;
      }
      return diffX;
    });

    let linkCount = 0;

    // Nettoyage préalable : On supprime toutes les interactions fantômes sur les éléments internes des slides
    for (const slide of slides) {
      const clearChildReactions = (node) => {
        if ('children' in node) {
          for (const child of node.children) {
            if ('reactions' in child) {
              try { child.reactions = []; } catch (e) {}
            }
            clearChildReactions(child);
          }
        }
      };
      clearChildReactions(slide);
    }

    // Relie linéairement chaque slide à la suivante
    let errorMessage = "";
    for (let i = 0; i < slides.length - 1; i++) {
      const currentSlide = slides[i];
      const nextSlide = slides[i + 1];

      const candidates = [
        // Candidate 1: Modern actions syntax with transition: null
        {
          trigger: { type: "ON_CLICK" },
          actions: [
            {
              type: "NODE",
              destinationId: nextSlide.id,
              navigation: "NAVIGATE",
              transition: null
            }
          ]
        },
        // Candidate 2: Modern actions syntax with a valid simple transition
        {
          trigger: { type: "ON_CLICK" },
          actions: [
            {
              type: "NODE",
              destinationId: nextSlide.id,
              navigation: "NAVIGATE",
              transition: {
                type: "DISSOLVE",
                easing: { type: "EASE_IN_AND_OUT" },
                duration: 0.3
              }
            }
          ]
        },
        // Candidate 3: Modern actions syntax without transition key (fallback)
        {
          trigger: { type: "ON_CLICK" },
          actions: [
            {
              type: "NODE",
              destinationId: nextSlide.id,
              navigation: "NAVIGATE"
            }
          ]
        }
      ];

      let success = false;
      let errors = [];
      
      // Ensure the slide is unlocked before modifying reactions
      try {
        if (currentSlide.locked) {
          currentSlide.locked = false;
        }
      } catch (e) {}

      for (let idx = 0; idx < candidates.length; idx++) {
        try {
          currentSlide.reactions = [candidates[idx]];
          success = true;
          break;
        } catch (err) {
          errors.push(`Candidate ${idx + 1}: ${err.message || String(err)}`);
        }
      }

      if (success) {
        linkCount++;
      } else {
        console.error(`Impossible de prototyper la slide ${currentSlide.name}. Détail des erreurs:`, errors);
        errorMessage = errors.join(" / ");
      }
    }

    // Ajoute un point de départ pour le flux (Flow Starting Point)
    try {
      if (slides.length > 0) {
        const currentFlows = figma.currentPage.flowStartingPoints;
        // Si la slide est au premier niveau de la page (top-level frame)
        if (slides[0].parent === figma.currentPage) {
          if (!currentFlows.some(flow => flow.nodeId === slides[0].id)) {
            figma.currentPage.flowStartingPoints = [
              ...currentFlows,
              {
                nodeId: slides[0].id,
                name: "Présentation Auto"
              }
            ];
          }
        } else {
          // Sinon, on cherche le conteneur parent de premier niveau (la Frame leçon)
          let topParent = slides[0];
          while (topParent.parent && topParent.parent.type !== 'PAGE') {
            topParent = topParent.parent;
          }
          if (topParent && topParent.type === 'FRAME' && !currentFlows.some(flow => flow.nodeId === topParent.id)) {
            figma.currentPage.flowStartingPoints = [
              ...currentFlows,
              {
                nodeId: topParent.id,
                name: topParent.name
              }
            ];
          }
        }
      }
    } catch (e) {
      console.warn("Impossible de créer le point de départ du flux:", e);
    }

    // Met à jour la sélection avec les slides (éventuellement détachées) pour le confort visuel
    figma.currentPage.selection = slides;

    if (linkCount > 0) {
      figma.ui.postMessage({
        type: 'success',
        message: `Prototype créé avec succès. ${linkCount} liaisons linéaires configurées.`
      });
    } else {
      figma.ui.postMessage({
        type: 'error',
        message: `Erreur lors de la création du prototype. Aucune liaison n'a été créée. Détail de l'erreur API Figma: ${errorMessage}`
      });
    }
  } else if (msg.type === 'clear-slides') {
    const selection = figma.currentPage.selection;
    if (!selection || selection.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'Sélectionnez au moins une slide ou une Frame de leçon.' });
      return;
    }

    // Resolve context parent
    let parent = null;
    for (const node of selection) {
      let current = node;
      while (current) {
        if (current.type === 'FRAME' && /^[Mm]\d+/.test(current.name)) {
          parent = current;
          break;
        }
        if (current.type === 'PAGE' || current.type === 'DOCUMENT') {
          break;
        }
        current = current.parent;
      }
      if (parent) break;
    }

    if (!parent && selection[0].parent) {
      parent = selection[0].parent;
    }

    if (!parent) {
      figma.ui.postMessage({ type: 'error', message: 'Aucun conteneur parent trouvé pour la sélection.' });
      return;
    }

    // Collect all candidate children from this parent container (only Frame/Component/Instance)
    const candidates = [];
    if ('children' in parent) {
      for (const child of parent.children) {
        if (child.type === 'FRAME' || child.type === 'COMPONENT' || child.type === 'INSTANCE') {
          candidates.push(child);
        }
      }
    }

    // Build sets of nodes that have prototype links:
    // 1. outgoing target IDs (nodes that have reactions pointing to another node)
    // 2. incoming target IDs (nodes that are destination of a reaction from another node)
    const incomingTargets = new Set();
    const hasOutgoing = new Set();

    function analyzeReactions(node, rootCandidate) {
      if ('reactions' in node && node.reactions && node.reactions.length > 0) {
        for (const rx of node.reactions) {
          let destId = null;
          if (rx.action && rx.action.type === 'NODE' && rx.action.destinationId) {
            destId = rx.action.destinationId;
          } else if (rx.actions && Array.isArray(rx.actions)) {
            for (const act of rx.actions) {
              if (act && act.type === 'NODE' && act.destinationId) {
                destId = act.destinationId;
                break;
              }
            }
          }
          if (destId) {
            incomingTargets.add(destId);
            hasOutgoing.add(rootCandidate.id);
          }
        }
      }
      if ('children' in node) {
        for (const child of node.children) {
          analyzeReactions(child, rootCandidate);
        }
      }
    }

    for (const cand of candidates) {
analyzeReactions(cand, cand);
    }

    // Find candidates to delete: those that have outgoing or incoming prototype connections
    const nodesToDelete = [];
    for (const cand of candidates) {
      const isPrototyped = hasOutgoing.has(cand.id) || incomingTargets.has(cand.id);
      if (isPrototyped) {
        nodesToDelete.push(cand);
      }
    }

    let deletedCount = 0;
    for (const node of nodesToDelete) {
      try {
        node.remove();
        deletedCount++;
      } catch (e) {
        console.error("Erreur de suppression de la slide prototypée :", e);
      }
    }

    if (deletedCount > 0) {
      figma.ui.postMessage({
        type: 'success',
        message: `Nettoyage réussi : ${deletedCount} slide(s) prototypée(s) supprimée(s). Les slides non prototypées ont été conservées.`
      });
    } else {
      figma.ui.postMessage({
        type: 'error',
        message: 'Aucune slide prototypée (reliée par des liens entrants ou sortants) trouvée dans le conteneur.'
      });
    }
  } else if (msg.type === 'transform-slides') {
    try {
      let data = msg.data;
      if (data) {
        if (Array.isArray(data)) {
          data = { slides: data };
        } else if (data.template || data.content) {
          data = { slides: [data] };
        }
      }
      const fetchTasks = [];
      if (!data || !data.slides || !Array.isArray(data.slides)) {
        figma.ui.postMessage({ type: 'error', message: 'Format JSON invalide : "slides" doit être une liste.' });
        return;
      }

      const selection = figma.currentPage.selection;
      if (!selection || selection.length === 0) {
        figma.ui.postMessage({ type: 'error', message: 'Sélectionnez la leçon d\'origine (ou ses slides) dans Figma.' });
        return;
      }

      // 1. Récupération des slides sources depuis la sélection
      let sourceSlides = [];
      const selectedFrames = selection.filter(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE');
      if (selectedFrames.length > 1) {
        sourceSlides = selectedFrames.slice();
      } else if (selection.length === 1) {
        const parentNode = selection[0];
        if ('children' in parentNode && parentNode.children.length > 0) {
          sourceSlides = parentNode.children.filter(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE');
        }
      }

      // Tri des slides d'origine par coordonnée X (de gauche à droite)
      sourceSlides.sort((a, b) => a.x - b.x);

      if (sourceSlides.length === 0) {
        figma.ui.postMessage({ type: 'error', message: 'Aucune slide source trouvée dans la sélection.' });
        return;
      }

      // 2. Récupération des templates
      const allComponents = figma.root.findAllWithCriteria({ types: ['COMPONENT'] });
      const currentPageFrames = figma.root.findAllWithCriteria({ types: ['FRAME'] });

      function findTemplate(name) {
        let t = currentPageFrames.find(f => normalize(f.name) === normalize(name) && f.width === 1920 && f.height === 1080);
        if (!t) t = allComponents.find(c => normalize(c.name) === normalize(name) && c.width === 1920 && c.height === 1080);
        if (!t) t = currentPageFrames.find(f => normalize(f.name) === normalize(name));
        if (!t) t = allComponents.find(c => normalize(c.name) === normalize(name));
        return t;
      }

      const coverTemplate = findTemplate("VIBECODING - COVER");
      const videTemplate = findTemplate("VIBECODING - VIDE");

      if (!videTemplate) {
        figma.ui.postMessage({ type: 'error', message: 'Template "VIBECODING - VIDE" introuvable dans le fichier Figma.' });
        return;
      }

      // 3. Création du conteneur de la nouvelle leçon
      const lessonFrame = figma.createFrame();
      lessonFrame.name = data.lessonTitle || "Nouvelle Leçon";
      const slidesCount = data.slides.length;
      const slidesWidth = slidesCount > 0 ? (slidesCount * 2020 - 100) : 1920;
      const lessonWidth = slidesWidth + 1000;
      lessonFrame.resize(lessonWidth, 10670);

      const originalParent = sourceSlides[0].parent;
      lessonFrame.x = originalParent ? originalParent.x : figma.viewport.center.x;
      lessonFrame.y = originalParent ? originalParent.y + (originalParent.height || 10670) + 500 : figma.viewport.center.y;
      lessonFrame.fills = [{ type: 'SOLID', color: hexToFigmaColor("#F2F3F6") }];
      figma.currentPage.appendChild(lessonFrame);

      // Titre de la leçon extrait de la première slide d'origine
      function extractTitleFromSlide(slideNode) {
        const textNodes = findTextNodes(slideNode);
        if (textNodes.length === 0) return "";
        const sortedByFontSize = textNodes.slice().sort((a, b) => {
          const sizeA = typeof a.fontSize === 'number' ? a.fontSize : 0;
          const sizeB = typeof b.fontSize === 'number' ? b.fontSize : 0;
          return sizeB - sizeA;
        });
        return sortedByFontSize[0].characters.trim();
      }

      const extractedLessonTitle = extractTitleFromSlide(sourceSlides[0]) || data.lessonTitle || "Leçon";

      // Helper pour savoir si on exclut un élément d'origine
      function shouldSkipSourceNode(child, slideData) {
        // 1. Exclure le fond de la slide (pleine taille)
        if (child.type === 'RECTANGLE' && child.width >= 1900 && child.height >= 1000) {
          return true;
        }
        
        // 2. Exclure les éléments du haut (titre d'origine, son cadre, header bar)
        if (child.y < 240) {
          return true;
        }

        // 3. Exclure le décor bas-droite (cercle/grille) si positionné précisément à x > 1590, y > 780 et que c'est un groupe générique
        if (child.x > 1590 && child.y > 780 && (child.type === 'GROUP' || child.type === 'FRAME' || nameNorm.includes('group'))) {
          return true;
        }

        const nameNorm = normalize(child.name);
        if (nameNorm === 'background' || nameNorm === 'bg' || nameNorm === 'fond' || nameNorm === 'cadre titre' || nameNorm === 'header' || nameNorm === 'footer') {
          return true;
        }

        if (child.type === 'TEXT') {
          const textChars = child.characters.trim();
          if (slideData.content) {
            for (const val of Object.values(slideData.content)) {
              if (typeof val === 'string' && textChars === val.trim()) {
                return true;
              }
            }
          }
        }
        return false;
      }

      // 4. Génération et adaptation slide par slide
      for (let i = 0; i < slidesCount; i++) {
        const slideData = data.slides[i];
        const sourceSlide = sourceSlides[i];

        // Choix du template (utilise la clé du JSON si présente, sinon Cover pour i=0, ou Vide)
        let templateNode = null;
        if (slideData.template) {
          templateNode = findTemplate(slideData.template);
        }
        if (!templateNode) {
          templateNode = (i === 0 && coverTemplate) ? coverTemplate : videTemplate;
        }
        
        let instance;
        if (templateNode.type === 'COMPONENT') {
          instance = templateNode.createInstance();
        } else {
          instance = templateNode.clone();
        }

        lessonFrame.appendChild(instance);
        instance.x = 500 + i * 2020;
        instance.y = 500;
        instance.name = `${i + 1}. ${templateNode.name}`;

        // Initialisation des textes du template
        const newTextNodes = findTextNodes(instance).filter(isNodeVisible);
        const newShapeNodes = filterShapeNodes(findPlaceholderNodes(instance).filter(isNodeVisible), instance);

        const isCover = templateNode.name.includes("COVER");
        const isVide = templateNode.name.includes("VIDE");

        if (isCover) {
          // Slide COVER : titre de la leçon
          let titleNode = newTextNodes.find(n => normalize(n.name).includes("titre") || normalize(n.name).includes("title")) || newTextNodes[0];
          if (titleNode) {
            await loadFontForNode(titleNode);
            titleNode.characters = extractedLessonTitle;
          }
        } else if (isVide) {
          // Slide VIDE : Titre et Intro
          const titreNode = newTextNodes.find(n => normalize(n.name) === "titre" || normalize(n.name).includes("titre"));
          const introNode = newTextNodes.find(n => normalize(n.name) === "intro" || normalize(n.name).includes("intro"));

          if (titreNode && slideData.content && slideData.content.Titre) {
            await loadFontForNode(titreNode);
            titreNode.characters = slideData.content.Titre;
          }
          if (introNode && slideData.content && slideData.content.Intro) {
            await loadFontForNode(introNode);
            introNode.characters = slideData.content.Intro;
          }
        } else {
          // Tout autre template structurel : Remplissage standard
          if (slideData.content && typeof slideData.content === 'object') {
            const keys = Object.keys(slideData.content);
            const usedNodes = new Set();

            // 1. Remplissage par correspondance exacte de nom de calque
            for (const key of keys) {
              const val = slideData.content[key];
              if (isIconValue(val)) {
                const targetNode = getTargetPictoNode(instance, key, newShapeNodes, usedNodes);
                if (targetNode) {
                  const iconName = val.startsWith('iconify:') ? val.substring(8).trim() : val.trim();
                  const parts = iconName.split(':');
                  if (parts.length === 2) {
                    const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
                    fetchTasks.push({ id: targetNode.id, url: iconUrl, name: iconName, type: 'icon' });
                    usedNodes.add(targetNode);
                  }
                }
              } else if (isImageUrlValue(val)) {
                const targetNode = newShapeNodes.find(node => !usedNodes.has(node) && (normalize(node.name) === normalize(key) || normalize(node.name).includes("photo") || normalize(node.name).includes("image")));
                if (targetNode) {
                  fetchTasks.push({ id: targetNode.id, url: val.trim(), name: key, type: 'image' });
                  usedNodes.add(targetNode);
                }
              } else {
                const targetNode = newTextNodes.find(node => !usedNodes.has(node) && normalize(node.name) === normalize(key));
                if (targetNode) {
                  await loadFontForNode(targetNode);
                  targetNode.characters = String(val);
                  usedNodes.add(targetNode);
                }
              }
            }

            // 2. Remplissage des textes restants par ordre de position
            const remainingTextNodes = newTextNodes.filter(node => !usedNodes.has(node));
            const remainingTextKeys = keys.filter(key => {
              const val = slideData.content[key];
              return !isIconValue(val) && !isImageUrlValue(val) && !newTextNodes.some(node => usedNodes.has(node) && normalize(node.name) === normalize(key));
            });

            for (let j = 0; j < Math.min(remainingTextKeys.length, remainingTextNodes.length); j++) {
              const key = remainingTextKeys[j];
              const val = slideData.content[key];
              const node = remainingTextNodes[j];
              await loadFontForNode(node);
              node.characters = String(val);
              usedNodes.add(node);
            }
          }
        }

        // Duplication des éléments de la slide d'origine (uniquement pour les slides VIDE)
        if (isVide && sourceSlide && 'children' in sourceSlide) {
          for (const child of sourceSlide.children) {
            if (shouldSkipSourceNode(child, slideData)) {
              continue;
            }

            // Cloner l'élément
            const cloned = child.clone();
            instance.appendChild(cloned);
            cloned.x = child.x;
            cloned.y = child.y;

            // Adapter les polices et couleurs récursivement
            await adaptNode(cloned);
          }
        }

        // 3.5. Application des éléments sur-mesure (custom_elements)
        if (slideData.custom_elements && Array.isArray(slideData.custom_elements)) {
          for (const element of slideData.custom_elements) {
            try {
              if (element.action === 'create_node') {
                let parentNode = instance;
                if (element.parent_selector) {
                  parentNode = instance.findAll(n => normalize(n.name) === normalize(element.parent_selector))[0] || instance;
                }

                let newNode;
                const nodeType = (element.node_type || 'FRAME').toUpperCase();
                if (nodeType === 'FRAME') {
                  newNode = figma.createFrame();
                } else if (nodeType === 'TEXT') {
                  newNode = figma.createText();
                } else if (nodeType === 'RECTANGLE') {
                  newNode = figma.createRectangle();
                } else {
                  continue;
                }

                if (element.name) {
                  newNode.name = element.name;
                }

                parentNode.appendChild(newNode);

                if (element.properties) {
                  let w = newNode.width;
                  let h = newNode.height;
                  let hasWidth = false;
                  let hasHeight = false;

                  let fontToLoad = { family: "Inter", style: "Regular" };
                  if (nodeType === 'TEXT') {
                    if (element.properties.fontName) {
                      const f = element.properties.fontName;
                      if (f.family && f.style) {
                        fontToLoad = { family: f.family, style: f.style };
                      }
                    }
                    await figma.loadFontAsync(fontToLoad);
                    newNode.fontName = fontToLoad;
                  }

                  for (const [prop, val] of Object.entries(element.properties)) {
                    if (prop === 'width') {
                      w = Number(val);
                      hasWidth = true;
                    } else if (prop === 'height') {
                      h = Number(val);
                      hasHeight = true;
                    } else if (prop === 'fills') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        newNode.fills = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        newNode.fills = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'strokes') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        newNode.strokes = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        newNode.strokes = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'characters' && nodeType === 'TEXT') {
                      newNode.characters = String(val);
                    } else if (prop === 'image') {
                      fetchTasks.push({ id: newNode.id, url: val.trim(), name: 'image', type: 'image' });
                    } else if (prop === 'fontName') {
                      // Already loaded
                    } else if (prop in newNode) {
                      newNode[prop] = val;
                    }
                  }
                  if (hasWidth || hasHeight) {
                    newNode.resize(w, h);
                  }
                }

                if (element.icon) {
                  const iconName = element.icon.startsWith('iconify:') ? element.icon.substring(8).trim() : element.icon.trim();
                  const parts = iconName.split(':');
                  if (parts.length === 2) {
                    const iconUrl = `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`;
                    fetchTasks.push({ id: newNode.id, url: iconUrl, name: iconName, type: 'icon' });
                  }
                }

                if (element.image) {
                  fetchTasks.push({ id: newNode.id, url: element.image.trim(), name: 'image', type: 'image' });
                }
              } else if (element.action === 'delete_node' || element.action === 'delete_layer') {
                if (element.selector) {
                  const target = instance.findAll(n => normalize(n.name) === normalize(element.selector))[0];
                  if (target) target.remove();
                }
              } else if (element.action === 'set_property') {
                if (element.selector) {
                  const target = instance.findAll(n => normalize(n.name) === normalize(element.selector))[0];
                  if (target) {
                    const prop = element.property;
                    const val = element.value;
                    if (prop === 'width') {
                      target.resize(Number(val), target.height);
                    } else if (prop === 'height') {
                      target.resize(target.width, Number(val));
                    } else if (prop === 'fills') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        target.fills = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        target.fills = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'strokes') {
                      if (typeof val === 'string' && val.startsWith('#')) {
                        target.strokes = [{ type: 'SOLID', color: hexToFigmaColor(val) }];
                      } else if (Array.isArray(val)) {
                        target.strokes = val.map(f => {
                          if (typeof f === 'string' && f.startsWith('#')) {
                            return { type: 'SOLID', color: hexToFigmaColor(f) };
                          } else if (f && f.hex) {
                            return { type: 'SOLID', color: hexToFigmaColor(f.hex), opacity: f.opacity !== undefined ? f.opacity : 1 };
                          }
                          return f;
                        });
                      }
                    } else if (prop === 'characters' && target.type === 'TEXT') {
                      await loadFontForNode(target);
                      target.characters = String(val);
                    } else if (prop in target) {
                      target[prop] = val;
                    }
                  }
                }
              }
            } catch (e) {
              console.error("Erreur sur l'élément sur-mesure de la slide transformée :", e);
            }
          }
        }
      }

      if (fetchTasks.length > 0) {
        figma.ui.postMessage({ type: 'fetch-assets', tasks: fetchTasks });
      }

      figma.ui.postMessage({
        type: 'success',
        message: `Transformation réussie : ${slidesCount} slide(s) adaptée(s) avec succès.`
      });

    } catch (err) {
      console.error(err);
      figma.ui.postMessage({ type: 'error', message: 'Erreur lors de la transformation : ' + err.message });
    }
  }
};


// Fonction réutilisable pour mettre à jour les statistiques de la sélection en temps réel
function updateSelectionStats() {
  const selection = figma.currentPage.selection;

  if (selection.length === 1) {
    const selectedNode = selection[0];

    // Parcourt les ancêtres ou le nœud lui-même pour trouver les données partagées d'Iconify
    let iconifyProps = '';
    let currentNode = selectedNode;
    while (currentNode) {
      if ('getSharedPluginData' in currentNode) {
        iconifyProps = currentNode.getSharedPluginData('iconify', 'props');
        if (iconifyProps) break;
      }
      if (currentNode.type === 'PAGE' || currentNode.type === 'DOCUMENT') break;
      currentNode = currentNode.parent;
    }

    // Si non trouvé dans les ancêtres, cherche dans les descendants direct
    if (!iconifyProps && 'findOne' in selectedNode) {
      const child = selectedNode.findOne(n => !!n.getSharedPluginData('iconify', 'props'));
      if (child) {
        iconifyProps = child.getSharedPluginData('iconify', 'props');
      }
    }

    // Récupération de la couleur pour le debug
    const paint = extractPaintFromNode(selectedNode);
    let colorDesc = 'aucune';
    if (paint) {
      if (paint.styleId && typeof paint.styleId === 'string') {
        const style = figma.getStyleById(paint.styleId);
        colorDesc = style ? style.name : paint.styleId;
      } else if (paint.styleId === figma.mixed) {
        colorDesc = 'mixed';
      } else if (paint.value && paint.value[0]) {
        const p = paint.value[0];
        if (p.type === 'SOLID') {
          const r = Math.round(p.color.r * 255);
          const g = Math.round(p.color.g * 255);
          const b = Math.round(p.color.b * 255);
          colorDesc = `rgb(${r}, ${g}, ${b})`;
        } else {
          colorDesc = p.type;
        }
      }
    }

    if (iconifyProps) {
      figma.ui.postMessage({
        type: 'selection-update',
        count: 1,
        name: selectedNode.name,
        text: `Icône détectée : ${iconifyProps} | Couleur : ${colorDesc}`
      });
      return;
    }
  }

  let textNodes = [];
  for (const node of selection) {
    findTextNodes(node, textNodes);
  }

  if (textNodes.length === 0) {
    figma.ui.postMessage({ type: 'selection-update', count: 0, name: '', text: '' });
  } else if (textNodes.length === 1) {
    const node = textNodes[0];
    figma.ui.postMessage({
      type: 'selection-update',
      count: node.characters.length,
      name: node.name,
      text: node.characters
    });
  } else {
    let total = 0;
    for (const node of textNodes) {
      total += node.characters.length;
    }
    figma.ui.postMessage({
      type: 'selection-update',
      count: total,
      name: `${textNodes.length} calques`,
      text: ''
    });
  }
}

// Écoute les changements de sélection et les modifications de document dans Figma
figma.on("selectionchange", async () => {
  const selection = figma.currentPage.selection;
  
  if (replaceModeTargetId !== null) {
    // Si la sélection est vide, on annule
    if (selection.length === 0) {
      replaceModeTargetId = null;
      figma.ui.postMessage({ type: 'replace-mode-state', active: false });
      figma.notify("Remplacement annulé.");
      updateSelectionStats();
      return;
    }
    
    // Si clic sur un AUTRE élément unique
    if (selection.length === 1 && selection[0].id !== replaceModeTargetId) {
      const clickedSource = selection[0];
      const sourceNode = findImageNode(clickedSource);
      const target = figma.getNodeById(replaceModeTargetId);
      
      let success = false;
      let legendReplaced = false;

      if (target && sourceNode && 'fills' in target) {
        const sourceFills = sourceNode.fills;
        const imagePaint = Array.isArray(sourceFills) ? sourceFills.find(p => p.type === 'IMAGE') : null;
        
        if (imagePaint) {
          try {
            const targetFills = [...target.fills];
            const imageIdx = targetFills.findIndex(p => p.type === 'IMAGE');
            
            const updatedImage = Object.assign({}, imagePaint);
            updatedImage.scaleMode = "FILL";
            // Supprimer le transform de la source pour laisser Figma calculer le cadrage optimal pour la cible
            if ('imageTransform' in updatedImage) {
              delete updatedImage.imageTransform;
            }

            if (imageIdx !== -1) {
              updatedImage.opacity = targetFills[imageIdx].opacity;
              updatedImage.visible = targetFills[imageIdx].visible;
              targetFills[imageIdx] = updatedImage;
            } else {
              targetFills.push(updatedImage);
            }
            target.fills = targetFills;

            // Remplacement de la légende si cible et source sont groupées
            const targetGroup = target.parent && target.parent.type === 'GROUP' ? target.parent : null;
            const sourceGroup = clickedSource.type === 'GROUP' 
              ? clickedSource 
              : (sourceNode.parent && sourceNode.parent.type === 'GROUP' ? sourceNode.parent : null);

            if (targetGroup && sourceGroup) {
              const targetLegend = findLegendTextNode(targetGroup, true);
              const sourceLegend = findLegendTextNode(sourceGroup, false);
              
              if (targetLegend && sourceLegend) {
                try {
                  await updateLegendTextPreservingStyles(targetLegend, sourceLegend.characters);
                  legendReplaced = true;
                } catch (e) {
                  console.error("Erreur lors de la mise à jour de la légende :", e);
                }
              }
            }

            if (legendReplaced) {
              figma.notify("✅ Image et légende mises à jour !");
            } else {
              figma.notify("✅ Image mise à jour !");
            }
            success = true;
          } catch (err) {
            figma.notify(`❌ Erreur: ${err.message}`);
          }
        } else {
          figma.notify("⚠️ L'élément source ne contient pas d'image.");
        }
      } else {
        figma.notify("⚠️ Éléments incompatibles.");
      }
      
      // Toujours désactiver le mode après la tentative sur un clic d'élément externe
      replaceModeTargetId = null;
      figma.ui.postMessage({ type: 'replace-mode-state', active: false });
      
      // Si le remplacement a réussi, supprimer la source
      if (success) {
        try {
          clickedSource.remove();
        } catch (e) {
          console.warn("Impossible de supprimer le nœud source:", e);
        }
      }
      
      // Restaure la sélection de la cible
      try {
        if (target) {
          figma.currentPage.selection = [target];
        }
      } catch (e) {}
      
      updateSelectionStats();
      return;
    }
    
    // Si sélection multiple pendant le mode, on annule
    if (selection.length > 1) {
      replaceModeTargetId = null;
      figma.ui.postMessage({ type: 'replace-mode-state', active: false });
      figma.notify("Remplacement annulé.");
      updateSelectionStats();
      return;
    }
  }
  
  updateSelectionStats();
});

figma.on("documentchange", (event) => {
  const hasTextChange = event.documentChanges.some(change =>
    change.type === 'PROPERTY_CHANGE' && change.properties.includes('characters')
  );
  if (hasTextChange) {
    updateSelectionStats();
  }
});

// Initialise l'affichage au démarrage du plugin
updateSelectionStats();
