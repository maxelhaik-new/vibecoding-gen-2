import json
from pathlib import Path

root_dir = Path("/Users/maximeelhaik/Documents/VIBE CODING GENERATION")

# 1. Load reference files
files = {
    "brand_voice.md": root_dir / "brand_voice.md",
    "templates_charter.md": root_dir / "templates_charter.md",
    "icon_mapping.md": root_dir / "icon_mapping.md",
}

base_context = ""
for name, path in files.items():
    with open(path, "r", encoding="utf-8") as f:
        base_context += f"\n\n=== FILE: {name} ===\n" + f.read()

# Load Plan
plan_path = root_dir / "M1/M1C4/M1C4L5/PLAN_M1C4L9.md"
with open(plan_path, "r", encoding="utf-8") as f:
    outline = f.read()

# Load Schema (simulated from Pydantic models in the script)
# Let's read the schema directly from the Python objects or write a representation of them
decoupe_schema = {
  "properties": {
    "lessonTitle": {"description": "The overall title of the lesson", "type": "string"},
    "slides": {
      "items": {
        "properties": {
          "title": {"description": "Title or main concept of the slide", "type": "string"},
          "template": {"description": "The exact name of the Figma template to use according to templates_charter.md rules", "type": "string"}
        },
        "required": ["title", "template"],
        "type": "object"
      },
      "type": "array"
    }
  },
  "required": ["lessonTitle", "slides"],
  "type": "object"
}

ecris_schema = {
  "properties": {
    "lessonTitle": {"description": "The overall title of the lesson", "type": "string"},
    "slides": {
      "items": {
        "properties": {
          "template": {"description": "The exact name of the Figma template from templates.json, e.g., 'VIBECODING - COVER'", "type": "string"},
          "content": {
            "items": {
              "properties": {
                "key": {"description": "The placeholder key (e.g., 'Titre', 'Intro', 'Titre 1', 'Texte 1', 'Picto 1')", "type": "string"},
                "value": {"description": "The text content or icon identifier", "type": "string"}
              },
              "required": ["key", "value"],
              "type": "object"
            },
            "type": "array"
          },
          "image_concept": {"description": "Detailed metaphorical concept in English for the image generator...", "type": "string"},
          "image_style": {"description": "The style to use for generating the image...", "type": "string"},
          "image_ratio": {"description": "The aspect ratio of the image...", "type": "string"}
        },
        "required": ["template", "content"],
        "type": "object"
      },
      "type": "array"
    }
  },
  "required": ["lessonTitle", "slides"],
  "type": "object"
}

# Templates chosen for L9
chosen_templates = [
    "VIBECODING - COVER",
    "VIBECODING - INTRO",
    "VIBECODING - CONCEPT",
    "VIBECODING - CHIFFRES",
    "VIBECODING - 4 BLOCS - TITLE 2 LINES",
    "VIBECODING - 2 BLOC - EVOLUTION",
    "VIBECODING - FIN"
]

with open(root_dir / "templates.json", "r", encoding="utf-8") as f:
    all_templates = json.load(f)
extracted_templates = [t for t in all_templates if t.get("name") in chosen_templates]

# --- RECONSTRUCT DECOUPE ---
decoupe_system = f"You are an expert pedagogical course generator for Wemodo and Vibe Coding.\nYour task is to structure lesson contents into Figma slides according to the provided instructions.\n\nHere are the reference styles and guidelines:\n{base_context}"

