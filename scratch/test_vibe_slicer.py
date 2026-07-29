import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

def main():
    screenshot_dir = Path("/Users/maximeelhaik/.gemini/antigravity/brain/0a5e9257-9f21-41e9-8d18-781e34cc4d96")
    screenshot_dir.mkdir(parents=True, exist_ok=True)
    screenshot_path = screenshot_dir / "vibe_slicer_app.png"

    console_logs = []
    page_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda exc: page_errors.append(str(exc)))

        print("Navigating to http://localhost:5173...")
        response = page.goto("http://localhost:5173", wait_until="domcontentloaded", timeout=15000)
        
        print(f"HTTP Status: {response.status}")
        
        # Wait a moment for dynamic React components to settle
        time.sleep(2)
        
        title = page.title()
        print(f"Page Title: {title}")

        # Capture full page screenshot
        page.screenshot(path=str(screenshot_path), full_page=True)
        print(f"Screenshot saved to: {screenshot_path}")

        # Extract visible elements info
        body_text = page.inner_text("body")
        print("\n--- BODY TEXT PREVIEW ---")
        print(body_text[:500] if len(body_text) > 500 else body_text)
        print("-------------------------")

        browser.close()

    print("\n--- CONSOLE LOGS ---")
    for log in console_logs[:10]:
        print(log)

    print("\n--- PAGE ERRORS ---")
    if page_errors:
        for err in page_errors:
            print("ERROR:", err)
    else:
        print("Aucune erreur JS détectée.")

if __name__ == "__main__":
    main()
