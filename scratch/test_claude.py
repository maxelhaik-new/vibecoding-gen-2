import os
import sys
import anthropic
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    print("ANTHROPIC_API_KEY not defined")
    sys.exit(1)
    
client = anthropic.Anthropic(api_key=api_key)

print("Sending simple message to Claude...")
try:
    response = client.messages.create(
        model=os.environ.get("CLAUDE_MODEL", "claude-3-5-sonnet-20241022"),
        max_tokens=100,
        messages=[
            {"role": "user", "content": "Hello, respond with 'hello' only."}
        ]
    )
    print("Response received:")
    print(response.content[0].text)
except Exception as e:
    print(f"Error: {e}")