decoupe_prompt = (
    f"Analyze the following outline and structure it into slides by choosing only the template names.\n\n"
    f"Outline:\n{outline}\n\n"
    "Remember to select the correct template for each slide according to templates_charter.md.\n"
    "CRITICAL PEDAGOGICAL DESIGN RULES:\n"
    "- Diversify the templates: Do not use the same template more than 2 times in the entire lesson, regardless of the order.\n"
    "- EXCEPTIONS FOR REPETITION: Consecutive identical templates (even more than 2) are ONLY allowed if the slides are designed to be in parallel (e.g. comparing 'Tool A', 'Tool B', 'Tool C' individually, or presenting 'Case 1: Developers', 'Case 2: Freelancers' individually using the same layout for visual parity). Otherwise, you MUST diversify.\n"
    "- Avoid over-selecting the 'VIBECODING - CONCEPT' template. Use it ONLY when presenting a theoretical model, notion, or abstract concept (e.g., the concept of a stack, the concept of agent parallelization) without it being a simple vocabulary or dictionary definition. If a text-heavy/paragraph slide is needed for explanation, context, or narration, prefer 'VIBECODING - USE CASE' instead, but also avoid over-using 'VIBECODING - USE CASE'.\n"
    "- If the outline presents a list or enumeration of similar points/items (e.g., list of tools, profiles, steps, examples), "
    "you MUST group these points into a single multi-block template (such as 'VIBECODING - 3 BLOCS - LARGE TEXT', 'VIBECODING - 3 COLONNES', "
    "'VIBECODING - 4 BLOCS - TITLE 2 LINES', 'VIBECODING - 5 BLOCS', or 'VIBECODING - 6 BLOCS') rather than creating a separate concept slide for each item. This reduces clutter and increases visual density.\n"
    "DO NOT write the slide contents at this step, only return the list of slides with their titles and templates chosen.\n\n"
    f"IMPORTANT: You MUST respond with a JSON object that conforms to this JSON schema:\n"
    f"{json.dumps(decoupe_schema, indent=2)}\n\n"
    "Return ONLY the raw JSON object, starting with { and ending with }."
)

# --- RECONSTRUCT ECRIS ---
ecris_context = base_context + f"\n\n=== EXTRACTED TEMPLATES (Only the needed templates rules) ===\n" + json.dumps(extracted_templates, indent=2, ensure_ascii=False)
ecris_system = f"You are an expert pedagogical course generator for Wemodo and Vibe Coding.\nYour task is to structure lesson contents into Figma slides according to the provided instructions.\n\nHere are the reference styles and guidelines:\n{ecris_context}"

# Simulated DecoupedLesson output structure passed to ecris
structure_sim = {
  "lessonTitle": "M1C4L9",
  "slides": [
    {"title": "En finir avec le mythe du remplacement", "template": "VIBECODING - COVER"},
    {"title": "L'IA va-t-elle nous remplacer ?", "template": "VIBECODING - INTRO"},
    {"title": "Le code basique se banalise", "template": "VIBECODING - CONCEPT"},
    {"title": "Ce que dit le marché", "template": "VIBECODING - CHIFFRES"},
    {"title": "Où va la valeur", "template": "VIBECODING - 4 BLOCS - TITLE 2 LINES"},
    {"title": "La règle d'or", "template": "VIBECODING - CONCEPT"},
    {"title": "Ce que ça change pour nous", "template": "VIBECODING - 2 BLOC - EVOLUTION"},
    {"title": "Ce qu'il faut retenir", "template": "VIBECODING - FIN"}
  ]
}

ecris_prompt = (
    f"Fill the content variables for each slide defined in the following structure using the original outline as the source of truth.\n\n"
    f"Original Outline:\n{outline}\n\n"
    f"Structure:\n{json.dumps(structure_sim, indent=2)}\n\n"
    "CRITICAL: For any slide using a template containing an image (e.g. PHOTO, IMAGE, USE CASE, FOCUS OUTIL), "
    "you MUST generate a non-null, descriptive 'image_concept' in English (as a prompt for a visual metaphor) and a non-null 'image_style'. "
    "Never return null or empty values for these fields when the template requires an image.\n\n"
    f"IMPORTANT: You MUST respond with a JSON object that conforms to this JSON schema:\n"
    f"{json.dumps(ecris_schema, indent=2)}\n\n"
    "Return ONLY the raw JSON object, starting with { and ending with }."
)

# Write to scratch
Path(root_dir / "scratch").mkdir(exist_ok=True)
with open(root_dir / "scratch/decoupe_system_prompt.txt", "w") as f:
    f.write(decoupe_system)
with open(root_dir / "scratch/decoupe_user_prompt.txt", "w") as f:
    f.write(decoupe_prompt)
with open(root_dir / "scratch/ecris_system_prompt.txt", "w") as f:
    f.write(ecris_system)
with open(root_dir / "scratch/ecris_user_prompt.txt", "w") as f:
    f.write(ecris_prompt)

print(f"DECOUPE SYSTEM: {len(decoupe_system)} chars (~{len(decoupe_system)//4} tokens)")
print(f"DECOUPE USER: {len(decoupe_prompt)} chars (~{len(decoupe_prompt)//4} tokens)")
print(f"ECRIS SYSTEM: {len(ecris_system)} chars (~{len(ecris_system)//4} tokens)")
print(f"ECRIS USER: {len(ecris_prompt)} chars (~{len(ecris_prompt)//4} tokens)")
