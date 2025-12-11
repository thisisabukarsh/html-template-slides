# Quick Start Guide

## 3 Steps to Present

### Step 1: Open the Presentation

Double-click **`index.html`** to open it in your browser.

### Step 2: Edit Your Slides (Optional)

1. Open **`slides.json`** in any text editor
2. Change the text
3. Save the file
4. Refresh your browser

### Step 3: Present!

Press **`F`** for fullscreen and use **Arrow Keys** to navigate.

---

## Essential Keyboard Shortcuts

- **← →** Navigate slides
- **F** Fullscreen mode
- **O** Overview (see all slides)
- **Esc** Exit fullscreen/overview

---

## Quick Edit Examples

### Add a New Slide

Open `slides.json` and add this between the square brackets `[ ]`:

```json
{
  "layout": "content",
  "heading": "My New Slide",
  "bullets": ["First point", "Second point"]
}
```

**Remember:** Add a comma `,` after the previous slide!

### Change Text

Find the text you want to change:

```json
"heading": "Welcome"
```

Change to:

```json
"heading": "Hello Everyone"
```

Save and refresh browser!

---

## Need More Help?

Read the full **README.md** for:

- All layout types
- Image support
- Advanced features
- Troubleshooting

## Pro Tip

Want to start fresh? Copy **`slides-template.json`** to **`slides.json`** and build from there!

---

**You're ready to create amazing presentations!**
