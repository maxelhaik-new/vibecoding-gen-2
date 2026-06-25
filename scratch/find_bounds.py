with open('studio/src/App.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_marker = "      {/* 3. RIGHT SIDEBAR: Script Orchestrator & Live Terminal */}"
end_marker = """      {/* Modal for creating a new lesson */}
      {showCreateModal && ("""

start_idx = code.find(start_marker)
end_idx = code.find(end_marker)

print(f"Start index: {start_idx}")
print(f"End index: {end_idx}")

if start_idx != -1 and end_idx != -1:
    content_between = code[start_idx:end_idx]
    print(f"Content length: {len(content_between)}")
    # Write it to a file so we can view it or use it
    with open('scratch/right_sidebar_original.txt', 'w', encoding='utf-8') as f:
        f.write(content_between)
    print("Wrote right sidebar original content to scratch/right_sidebar_original.txt")
else:
    print("Could not find start or end markers.")
