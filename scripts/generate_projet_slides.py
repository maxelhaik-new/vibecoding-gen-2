#!/usr/bin/env python3
"""
generate_projet_slides.py
Génère automatiquement les 13 slides adaptées pour un nouveau projet fil rouge.

Usage:
  python3 scripts/generate_projet_slides.py "Description ou nom du projet" [--provider gemini|claude] [--model model_name]
"""

import os
import sys
import json
import re
import time
import subprocess
import argparse
from pathlib import Path

# ─── Load Environment variables manually ───
root_dir = Path(__file__).parent.parent
env_path = root_dir / ".env"
env_vars = {}
if env_path.exists():
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line_strip = line.strip()
            if line_strip and not line_strip.startswith("#") and "=" in line_strip:
                k, v = line_strip.split("=", 1)
                env_vars[k.strip()] = v.strip().strip('"').strip("'")

# Assign variables to os.environ if not already present
for k, v in env_vars.items():
    if k not in os.environ:
        os.environ[k] = v

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

# Import google-genai SDK
try:
    from google import genai
    from google.genai import types
except ImportError:
    print("[Error] google-genai SDK is missing. Run: pip3 install google-genai")
    sys.exit(1)

# Import Anthropic SDK
try:
    import anthropic
except ImportError:
    anthropic = None

try:
    from pydantic import BaseModel, Field
    from typing import List
except ImportError:
    print("[Error] pydantic is missing. Run: pip3 install pydantic")
    sys.exit(1)

# Define schemas for Structured Output (Avoiding Dict to prevent Gemini additionalProperties error)
class ContentPair(BaseModel):
    key: str = Field(description="Le nom exact du calque Figma (ex: 'Titre', 'Commercial Terrain')")
    value: str = Field(description="La valeur textuelle ou l'icône injectée adaptée au projet")

class Slide(BaseModel):
    template: str = Field(description="Le nom exact du template (ex: 'PROJET - BRIEF')")
    content: List[ContentPair] = Field(description="La liste des paires clé-valeur pour remplir cette slide.")

class ProjetSlides(BaseModel):
    lessonTitle: str = Field(description="Le titre court du projet fil rouge (ex: 'Projet : CRM Mobile')")
    slides: List[Slide] = Field(description="La suite des 13 slides spéciales du projet fil rouge dans l'ordre chronologique exact de gauche à droite.")

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text

def clean_json_response(text: str) -> str:
    text = text.strip()
    match = re.search(r"```json\s*(.*?)\s*```", text, re.DOTALL)
    if match:
        text = match.group(1).strip()
    else:
        match_generic = re.search(r"```\s*(.*?)\s*```", text, re.DOTALL)
        if match_generic:
            text = match_generic.group(1).strip()
            
    start_idx = text.find("{")
    if start_idx == -1:
        return text
    return text[start_idx:].strip()

