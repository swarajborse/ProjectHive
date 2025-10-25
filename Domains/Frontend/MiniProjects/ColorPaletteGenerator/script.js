// Color Palette Generator - Main JavaScript
// Configuration
const PALETTE_SIZE = 5;
const LOCAL_STORAGE_KEY = 'colorPalettes';

// State
let currentPalette = [];
let lockedColors = new Set();
let savedPalettes = [];

// DOM Elements
const paletteContainer = document.getElementById('paletteContainer');
const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');
const savedPalettesContainer = document.getElementById('savedPalettes');
const savedCount = document.getElementById('savedCount');
const exportModal = document.getElementById('exportModal');
const closeModal = document.getElementById('closeModal');
const exportPreview = document.getElementById('exportPreview');
const copyExport = document.getElementById('copyExport');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedPalettes();
    generatePalette();
    attachEventListeners();
});

// Generate Random Color
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Generate Palette
function generatePalette() {
    currentPalette = [];
    
    for (let i = 0; i < PALETTE_SIZE; i++) {
        if (lockedColors.has(i)) {
            // Keep locked color
            const existingBox = paletteContainer.children[i];
            const lockedColor = existingBox.style.backgroundColor;
            currentPalette.push(rgbToHex(lockedColor));
        } else {
            // Generate new color
            currentPalette.push(generateRandomColor());
        }
    }
    
    renderPalette();
}

// Render Palette
function renderPalette() {
    paletteContainer.innerHTML = '';
    
    currentPalette.forEach((color, index) => {
        const colorBox = createColorBox(color, index);
        paletteContainer.appendChild(colorBox);
    });
}

// Create Color Box Element
function createColorBox(color, index) {
    const box = document.createElement('div');
    box.className = 'color-box';
    if (lockedColors.has(index)) {
        box.classList.add('locked');
    }
    box.style.backgroundColor = color;
    
    // Lock Button
    const lockBtn = document.createElement('button');
    lockBtn.className = 'lock-btn';
    lockBtn.innerHTML = lockedColors.has(index) ? '🔒' : '🔓';
    lockBtn.setAttribute('aria-label', lockedColors.has(index) ? 'Unlock color' : 'Lock color');
    lockBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLock(index);
    });
    
    // Info Overlay
    const overlay = document.createElement('div');
    overlay.className = 'color-info-overlay';
    
    const colorCode = document.createElement('div');
    colorCode.className = 'color-code';
    colorCode.textContent = color.toUpperCase();
    
    const actions = document.createElement('div');
    actions.className = 'color-actions';
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'action-btn';
    copyBtn.textContent = '📋 Copy';
    copyBtn.addEventListener('click', () => copyToClipboard(color));
    
    const adjustBtn = document.createElement('button');
    adjustBtn.className = 'action-btn';
    adjustBtn.textContent = '🎨 Adjust';
    adjustBtn.addEventListener('click', () => showColorInfo(color));
    
    actions.appendChild(copyBtn);
    actions.appendChild(adjustBtn);
    overlay.appendChild(colorCode);
    overlay.appendChild(actions);
    
    box.appendChild(lockBtn);
    box.appendChild(overlay);
    
    // Click to show info
    box.addEventListener('click', () => showColorInfo(color));
    
    return box;
}

// Toggle Lock
function toggleLock(index) {
    if (lockedColors.has(index)) {
        lockedColors.delete(index);
    } else {
        lockedColors.add(index);
    }
    renderPalette();
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${text} to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy color', 'error');
    });
}

// Show Toast Notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.style.backgroundColor = type === 'error' ? '#ef4444' : '#10b981';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Show Color Information
function showColorInfo(hexColor) {
    hexValue.textContent = hexColor.toUpperCase();
    rgbValue.textContent = hexToRgb(hexColor);
    hslValue.textContent = hexToHsl(hexColor);
}

// Color Conversion Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 'Invalid';
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    
    const [r, g, b] = result.map(Number);
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function hexToHsl(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 'Invalid';
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Save Palette
function savePalette() {
    const palette = {
        id: Date.now(),
        colors: [...currentPalette],
        timestamp: new Date().toISOString()
    };
    
    savedPalettes.unshift(palette);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedPalettes));
    
    renderSavedPalettes();
    showToast('Palette saved successfully!');
}

// Load Saved Palettes
function loadSavedPalettes() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
        savedPalettes = JSON.parse(stored);
        renderSavedPalettes();
    }
}

// Render Saved Palettes
function renderSavedPalettes() {
    savedCount.textContent = `(${savedPalettes.length})`;
    
    if (savedPalettes.length === 0) {
        savedPalettesContainer.innerHTML = '<p class="no-saved">No saved palettes yet. Save your favorite combinations!</p>';
        return;
    }
    
    savedPalettesContainer.innerHTML = '';
    
    savedPalettes.forEach(palette => {
        const paletteCard = createSavedPaletteCard(palette);
        savedPalettesContainer.appendChild(paletteCard);
    });
}

