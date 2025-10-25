// DOM Elements
const markdownInput = document.getElementById("markdownInput");
const markdownPreview = document.getElementById("markdownPreview");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const themeToggle = document.getElementById("themeToggle");
const toolButtons = document.querySelectorAll(".tool-btn");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const lineCount = document.getElementById("lineCount");
const helpBtn = document.getElementById("helpBtn");
const cheatSheetModal = document.getElementById("cheatSheetModal");
const modalClose = document.getElementById("modalClose");
const toast = document.getElementById("toast");
const toggleView = document.getElementById("toggleView");
const divider = document.getElementById("divider");
const editorPanel = document.querySelector(".editor-panel");
const previewPanel = document.querySelector(".preview-panel");

// State
let isDarkMode = localStorage.getItem("darkMode") === "true";
let isResizing = false;
let isMobileView = "editor"; // 'editor' or 'preview'

// Initialize
init();

function init() {
  // Set initial theme
  if (isDarkMode) {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }

  // Load saved content
  const savedContent = localStorage.getItem("markdownContent");
  if (savedContent) {
    markdownInput.value = savedContent;
  }

  // Initial render
  updatePreview();
  updateStats();

  // Setup event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Input events
  markdownInput.addEventListener("input", () => {
    updatePreview();
    updateStats();
    saveContent();
  });

  // Keyboard shortcuts
  markdownInput.addEventListener("keydown", handleKeyboardShortcuts);

  // Toolbar buttons
  toolButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      insertMarkdown(btn.dataset.markdown);
    });
  });

  // Header buttons
  clearBtn.addEventListener("click", clearEditor);
  copyBtn.addEventListener("click", copyHTML);
  downloadBtn.addEventListener("click", downloadMarkdown);
  themeToggle.addEventListener("click", toggleTheme);

  // Help modal
  helpBtn.addEventListener("click", () =>
    cheatSheetModal.classList.remove("hidden")
  );
  modalClose.addEventListener("click", () =>
    cheatSheetModal.classList.add("hidden")
  );
  cheatSheetModal
    .querySelector(".modal-overlay")
    .addEventListener("click", () => {
      cheatSheetModal.classList.add("hidden");
    });

  // Toggle view (mobile)
  toggleView.addEventListener("click", toggleMobileView);

  // Resizable divider
  divider.addEventListener("mousedown", startResize);
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
}

function updatePreview() {
  const markdown = markdownInput.value;
  const html = parseMarkdown(markdown);
  markdownPreview.innerHTML = html;
}

function parseMarkdown(markdown) {
  let html = markdown;

  // Escape HTML
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headers (must be done before other formatting)
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Code blocks (before inline code)
  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );

  // Blockquotes
  html = html.replace(/^&gt;\s+(.+)$/gm, "<blockquote>$1</blockquote>");

  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr>");
  html = html.replace(/^\*\*\*$/gm, "<hr>");
  html = html.replace(/^___$/gm, "<hr>");

  // Lists
  const lines = html.split("\n");
  let inList = false;
  let listType = "";
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Ordered list
    if (/^\d+\.\s+(.+)$/.test(line)) {
      if (!inList || listType !== "ol") {
        if (inList) result.push(`</${listType}>`);
        result.push("<ol>");
        inList = true;
        listType = "ol";
      }
      result.push(line.replace(/^\d+\.\s+(.+)$/, "<li>$1</li>"));
    }
    // Unordered list
    else if (/^[\*\-]\s+(.+)$/.test(line)) {
      if (!inList || listType !== "ul") {
        if (inList) result.push(`</${listType}>`);
        result.push("<ul>");
        inList = true;
        listType = "ul";
      }
      result.push(line.replace(/^[\*\-]\s+(.+)$/, "<li>$1</li>"));
    } else {
      if (inList) {
        result.push(`</${listType}>`);
        inList = false;
      }
      result.push(line);
    }
  }

  if (inList) {
    result.push(`</${listType}>`);
  }

  html = result.join("\n");

  // Paragraphs
  html = html
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (block.match(/^<(h[1-6]|ul|ol|blockquote|pre|hr|li)/)) {
        return block;
      }
      return `<p>${block}</p>`;
    })
    .join("\n");

  // Line breaks
  html = html.replace(/\n/g, "<br>");

  return html;
}

function updateStats() {
  const text = markdownInput.value;

  // Character count
  charCount.textContent = `${text.length} characters`;

  // Word count
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  wordCount.textContent = `${words.length} words`;

  // Line count
  const lines = text.split("\n").length;
  lineCount.textContent = `${lines} lines`;
}