def main():
    parser = argparse.ArgumentParser(description="Génère automatiquement les 13 slides adaptées pour un nouveau projet fil rouge.")
    parser.add_argument("project_desc", type=str, help="Description ou nom du projet fil rouge")
    parser.add_argument("--provider", "-p", type=str, choices=["gemini", "claude"], default="gemini", help="Fournisseur d'IA à utiliser (gemini ou claude)")
    parser.add_argument("--model", "-m", type=str, default=None, help="Modèle spécifique à appeler (surcharge la valeur par défaut du .env)")
    
    args = parser.parse_args()
    project_desc = args.project_desc
    provider = args.provider.lower()

    project_slug = slugify(project_desc)[:30]
    print(f"\n[1/4] Initialisation de la génération pour : \"{project_desc}\" (Provider: {provider.upper()})")

    # Load templates details for the prompt
    templates_path = root_dir / "templates.json"
    if not templates_path.exists():
        print(f"[Error] templates.json introuvable à : {templates_path}")
        sys.exit(1)

    with open(templates_path, "r", encoding="utf-8") as f:
        all_templates = json.load(f)

    # Filter only PROJET templates
    project_templates = [t for t in all_templates if t.get("name", "").startswith("PROJET -")]
    print(f"      Chargement de {len(project_templates)} templates spéciaux du projet fil rouge.")

    # Map to store static layers default values for each template
    static_defaults = {}
    for t in project_templates:
        t_name = t.get("name")
        static_defaults[t_name] = {}
        for l in t.get("text_layers", []):
            k = l.get("key", "")
            # Identify if it is "Intro", a number, or sequence of digits
            if k == "Intro" or k.isdigit() or re.match(r'^\d+(\.\d+)*$', k):
                static_defaults[t_name][k] = l.get("default", k)

    # Formulate template dictionary for the prompt instruction
    templates_info = []
    for t in project_templates:
        layers = []
        for l in t.get("text_layers", []):
            k = l.get("key", "")
            # Filter out 'Intro', numeric labels, and pure numbers
            if k == "Intro" or k.isdigit() or re.match(r'^\d+(\.\d+)*$', k):
                continue
            layers.append(k)

        pictos = [p.get("key") for p in t.get("picto_layers", [])]
        images = [i.get("key") for i in t.get("image_layers", [])]
        templates_info.append({
            "name": t.get("name"),
            "description": t.get("description"),
            "text_layers_keys": layers,
            "picto_layers_keys": pictos,
            "image_layers_keys": images
        })

    templates_formatted_str = json.dumps(templates_info, indent=2, ensure_ascii=False)

    # Formulate prompt using the brand voice rules
    brand_voice_path = root_dir / "brand_voice.md"
    brand_voice_rules = ""
    if brand_voice_path.exists():
        with open(brand_voice_path, "r", encoding="utf-8") as f:
            brand_voice_rules = f.read()

    system_instruction = (
        "Tu es un ingénieur pédagogique et un expert UX/UI spécialisé dans le Vibe Coding.\n"
        "Ton objectif est de créer l'intégralité des 13 slides de suivi d'un nouveau projet fil rouge dans l'ordre exact, adapté au sujet choisi par l'utilisateur.\n\n"
        "### RÈGLES DE STYLE ET DE TON (BRAND VOICE)\n"
        "1. Ton direct, pragmatique et orienté code rapide.\n"
        "2. Pas de jargon complexe non expliqué, métaphores concrètes.\n"
        "3. Conseil derrière flèche uniquement : utilisez le symbole '→' devant chaque conseil ou consigne pratique.\n"
        "4. NE JAMAIS tutoyer. Toujours vouvoyer.\n"
        "5. Concision maximale.\n\n"
        "### RÈGLE D'ADAPTATION DYNAMIQUE\n"
        "Tu dois transposer l'intégralité du vocabulaire, des contraintes d'usage, de la stack technique et des exemples en fonction du projet choisi.\n"
        "Par exemple, si le projet est une interface de réalité virtuelle, le persona sera un utilisateur VR, la stack utilisera WebXR/Three.js, et les contraintes d'ergonomie et de design de l'Agent.md traiteront de la latence, des contrastes et de l'interaction spatiale.\n\n"
        "IMPORTANT : Tu ne dois JAMAIS générer de contenu ou de clé pour les calques de texte nommés \"Intro\" ou contenant uniquement des numéros (ex: \"1\", \"2\", \"3\", etc.). Ils doivent obligatoirement être omis de l'objet \"content\" pour conserver leur texte par défaut dans le template.\n\n"
        "Voici la liste des templates Figma à ta disposition ainsi que leurs clés de calques de texte exactes :\n"
        f"{templates_formatted_str}\n\n"
        "Tu dois obligatoirement générer un contenu pour chacune des 13 slides listées ci-dessus dans l'ordre chronologique exact de gauche à droite.\n\n"
        "### FORMAT DE SORTIE JSON ATTENDU\n"
        "Tu dois soumettre la leçon complète sous forme structurée respectant le schéma d'outil ou la classe ProjetSlides fournie."
    )

    prompt = (
        f"Génère la suite de 13 slides du projet fil rouge pour le projet suivant :\n"
        f"Description du projet : {project_desc}\n\n"
        "Consignes spécifiques :\n"
        "- Pour PROJET - BRIEF : Propose une image d'illustration représentant l'univers métier. Rédige de façon inspirante. Pour le champ 'Texte 1' qui détaille l'objectif de l'application sous 'Objectif de l'application', écris obligatoirement un texte long, riche et détaillé d'au moins 35 à 50 mots (le double de la taille habituelle) décrivant le périmètre et la solution technique.\n"
        "- Pour PROJET - PERSONA : Adapte le nom (ex: 'Sarah', 'Alexandre'), le rôle, les 3 caractéristiques, et les 3 solutions ergonomiques.\n"
        "- Pour PROJET - USER STORY : Renseigne le nom de l'application, l'US principale, et la liste des 3 US du MVP.\n"
        "- Pour PROJET - CAHIER : Adapte Sarah/Alexandre, la description, et les 2 US simplifiées.\n"
        "- Pour PROJET - PROMPT 1 à 4 : Rédige le Prompt Zéro découpé en 4 étapes progressives (Contexte, Périmètre, Stack technique, Amorce).\n"
        "- Pour PROJET - DESIGN 1 à 4 : Fournis les instructions de design précises (respiration, ergonomie mobile ou adaptée, couleurs, typographie) à écrire dans Agent.md."
    )

    projet_data = None

    if provider == "gemini":
        if not GEMINI_API_KEY:
            print("[Error] GEMINI_API_KEY is not defined in .env or system environment.")
            sys.exit(1)
        model_name = args.model or os.environ.get("GEMINI_TEXT_MODEL", "gemini-3.6-flash")
        print(f"\n[2/4] Appel de l'IA Gemini (Modèle: {model_name})...")
        client = genai.Client(api_key=GEMINI_API_KEY)

        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    response_mime_type="application/json",
                    response_schema=ProjetSlides,
                    temperature=0.3
                )
            )
            cleaned_json = clean_json_response(response.text)
            raw_data = json.loads(cleaned_json)
            
            # Convert structured List[ContentPair] to Dict[str, str] required by Vibe Slicer
            formatted_slides = []
            for slide in raw_data.get("slides", []):
                t_name = slide["template"]
                content_dict = {}
                # First, fill in default/static values from templates.json
                if t_name in static_defaults:
                    for k, v in static_defaults[t_name].items():
                        content_dict[k] = v
                # Then, override with AI-generated content
                for pair in slide.get("content", []):
                    content_dict[pair["key"]] = pair["value"]
                formatted_slides.append({
                    "template": t_name,
                    "content": content_dict
                })
                
            projet_data = {
                "lessonTitle": raw_data.get("lessonTitle", "Projet Fil Rouge"),
                "slides": formatted_slides
            }
        except Exception as e:
            print(f"[Error] L'appel ou la validation du schéma avec Gemini a échoué : {e}")
            if 'response' in locals() and response.text:
                print(f"Réponse brute de l'IA : {response.text[:1000]}...")
            sys.exit(1)

    elif provider == "claude":
        if not anthropic:
            print("[Error] anthropic SDK is missing. Run: pip3 install anthropic")
            sys.exit(1)
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            print("[Error] ANTHROPIC_API_KEY environment variable is not defined.")
            sys.exit(1)
            
        model_name = args.model or os.environ.get("CLAUDE_MODEL", "claude-3-5-sonnet-20241022")
        print(f"\n[2/4] Appel de l'IA Claude (Modèle: {model_name})...")
        client = anthropic.Anthropic(api_key=api_key)
        
        tools = [
            {
                "name": "submit_lesson",
                "description": "Submit the completed lesson content structure following the schema",
                "input_schema": ProjetSlides.model_json_schema()
            }
        ]
        
        try:
            response = client.messages.create(
                model=model_name,
                max_tokens=8192,
                system=[
                    {
                        "type": "text",
                        "text": system_instruction
                    }
                ],
                messages=[
                    {"role": "user", "content": prompt}
                ],
                tools=tools,
                tool_choice={"type": "tool", "name": "submit_lesson"},
                temperature=0.2
            )
            
            tool_use_blocks = [block for block in response.content if block.type == "tool_use"]
            if not tool_use_blocks:
                raise ValueError("Claude n'a pas renvoyé l'appel d'outil attendu.")
                
            raw_data = tool_use_blocks[0].input
            
            # Convert structured List[ContentPair] to Dict[str, str] required by Vibe Slicer
            formatted_slides = []
            for slide in raw_data.get("slides", []):
                t_name = slide["template"]
                content_dict = {}
                # First, fill in default/static values from templates.json
                if t_name in static_defaults:
                    for k, v in static_defaults[t_name].items():
                        content_dict[k] = v
                # Then, override with AI-generated content
                for pair in slide.get("content", []):
                    content_dict[pair["key"]] = pair["value"]
                formatted_slides.append({
                    "template": t_name,
                    "content": content_dict
                })
                
            projet_data = {
                "lessonTitle": raw_data.get("lessonTitle", "Projet Fil Rouge"),
                "slides": formatted_slides
            }
        except Exception as e:
            print(f"[Error] L'appel ou le parsing avec Claude a échoué : {e}")
            sys.exit(1)

    print("✅ Contenu des slides généré par l'IA avec succès.")

    # ─── Set static placeholder image for PROJET - BRIEF ───
    print("\n[3/4] Attribution de l'image d'illustration par défaut pour la slide BRIEF...")
    brief_slide = None
    for slide in projet_data.get("slides", []):
        if slide.get("template") == "PROJET - BRIEF":
            brief_slide = slide
            break

    if brief_slide:
        content = brief_slide.get("content", {})
        content["image"] = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"
        content["Source"] = "Source : Illustration par défaut - Maxime Elhaik"
        print("      Image par défaut attribuée.")
    else:
        print("      [Warning] Pas de slide PROJET - BRIEF trouvée dans la génération.")

    # ─── Write FINAL output JSON ───
    final_filename = f"FINAL_PROJET_{project_slug.upper()}.json"
    final_path = root_dir / final_filename

    lesson_wrapper = {
        "moduleTitle": "Module Projet : Projets Fil Rouge",
        "moduleSlug": "projets-fil-rouge",
        "chapterTitle": f"Suivi de projet : {projet_data.get('lessonTitle')}",
        "chapterNumber": 9,
        "lessons": [
            {
                "lessonSlug": f"projet-{project_slug}",
                "lessonTitle": projet_data.get("lessonTitle"),
                "lessonType": "cas_pratique",
                "colorName": "Bleu clair",
                "color": "#A0D2FF",
                "backgroundColor": "#A0D2FF",
                "colorHex": "#A0D2FF",
                "slides": projet_data.get("slides", [])
            }
        ]
    }

    with open(final_path, "w", encoding="utf-8") as f:
        json.dump(lesson_wrapper, f, ensure_ascii=False, indent=2)

    print(f"\n[4/4] Fichier JSON final généré avec succès !")
    print(f"👉 Enregistré sous : {final_path}")
    print(f"Vous pouvez maintenant copier le JSON de ce fichier pour l'injecter via le plugin Figma, ou le charger dans Vibe Slicer.")

if __name__ == "__main__":
    main()
