import sys
import time
from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to http://localhost:5173...")
        page.goto("http://localhost:5173", wait_until="domcontentloaded", timeout=15000)
        time.sleep(2)

        # Find first delete button
        delete_btn = page.locator(".slide-card-delete-btn").first
        if delete_btn.count() > 0:
            print("First delete button initial text:", delete_btn.inner_text())
            delete_btn.click()
            time.sleep(0.5)
            print("Text after 1st click:", delete_btn.inner_text())
            assert "Supprimer ?" in delete_btn.inner_text(), "Inline confirmation text missing"
            print("Inline confirmation UI test PASSED!")
        else:
            print("No delete button found on page.")

        browser.close()

if __name__ == "__main__":
    main()