function insertMarkdown(markdown) {
  const start = markdownInput.selectionStart;
  const end = markdownInput.selectionEnd;
  const text = markdownInput.value;
  const selectedText = text.substring(start, end);

  let newText;
  let cursorPos;

  // Handle different markdown types
  if (markdown.includes("**") || markdown.includes("*")) {
    if (selectedText) {
      newText = markdown.replace(/\*+([^*]+)\*+/, selectedText);
      cursorPos = start + newText.length;
    } else {
      newText = markdown;
      cursorPos = start + markdown.indexOf("*") + 1;
    }
  } else if (markdown.includes("[Link]")) {
    newText = selectedText ? `[${selectedText}](url)` : markdown;
    cursorPos = start + newText.length - 4;
  } else if (markdown.includes("![")) {
    newText = markdown;
    cursorPos = start + newText.length - 1;
  } else if (markdown.includes("`")) {
    newText = selectedText ? `\`${selectedText}\`` : markdown;
    cursorPos = start + newText.length - 1;
  } else {
    newText = markdown;
    cursorPos = start + newText.length;
  }

  // Insert new text
  markdownInput.value =
    text.substring(0, start) + newText + text.substring(end);

  // Set cursor position
  markdownInput.focus();
  markdownInput.setSelectionRange(cursorPos, cursorPos);

  updatePreview();
  updateStats();
  saveContent();
}

function handleKeyboardShortcuts(e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key.toLowerCase()) {
      case "b":
        e.preventDefault();
        insertMarkdown("**Bold**");
        break;
      case "i":
        e.preventDefault();
        insertMarkdown("*Italic*");
        break;
      case "s":
        e.preventDefault();
        saveContent();
        showToast("Content saved!");
        break;
    }
  }

  // Tab key for indentation
  if (e.key === "Tab") {
    e.preventDefault();
    const start = markdownInput.selectionStart;
    const end = markdownInput.selectionEnd;
    markdownInput.value =
      markdownInput.value.substring(0, start) +
      "    " +
      markdownInput.value.substring(end);
    markdownInput.selectionStart = markdownInput.selectionEnd = start + 4;
  }
}

function clearEditor() {
  if (confirm("Are you sure you want to clear all content?")) {
    markdownInput.value = "";
    updatePreview();
    updateStats();
    saveContent();
    showToast("Content cleared!");
  }
}

function copyHTML() {
  const html = markdownPreview.innerHTML;

  navigator.clipboard
    .writeText(html)
    .then(() => {
      showToast("HTML copied to clipboard!");
    })
    .catch((err) => {
      showToast("Failed to copy HTML");
    });
}

function downloadMarkdown() {
  const content = markdownInput.value;
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "document.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Markdown downloaded!");
}

function toggleTheme() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }

  localStorage.setItem("darkMode", isDarkMode);
  showToast(`${isDarkMode ? "Dark" : "Light"} mode activated!`);
}

function toggleMobileView() {
  if (window.innerWidth <= 1024) {
    if (isMobileView === "editor") {
      editorPanel.classList.add("hidden-mobile");
      previewPanel.classList.add("active");
      isMobileView = "preview";
      toggleView.textContent = "✍️ Editor";
    } else {
      editorPanel.classList.remove("hidden-mobile");
      previewPanel.classList.remove("active");
      isMobileView = "editor";
      toggleView.textContent = "👁️ Preview";
    }
  }
}

function startResize(e) {
  isResizing = true;
  document.body.style.cursor = "col-resize";
}

function resize(e) {
  if (!isResizing) return;

  const container = document.querySelector(".main-container");
  const containerRect = container.getBoundingClientRect();
  const offsetX = e.clientX - containerRect.left;
  const percentage = (offsetX / containerRect.width) * 100;

  if (percentage > 20 && percentage < 80) {
    editorPanel.style.flex = `0 0 ${percentage}%`;
    previewPanel.style.flex = `0 0 ${100 - percentage - 1}%`;
  }
}

function stopResize() {
  isResizing = false;
  document.body.style.cursor = "default";
}

function saveContent() {
  localStorage.setItem("markdownContent", markdownInput.value);
}

function showToast(message) {
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    editorPanel.classList.remove("hidden-mobile");
    previewPanel.classList.remove("active");
    isMobileView = "editor";
    toggleView.textContent = "📱 Toggle View";
  }
});
