#!/usr/bin/env python3
import os
import sys
import argparse
from pathlib import Path

# ── 1. Chargement obligatoire du .env (racine du projet, dossier parent de /scripts) ──
try:
    from dotenv import load_dotenv
except ImportError:
    print("[Erreur] python-dotenv manquant. Lancez : pip3 install python-dotenv")
    sys.exit(1)

env_path = Path(__file__).parent.parent / ".env"
if not env_path.exists():
    print(f"[Erreur] Fichier .env introuvable : {env_path}")
    print("Créez-le à la racine du projet avec GEMINI_API_KEY, IMAGE_MODEL, IMAGE_ASPECT_RATIO, IMAGE_SIZE, IMAGE_MIME_TYPE.")
    sys.exit(1)
load_dotenv(dotenv_path=env_path)

# ── 2. Importation du SDK actif (google-genai) ──
try:
    from google import genai
except ImportError:
    print("[Erreur] SDK manquant. Lancez : pip3 install google-genai")
    sys.exit(1)


def load_env_var(name: str) -> str:
    """Lit une variable d'env et quitte si absente ou encore à la valeur placeholder."""
    value = os.environ.get(name, "").strip()
    if not value or value.startswith("your_"):
        print(f"[Erreur] '{name}' n'est pas défini (ou est encore un placeholder) dans le fichier .env.")
        sys.exit(1)
    return value


