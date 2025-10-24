# 📝 Markdown Live Previewer

**Contributor:** shr128  
**Domain:** Frontend  
**Difficulty:** Intermediate  
**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), LocalStorage API

---

<img width="1000" height="500" alt="Markdown Previewer Screenshot" src="https://via.placeholder.com/1000x500/2563eb/ffffff?text=Markdown+Previewer" />

---

## 📝 Description

A powerful and feature-rich **Markdown Live Previewer** that renders markdown syntax in real-time with a split-pane interface.
The app provides an intuitive editor with toolbar shortcuts, live preview, dark/light theme toggle, and export functionality.
It features a **resizable split view**, keyboard shortcuts, cheat sheet modal, and persistent content storage!

Perfect for content creators, developers writing documentation, and learning JavaScript DOM manipulation, text parsing, and building professional text editors.

---

## 🎯 Features

* ✍️ Real-time markdown parsing and preview
* 🎨 Split-pane editor with resizable divider
* 🛠️ Quick-insert toolbar for common markdown syntax
* 📊 Live statistics (character, word, and line count)
* 🌓 Dark/Light theme toggle with persistence
* ⌨️ Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+S)
* 💾 Auto-save to LocalStorage
* 📋 Copy rendered HTML to clipboard
* 💾 Download markdown as .md file
* 📚 Built-in markdown cheat sheet modal
* 📱 Fully responsive design with mobile toggle view
* 🎯 Support for headers, lists, code blocks, links, images, and more

---

## 🛠️ Tech Stack

* **HTML5** - Semantic structure
* **CSS3** - Modern UI with CSS Grid, gradients, and animations
* **JavaScript (ES6+)** - Markdown parser, DOM manipulation
* **LocalStorage API** - Persistent content and theme storage

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone the repository
2. Open `index.html` in your browser
3. Start writing markdown and see it rendered instantly!

### Method 2: Live Server (Recommended)

1. Install VS Code and Live Server extension
2. Right-click `index.html` → **Open with Live Server**
3. The app will open at `http://localhost:5500`

---

## 📁 Project Structure

```
MarkdownPreviewer/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # Markdown parser and app logic
└── README.md           # Project documentation
```

---

## 💻 Code Highlights

### Markdown Parser Function

```javascript
function parseMarkdown(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
    
    // Bold and Italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    return html;
}
```

### Real-time Preview Update

```javascript
markdownInput.addEventListener('input', () => {
    updatePreview();
    updateStats();
    saveContent();
});

function updatePreview() {
    const markdown = markdownInput.value;
    const html = parseMarkdown(markdown);
    markdownPreview.innerHTML = html;
}
```

### LocalStorage Integration

```javascript
function saveContent() {
    localStorage.setItem('markdownContent', markdownInput.value);
}

function loadContent() {
    const savedContent = localStorage.getItem('markdownContent');
    if (savedContent) {
        markdownInput.value = savedContent;
    }
}
```

### Keyboard Shortcuts

```javascript
function handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
            case 'b':
                e.preventDefault();
                insertMarkdown('**Bold**');
                break;
            case 'i':
                e.preventDefault();
                insertMarkdown('*Italic*');
                break;
        }
    }
}
```

---

## 📚 Learning Outcomes

### Skills Practiced

* ✅ Advanced DOM manipulation
* ✅ Regular expressions for text parsing
* ✅ Real-time data processing
* ✅ LocalStorage API implementation
* ✅ Keyboard event handling
* ✅ CSS Grid and Flexbox layouts
* ✅ Theme switching and persistence
* ✅ Clipboard API usage

### Concepts Learned

* Building text editors with live preview
* Parsing and rendering markdown syntax
* Implementing resizable panels
* Creating keyboard shortcuts
* Managing application state
* Designing split-pane interfaces
* Handling file downloads with Blob API

---

## 🎨 Customization Ideas

1. **Syntax Highlighting** for code blocks (using Prism.js or Highlight.js)
2. **Export to PDF** functionality
3. **Markdown Templates** library
4. **Collaborative Editing** with WebSockets
5. **Auto-save to Cloud** (Firebase, Dropbox)
6. **Version History** feature
7. **Full-Screen Mode** for distraction-free writing
8. **Word Processor Features** (font selection, text alignment)
9. **Emoji Picker** integration
10. **Table Generator** modal

---

## 🐛 Known Issues

* None currently.
* Complex nested markdown may require parser improvements.

---

## 🚀 Future Enhancements

* [ ] Add syntax highlighting for code blocks
* [ ] Implement PDF export functionality
* [ ] Create markdown template library
* [ ] Add full-screen distraction-free mode
* [ ] Include table generator tool
* [ ] Add emoji picker
* [ ] Implement version history
* [ ] Enable collaborative editing

---

## 📄 License

MIT License — Free to use, modify, and share!

---

## 🤝 Contributing

This project is open for contributions!  
Feel free to:

* Fork and improve
* Report issues
* Add new features
* Submit pull requests

---

**Write Beautiful Markdown! 📝🔥**