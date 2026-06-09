#!/usr/bin/env python3
import argparse
import sys
import os

def generate_prompts(concepts, style_guide_path="image_style_guide.md", output_path="Imports/midjourney_prompts.txt"):
    # Par défaut, si le style guide n'est pas lu, utiliser la structure standard
    base_prompt_template = (
        "A conceptual editorial illustration of {concept}.\n"
        "Digital painting in retro woodcut print engraving.\n"
        "Delicate thin outline drawings, fine line hatch patterns for textures, and subtle halftone dot shading on a solid {bg_color} background.\n"
        "Strict color palette of dark navy (#18093B), pastel pink (#FFB2B2), and accent highlights of bright yellow (#FFFF77).\n"
        "Clean composition."
    )
    
    # Alternance des arrière-plans : Fig (#18093B) ou Pink Feeling (#FFB2B2)
    # Pour Midjourney, on peut utiliser les noms de couleurs en anglais pour de meilleurs résultats
    bg_colors = [
        ("dark navy blue (#18093B)", "Fig"),
        ("soft pastel pink (#FFB2B2)", "Pink Feeling")
    ]
    
    prompts = []
    for idx, concept in enumerate(concepts):
        bg_desc, bg_name = bg_colors[idx % 2]
        
        # Formater le prompt de base
        prompt_content = base_prompt_template.format(
            concept=concept.strip(),
            bg_color=bg_desc
        )
        
        # Midjourney-specific suffix
        # --ar 1:1 pour le format carré par défaut, --style raw, --v 6.0 ou --personalize
        mj_prompt = f"/imagine prompt: {prompt_content.replace(chr(10), ' ')} --ar 1:1 --style raw"
        prompts.append((concept.strip(), bg_name, mj_prompt))

    # Écrire dans le fichier de sortie
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("# PROMPTS MIDJOURNEY GÉNÉRÉS\n")
        f.write("# Copiez-collez les commandes ci-dessous dans Discord (Midjourney)\n")
        f.write("# Enregistrez ensuite les images dans le dossier assets/ sous les noms correspondants.\n\n")
        for concept, bg_name, mj_prompt in prompts:
            f.write(f"## Concept: {concept} (Arrière-plan ciblé : {bg_name})\n")
            f.write(f"{mj_prompt}\n\n")
            
    print(f"\n[Succès] Prompts générés et écrits dans : {output_path}")
    print("=" * 60)
    for concept, bg_name, mj_prompt in prompts:
        print(f"\nConcept : {concept} ({bg_name})")
        print("-" * 30)
        print(mj_prompt)
    print("=" * 60)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Générateur de prompts Midjourney pour le Vibe Coding")
    parser.add_argument("concepts", nargs="*", help="Liste des concepts à illustrer (ex: 'sécurité' 'rapidité')")
    args = parser.parse_args()
    
    concepts = args.concepts
    if not concepts:
        # Prompt interactif si aucun argument
        print("Entrez les concepts séparés par des virgules (ex: sécurité, rapidité, parcours professionnel) :")
        line = sys.stdin.readline()
        if not line.strip():
            print("Aucun concept fourni. Fin du script.")
            sys.exit(0)
        concepts = [c.strip() for c in line.split(",") if c.strip()]
        
    generate_prompts(concepts)