// Create Saved Palette Card
function createSavedPaletteCard(palette) {
    const card = document.createElement('div');
    card.className = 'saved-palette';
    
    const colors = document.createElement('div');
    colors.className = 'saved-palette-colors';
    
    palette.colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'saved-color';
        colorDiv.style.backgroundColor = color;
        colorDiv.title = color;
        colorDiv.addEventListener('click', () => copyToClipboard(color));
        colors.appendChild(colorDiv);
    });
    
    const actions = document.createElement('div');
    actions.className = 'saved-palette-actions';
    
    const loadBtn = document.createElement('button');
    loadBtn.className = 'load-btn';
    loadBtn.textContent = '↻ Load';
    loadBtn.addEventListener('click', () => loadPalette(palette));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.addEventListener('click', () => deletePalette(palette.id));
    
    actions.appendChild(loadBtn);
    actions.appendChild(deleteBtn);
    
    card.appendChild(colors);
    card.appendChild(actions);
    
    return card;
}

// Load Palette
function loadPalette(palette) {
    currentPalette = [...palette.colors];
    lockedColors.clear();
    renderPalette();
    showToast('Palette loaded!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete Palette
function deletePalette(id) {
    savedPalettes = savedPalettes.filter(p => p.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedPalettes));
    renderSavedPalettes();
    showToast('Palette deleted');
}

// Clear All Saved Palettes
function clearAllPalettes() {
    if (savedPalettes.length === 0) {
        showToast('No saved palettes to clear', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete all saved palettes?')) {
        savedPalettes = [];
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        renderSavedPalettes();
        showToast('All palettes cleared');
    }
}

// Export Functions
function exportAsCSS() {
    let css = '/* Color Palette - Generated by Color Palette Generator */\n:root {\n';
    currentPalette.forEach((color, index) => {
        css += `  --color-${index + 1}: ${color};\n`;
    });
    css += '}\n';
    return css;
}

function exportAsJSON() {
    const json = {
        palette: currentPalette,
        timestamp: new Date().toISOString()
    };
    return JSON.stringify(json, null, 2);
}

function exportAsSCSS() {
    let scss = '// Color Palette - Generated by Color Palette Generator\n';
    currentPalette.forEach((color, index) => {
        scss += `$color-${index + 1}: ${color};\n`;
    });
    return scss;
}

// Show Export Modal
function showExportModal() {
    exportModal.classList.add('active');
    // Show CSS by default
    const cssCode = exportAsCSS();
    exportPreview.querySelector('code').textContent = cssCode;
}

// Event Listeners
function attachEventListeners() {
    generateBtn.addEventListener('click', generatePalette);
    saveBtn.addEventListener('click', savePalette);
    exportBtn.addEventListener('click', showExportModal);
    clearBtn.addEventListener('click', clearAllPalettes);
    
    closeModal.addEventListener('click', () => {
        exportModal.classList.remove('active');
    });
    
    exportModal.addEventListener('click', (e) => {
        if (e.target === exportModal) {
            exportModal.classList.remove('active');
        }
    });
    
    // Export format buttons
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.dataset.format;
            let code;
            
            switch (format) {
                case 'css':
                    code = exportAsCSS();
                    break;
                case 'json':
                    code = exportAsJSON();
                    break;
                case 'scss':
                    code = exportAsSCSS();
                    break;
            }
            
            exportPreview.querySelector('code').textContent = code;
        });
    });
    
    copyExport.addEventListener('click', () => {
        const code = exportPreview.querySelector('code').textContent;
        copyToClipboard(code);
    });
    
    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Ignore if user is typing in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (e.key.toLowerCase()) {
            case ' ':
                e.preventDefault();
                generatePalette();
                break;
            case 's':
                e.preventDefault();
                savePalette();
                break;
            case 'e':
                e.preventDefault();
                showExportModal();
                break;
            case 'c':
                e.preventDefault();
                if (currentPalette.length > 0) {
                    copyToClipboard(currentPalette[0]);
                }
                break;
            case 'escape':
                exportModal.classList.remove('active');
                break;
        }
    });
}

// Utility: Check Color Contrast (for accessibility)
function getContrast(hexColor) {
    const rgb = hexToRgb(hexColor).match(/\d+/g).map(Number);
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    return luminance > 0.5 ? 'dark' : 'light';
}

// Generate Complementary Colors (Advanced Feature)
function generateComplementaryPalette(baseColor) {
    // This can be extended for color theory-based palette generation
    // Currently uses random generation
    generatePalette();
}

// Initialize color info with first color
setTimeout(() => {
    if (currentPalette.length > 0) {
        showColorInfo(currentPalette[0]);
    }
}, 100);
