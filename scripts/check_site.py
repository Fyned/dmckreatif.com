from playwright.sync_api import sync_playwright
import os

OUT = "C:/Projects/CLAUDE-BOT/dmckreatif-vite/screenshots/check"
os.makedirs(OUT, exist_ok=True)

SECTIONS = [
    ("hero", 0),
    ("services", 1200),
    ("portfolio", 2400),
    ("campaign", 4200),
    ("pricing", 5400),
    ("stats", 3600),
    ("trust", 7200),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # --- DESKTOP EN ---
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("https://dmckreatif.com/en", wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    # Full page
    page.screenshot(path=f"{OUT}/en-desktop-full.png", full_page=True)

    # Above fold
    page.screenshot(path=f"{OUT}/en-desktop-hero.png")

    # Scroll to sections
    for name, y in SECTIONS:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUT}/en-desktop-{name}.png")

    page.close()

    # --- MOBILE EN ---
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto("https://dmckreatif.com/en", wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    page.screenshot(path=f"{OUT}/en-mobile-full.png", full_page=True)
    page.screenshot(path=f"{OUT}/en-mobile-hero.png")

    # Scroll mobile
    for name, y in [("services", 1400), ("portfolio", 3000), ("campaign", 5500), ("pricing", 7000)]:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUT}/en-mobile-{name}.png")

    page.close()

    # --- GERMAN (check ü fix) ---
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("https://dmckreatif.com/de", wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    page.screenshot(path=f"{OUT}/de-desktop-hero.png")

    # Scroll to campaign section for countdown
    page.evaluate("window.scrollTo(0, 4200)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUT}/de-desktop-campaign.png")

    page.close()

    browser.close()
    print("Done! Screenshots saved to", OUT)
