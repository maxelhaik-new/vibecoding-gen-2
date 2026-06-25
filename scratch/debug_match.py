with open('studio/src/App.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's search for unique markers in the target_right string
markers = [
    "/* 3. RIGHT SIDEBAR: Script Orchestrator & Live Terminal */",
    "<aside style={{",
    "width: '380px',",
    "height: 'calc(100vh - 24px)',",
    "/* Field Validation Panel */",
    "🎯 Validation du Champ",
    "/* Pipeline Control Box */",
    "⚡ Lanceur de Pipeline",
    "Modèle IA (Optionnel) :",
    "Générer les illustrations",
    "/* Live Terminal console logs box */",
    "🖥️ Console d'Exécution",
    "/* Modal for creating a new lesson */",
    "Créer une nouvelle leçon"
]

print("Checking presence of markers:")
for m in markers:
    print(f"  '{m}': {m in code}")
