# HTML Slides - Modern Presentation Template

A beautiful, responsive, and easy-to-use HTML/CSS presentation system with Microsoft Edge colors. Create stunning presentations by simply editing a JSON file - no coding required!

## Features

- **JSON-Based Content**: Edit slides using simple JSON - no HTML/CSS knowledge needed
- **4 Layout Types**: Title, Content, Two-Column, and Image layouts
- **Responsive Design**: Looks perfect on desktop, tablet, and mobile
- **Keyboard Shortcuts**: Navigate like a pro with intuitive shortcuts
- **Overview Mode**: See all slides at once (like PowerPoint's slide sorter)
- **Auto-Save Progress**: Automatically remembers where you left off
- **Print to PDF**: Export your presentation with a single click
- **Fullscreen Mode**: Present like a professional
- **Smooth Animations**: Beautiful transitions between slides
- **Theme**: Modern blue-to-teal gradient colors

## 📦 Quick Start

### 1. Files You Have

```
html-slides/
├── index.html      # Main HTML file (don't edit this)
├── styles.css      # Styles (don't edit this)
├── slides.js       # JavaScript logic (don't edit this)
├── slides.json     # YOUR PRESENTATION CONTENT (edit this!)
└── README.md       # This documentation
```

### 2. How to Run

1. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari)
2. That's it! Your presentation is ready.

**OR** if you want to run a local server:

```bash
# If you have Python installed
python -m http.server 8000

# Then open: http://localhost:8000
```

### 3. How to Edit Your Presentation

1. Open `slides.json` in any text editor (VS Code, Notepad, etc.)
2. Edit the content (see below for examples)
3. Save the file
4. Refresh your browser
5. Done! ✨

## 📝 Creating Slides

All your presentation content is in `slides.json`. Here's the basic structure:

```json
{
  "title": "My Presentation Title",
  "slides": [
    {
      "layout": "title",
      "heading": "My First Slide",
      "subheading": "Subtitle text here"
    }
  ]
}
```

## 🎨 Layout Types

### 1. Title Layout

Perfect for cover slides and section headers.

```json
{
  "layout": "title",
  "heading": "Welcome to My Presentation",
  "subheading": "An Introduction to Amazing Ideas"
}
```

**Fields:**

- `heading` (required): Main title
- `subheading` (optional): Subtitle text

---

### 2. Content Layout

Standard slide with heading, text, bullets, and optional image.

```json
{
  "layout": "content",
  "heading": "Key Points",
  "text": "Here's some introductory text",
  "bullets": [
    "First bullet point",
    "Second bullet point",
    "Third bullet point"
  ],
  "image": "path/to/image.jpg",
  "imageAlt": "Image description"
}
```

**Fields:**

- `heading` (optional): Slide title
- `text` (optional): Paragraph text
- `bullets` (optional): Array of bullet points
- `numbered` (optional): Array of numbered items (use instead of bullets)
- `image` (optional): Image URL or path
- `imageAlt` (optional): Alt text for image

**You can use bullets OR numbered, not both.**

---

### 3. Two-Column Layout

Split content into two columns for comparisons.

```json
{
  "layout": "two-column",
  "heading": "Before vs After",
  "leftHeading": "Before",
  "leftContent": ["Old way point 1", "Old way point 2"],
  "rightHeading": "After",
  "rightContent": ["New way point 1", "New way point 2"]
}
```

**Fields:**

- `heading` (optional): Main slide title
- `leftHeading` (optional): Left column title
- `leftContent` (required): Array of items OR string of text
- `rightHeading` (optional): Right column title
- `rightContent` (required): Array of items OR string of text

---

### 4. Image Layout

Focus on a large image with caption.

```json
{
  "layout": "image",
  "heading": "Check Out This Image",
  "image": "path/to/image.jpg",
  "imageAlt": "Description of image",
  "caption": "This is a beautiful image showing..."
}
```

**Fields:**

- `heading` (optional): Title above image
- `image` (required): Image URL or path
- `imageAlt` (optional): Alt text for accessibility
- `caption` (optional): Text below image

