import json
import os
import sys
import anthropic
from dotenv import load_dotenv
from pydantic import BaseModel, Field, create_model

load_dotenv()
api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    print("No API key")
    sys.exit(1)

# Mimic the dynamic creation of models
content_fields = {
    "Titre": (str, Field(default=..., min_length=10, max_length=50))
}
Slide1Content = create_model("Slide1Content", **content_fields)

slide_fields = {
    "template": (str, Field(default="COVER")),
    "content": (Slide1Content, Field(description="Content"))
}
Slide1 = create_model("Slide1", **slide_model_fields if 'slide_model_fields' in locals() else slide_fields)

lesson_fields = {
    "lessonTitle": (str, Field(default="Test")),
    "slide_1": (Slide1, Field(description="Slide 1"))
}
DynamicLesson = create_model("DynamicLesson", **lesson_fields)

schema_json = json.dumps(DynamicLesson.model_json_schema(), indent=2, ensure_ascii=False)
print("Schema generated successfully:")
print(schema_json)

# Now try to call Claude with this schema
client = anthropic.Anthropic(api_key=api_key)
print("Calling Claude with dynamic schema...")
try:
    response = client.messages.create(
        model=os.environ.get("CLAUDE_MODEL", "claude-3-5-sonnet-20241022"),
        max_tokens=1000,
        system=f"You must respond with JSON conforming to: {schema_json}",
        messages=[
            {"role": "user", "content": "Write a title for the cover slide."}
        ]
    )
    print("Response:")
    print(response.content[0].text)
except Exception as e:
    print(f"Error: {e}")