def main():
    # ── 3. Lecture des variables de configuration depuis .env ──
    api_key       = load_env_var("GEMINI_API_KEY")
    image_model   = load_env_var("IMAGE_MODEL")
    default_ratio = os.environ.get("IMAGE_ASPECT_RATIO", "1:1")
    default_size  = os.environ.get("IMAGE_SIZE", "2K")
    default_mime  = os.environ.get("IMAGE_MIME_TYPE", "image/png")

    client = genai.Client(api_key=api_key)

    # ── 4. Arguments CLI (les args surchargent les valeurs .env si fournis) ──
    parser = argparse.ArgumentParser(
        description="Générateur d'images Nanobanana 2 (Gemini API) pour le Vibe Coding"
    )
    parser.add_argument("--concept",      required=True,
                        help="Concept à illustrer (ex: sécurité, rapidité)")
    parser.add_argument("--bg",           choices=["fig", "pink", "none"], default="fig",
                        help="Arrière-plan : fig (#18093B), pink (#FFB2B2) ou none (couleur libre déterminée par le prompt/modèle)")
    parser.add_argument("--style",        choices=["woodcut", "editorial", "constructivist", "chiaroscuro", "grainy-editorial", "pedagogical", "offset-screenprint"], default="chiaroscuro",
                        help="Style artistique : woodcut (gravure), editorial (vectoriel texturé), constructivist (mid-century constructiviste), chiaroscuro (grain minimaliste) ou grainy-editorial (éditorial granuleux vectoriel)")
    parser.add_argument("--output",
                        help="Fichier de sortie (défaut : assets/vibe_[concept].png)")
    parser.add_argument("--aspect-ratio", default=default_ratio,
                        help=f"Format image (défaut depuis .env : {default_ratio}). Ex: 1:1, 16:9, 4:3")
    parser.add_argument("--image-size",   default=default_size,
                        help=f"Résolution (défaut depuis .env : {default_size}). Ex: 1K, 2K, 4K")
    parser.add_argument("--mime-type",    default=default_mime,
                        help=f"Format de fichier (défaut depuis .env : {default_mime}). Ex: image/png, image/jpeg")

    args = parser.parse_args()

    # ── 5. Lecture dynamique du prompt type depuis image_style_guide.md ──
    style_guide_path = Path(__file__).parent.parent / "image_style_guide.md"
    if not style_guide_path.exists():
        print(f"[Erreur] Fichier de style guide introuvable à l'emplacement : {style_guide_path}")
        sys.exit(1)
        
    try:
        with open(style_guide_path, "r", encoding="utf-8") as f:
            style_guide_content = f.read()
            
        import re
        # Recherche du bloc correspondant au style choisi
        block_key = f"text-style-{args.style}"
        pattern = r"```" + re.escape(block_key) + r"\s*(.*?)\s*```"
        prompt_blocks = re.findall(pattern, style_guide_content, re.DOTALL)
        
        # Fallback de rétrocompatibilité si le fichier n'a pas été mis à jour
        if not prompt_blocks:
            prompt_blocks = re.findall(r"```text\s*(.*?)\s*```", style_guide_content, re.DOTALL)
            
        if not prompt_blocks:
            print(f"[Erreur] Impossible de trouver le bloc pour le style '{args.style}' dans image_style_guide.md.")
            sys.exit(1)
            
        prompt_template = prompt_blocks[0].strip()
    except Exception as e:
        print(f"[Erreur] Impossible de lire ou de parser image_style_guide.md : {e}")
        sys.exit(1)
        
    # Choix de l'arrière-plan
    if args.bg == "fig":
        bg_desc = "solid dark navy (#18093B) background"
    elif args.bg == "pink":
        bg_desc = "solid pastel pink (#FFB2B2) background"
    else:
        bg_desc = None

    # Remplacement des variables dynamiques dans le template
    prompt = prompt_template.replace("[SUJET AVEC MÉTAPHORE VISUELLE]", args.concept)
    
    # Remplacement adaptatif du fond dans le prompt si spécifié
    if bg_desc:
        if "soft grainy paper texture background" in prompt:
            prompt = prompt.replace("soft grainy paper texture background", bg_desc)
        else:
            # Injection fluide à la fin de la description physique si le style n'utilise pas le même wording exact
            prompt += f" The illustration is on a {bg_desc}."

    print(f"\n[1/3] Modèle : {image_model} | Style : {args.style} | Format : {args.aspect_ratio} | Taille : {args.image_size}")
    print(f"      Prompt extrait : {prompt}")

    # ── 6. Appel de l'API Nanobanana 2 via generate_content (Standard 2026) avec retry ──
    from google.genai import types as genai_types
    import time
    
    strict_model_name = image_model if image_model.startswith("models/") else f"models/{image_model}"
    
    max_retries = 3
    img_bytes = None
    
    for attempt in range(1, max_retries + 1):
        try:
            print(f"[Tentative {attempt}/{max_retries}] Appel de l'API pour l'image...")
            response = client.models.generate_content(
                model=strict_model_name,
                contents=prompt,
                config=genai_types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=genai_types.ImageConfig(
                        aspect_ratio=args.aspect_ratio,
                    )
                )
            )
            
            # Extraction
            if response.parts:
                for part in response.parts:
                    if part.inline_data:
                        img_bytes = part.inline_data.data
                        break
            
            if img_bytes:
                break
            else:
                # Optionnel : si l'API a bloqué pour des raisons de sécurité, elle renvoie du texte explicatif
                try:
                    if response.text:
                        print(f"Message de l'API (tentative {attempt}) : {response.text}")
                except Exception:
                    pass
        except Exception as e:
            print(f"[Warning] Échec tentative {attempt} : {e}")
            
        if attempt < max_retries:
            sleep_time = attempt * 3
            print(f"Attente de {sleep_time}s avant la prochaine tentative...")
            time.sleep(sleep_time)

    if not img_bytes:
        print("[Erreur] Échec définitif : Aucune image retournée par l'API après plusieurs tentatives.")
        sys.exit(1)

    print(f"\n[2/3] Image reçue, sauvegarde en cours...")

    # Détermination du chemin de sortie adaptatif
    if args.output:
        out_path = args.output
    else:
        ext = "jpg" if "jpeg" in args.mime_type else "png"
        concept_clean = args.concept.replace(" ", "_").lower()
        out_path = f"assets/vibe_{concept_clean}.{ext}"

    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    
    # Le SDK renvoie déjà des bytes, on écrit directement dans le fichier
    with open(out_path, "wb") as f:
        f.write(img_bytes)

    print(f"[3/3] Image enregistrée : {out_path}")

    # ── 8. Légende formatée (à copier dans le champ Source du JSON Figma) ──
    # Extrait un label court du concept pour la légende
    concept_label = args.concept[:60].strip().rstrip(".")
    credit = f"Source : {concept_label} - Illustration générée par IA - Maxime Elhaik"
    print(f"\n📋 Légende Source (à copier dans le JSON Figma) :")
    print(f"   {credit}\n")


if __name__ == "__main__":
    main()