## 🖼️ Adding Images

You can add images in three ways:

### 1. Online Images (URLs)

```json
"image": "https://example.com/image.jpg"
```

### 2. Local Images (Relative Path)

Put your images in the same folder or a subfolder:

```
html-slides/
├── index.html
├── slides.json
├── images/
│   └── photo.jpg
```

Then reference it:

```json
"image": "images/photo.jpg"
```

### 3. Free Stock Photos

Use services like Unsplash:

```json
"image": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
```

## ⌨️ Keyboard Shortcuts

| Key     | Action                                |
| ------- | ------------------------------------- |
| `←` `→` | Navigate between slides               |
| `Space` | Next slide                            |
| `Home`  | Go to first slide                     |
| `End`   | Go to last slide                      |
| `O`     | Toggle overview mode (see all slides) |
| `F`     | Toggle fullscreen                     |
| `Esc`   | Exit fullscreen/overview              |
| `?`     | Show help overlay                     |

## 🖱️ Mouse/Touch Controls

- **Click** the arrow buttons on left/right
- **Click** the grid icon (top right) for overview
- **Click** the fullscreen icon (top right) for fullscreen mode
- **Swipe** left/right on mobile/tablet to navigate

## 📱 Overview Mode

Press `O` or click the grid icon to see all slides at once:

- See all your slides in a grid layout
- Click any slide to jump to it
- Current slide is highlighted
- Perfect for navigating during Q&A

## 🖨️ Print to PDF

To save your presentation as PDF:

1. Open your presentation in browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Select **"Save as PDF"** as the destination
4. Click **Save**

The presentation is automatically formatted for printing (one slide per page).

## 💡 Tips & Best Practices

### Content Tips

1. **Keep It Simple**: 5-7 bullet points maximum per slide
2. **Use Images**: Visual content is more engaging
3. **Short Text**: Avoid long paragraphs - use bullets instead
4. **Consistent Style**: Stick to a pattern throughout your presentation

### Design Tips

1. **Title Slide**: Always start with a title layout
2. **Section Headers**: Use title layouts to separate sections
3. **Mix Layouts**: Use different layouts to keep it interesting
4. **White Space**: Don't overcrowd slides - less is more

### Technical Tips

1. **Test First**: Always preview your presentation before the meeting
2. **Check Images**: Make sure all image URLs work
3. **Font Size**: Text is sized to be readable - don't worry about it
4. **Backup**: Keep a copy of `slides.json` before making major changes

## Example Slide Combinations

### Simple Presentation (5 slides)

```json
{
  "title": "Project Update",
  "slides": [
    { "layout": "title", "heading": "Project Update", "subheading": "Q4 2024" },
    {
      "layout": "content",
      "heading": "What We Achieved",
      "bullets": ["Goal 1", "Goal 2"]
    },
    {
      "layout": "two-column",
      "heading": "Progress",
      "leftHeading": "Done",
      "leftContent": ["Task A"],
      "rightHeading": "In Progress",
      "rightContent": ["Task B"]
    },
    {
      "layout": "content",
      "heading": "Next Steps",
      "bullets": ["Action 1", "Action 2"]
    },
    { "layout": "title", "heading": "Thank You", "subheading": "Questions?" }
  ]
}
```

### Image-Heavy Presentation

```json
{
  "slides": [
    { "layout": "title", "heading": "Photo Gallery" },
    { "layout": "image", "image": "photo1.jpg", "caption": "First photo" },
    { "layout": "image", "image": "photo2.jpg", "caption": "Second photo" },
    { "layout": "image", "image": "photo3.jpg", "caption": "Third photo" }
  ]
}
```

### Training/Tutorial Presentation

```json
{
  "slides": [
    { "layout": "title", "heading": "How to Use This Tool" },
    {
      "layout": "content",
      "heading": "Step 1",
      "numbered": ["Do this", "Then this"]
    },
    { "layout": "content", "heading": "Step 2", "numbered": ["Now do this"] },
    {
      "layout": "two-column",
      "heading": "Right vs Wrong",
      "leftHeading": "❌ Don't",
      "leftContent": ["Bad practice"],
      "rightHeading": "✅ Do",
      "rightContent": ["Good practice"]
    },
    { "layout": "title", "heading": "You're Ready!" }
  ]
}
```

## 🔧 Troubleshooting

### Presentation Won't Load

**Problem**: White screen or "Loading..." forever

**Solutions**:

1. Check that `slides.json` is in the same folder as `index.html`
2. Make sure `slides.json` has valid JSON syntax (check for missing commas, quotes)
3. Open browser console (F12) to see error messages

### Images Don't Show

**Problem**: Broken image icons or missing images

**Solutions**:

1. Check the image URL/path is correct
2. Make sure the image file exists in the specified location
3. For online images, verify the URL works in a new browser tab
4. Check for typos in the `"image"` field

### Syntax Errors in JSON

**Problem**: Error message about JSON format

**Solutions**:

1. Every opening `{` needs a closing `}`
2. Every opening `[` needs a closing `]`
3. Use commas between items (but NOT after the last item)
4. Wrap text in double quotes `"like this"`
5. Use a JSON validator: https://jsonlint.com

**Common mistakes:**

```json
// ❌ Wrong: Missing comma
{
  "heading": "Test"
  "text": "More text"
}

// ✅ Correct: Has comma
{
  "heading": "Test",
  "text": "More text"
}
```

```json
// ❌ Wrong: Comma after last item
{
  "slides": [
    {"heading": "Slide 1"},
    {"heading": "Slide 2"},  ← Remove this comma
  ]
}

// ✅ Correct: No comma after last item
{
  "slides": [
    {"heading": "Slide 1"},
    {"heading": "Slide 2"}
  ]
}
```

### Slides Look Wrong on Mobile

**Problem**: Text too small or cut off

**Solution**: The presentation is responsive and should work automatically. If issues persist:

1. Make sure you're using a modern browser
2. Try refreshing the page
3. Avoid extremely long words (they might not wrap)

## 🎨 Color Scheme

The presentation uses Microsoft Edge gradient colors:

- **Primary Blue**: #0078d4
- **Teal**: #00b7c3
- **Dark Blue**: #005a9e
- **Light Blue**: #50e6ff

These create a professional, modern look that's easy on the eyes.

## 📱 Mobile & Tablet Support

The presentation works great on all devices:

- **Desktop**: Full keyboard shortcuts, optimal text size
- **Tablet**: Touch-friendly buttons, swipe to navigate
- **Mobile**: Optimized for small screens, portrait/landscape modes

## 🌐 Browser Compatibility

Works in all modern browsers:

- ✅ Google Chrome (recommended)
- ✅ Microsoft Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**Note**: Internet Explorer is NOT supported.

## 📚 Advanced Usage

### Using Special Characters

You can use Unicode characters in your text:

```json
{
  "bullets": [
    "✅ Completed task",
    "⚠️ Warning note",
    "🎉 Exciting news",
    "→ Next step"
  ]
}
```

### Line Breaks in Text

For multiple paragraphs, use `\n`:

```json
{
  "text": "First paragraph.\n\nSecond paragraph."
}
```

### Escaping Quotes

If you need quotes in your text, use `\"`:

```json
{
  "text": "He said \"Hello\" to everyone."
}
```

## 🤝 Contributing & Customization

Want to customize the colors, fonts, or add features? You can edit:

- `styles.css` - All visual styling
- `slides.js` - Functionality and features
- `index.html` - Structure (rarely needed)

Remember to keep backups before making changes!

## 📄 License

This template is free to use for any purpose (personal or commercial).

## 🆘 Need Help?

1. Check this README first
2. Validate your JSON at https://jsonlint.com
3. Check browser console (F12) for error messages
4. Make sure all files are in the same folder

## You're Ready!

Now you know everything you need to create amazing presentations. Just:

1. Edit `slides.json`
2. Save
3. Refresh browser
4. Present! 🎤

**Happy presenting!**
