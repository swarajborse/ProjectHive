// Canvas setup
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// UI elements
const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');
const colorHex = document.getElementById('colorHex');
const lineWidthSlider = document.getElementById('lineWidth');
const widthDisplay = document.getElementById('widthDisplay');
const brushPreview = document.getElementById('brushPreview');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const presetColorsContainer = document.getElementById('presetColors');
const canvasOverlay = document.getElementById('canvasOverlay');
const strokeCount = document.getElementById('strokeCount');
const tipText = document.getElementById('tipText');

// Drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let strokes = 0;
let history = [];
let historyStep = -1;

// Preset colors
const presetColors = [
    '#ff6b9d', '#a8d8ea', '#ffd166', '#aa96da', '#fcbad3',
    '#95e1d3', '#f38181', '#ffb347', '#c5a3ff', '#90d5ff'
];

// Fun tips
const tips = [
    'Click and drag to create beautiful strokes! 🎨',
    'Try mixing different colors for amazing effects! 🌈',
    'Use smaller brush sizes for detailed work! ✏️',
    'Don\'t be afraid to experiment! 💫',
    'Every artist was first an amateur! 🌟',
    'Your creativity has no limits! ✨',
    'Art is not what you see, but what you make others see! 👁️',
    'Practice makes progress, not perfection! 💪'
];

// Initialize canvas
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff6b9d';

// Save initial state
function saveState() {
    historyStep++;
    if (historyStep < history.length) {
        history.length = historyStep;
    }
    history.push(canvas.toDataURL());
    updateUndoRedoButtons();
}

// Update undo/redo button states
function updateUndoRedoButtons() {
    undoBtn.disabled = historyStep <= 0;
    redoBtn.disabled = historyStep >= history.length - 1;
    
    if (undoBtn.disabled) {
        undoBtn.style.opacity = '0.5';
        undoBtn.style.cursor = 'not-allowed';
    } else {
        undoBtn.style.opacity = '1';
        undoBtn.style.cursor = 'pointer';
    }
    
    if (redoBtn.disabled) {
        redoBtn.style.opacity = '0.5';
        redoBtn.style.cursor = 'not-allowed';
    } else {
        redoBtn.style.opacity = '1';
        redoBtn.style.cursor = 'pointer';
    }
}

// Undo action
function undo() {
    if (historyStep > 0) {
        historyStep--;
        const img = new Image();
        img.src = history[historyStep];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            updateUndoRedoButtons();
        };
    }
}

// Redo action
function redo() {
    if (historyStep < history.length - 1) {
        historyStep++;
        const img = new Image();
        img.src = history[historyStep];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            updateUndoRedoButtons();
        };
    }
}

// Update stroke counter
function updateStrokeCount() {
    strokes++;
    strokeCount.innerHTML = `<span class="badge-icon">🎨</span>${strokes} stroke${strokes !== 1 ? 's' : ''}`;
}

// Create preset color buttons
function createPresetColors() {
    presetColors.forEach(color => {
        const colorBtn = document.createElement('div');
        colorBtn.className = 'preset-color';
        colorBtn.style.backgroundColor = color;
        colorBtn.title = color;
        colorBtn.addEventListener('click', () => {
            colorPicker.value = color;
            ctx.strokeStyle = color;
            updateColorPreview(color);
        });
        presetColorsContainer.appendChild(colorBtn);
    });
}

// Update color preview and hex display
function updateColorPreview(color) {
    colorPreview.style.backgroundColor = color;
    colorHex.textContent = color.toUpperCase();
    updateBrushPreview();
}

// Update brush preview
function updateBrushPreview() {
    const existingCircle = brushPreview.querySelector('.brush-preview-circle');
    if (existingCircle) {
        existingCircle.remove();
    }
    
    const circle = document.createElement('div');
    circle.className = 'brush-preview-circle';
    const size = Math.min(ctx.lineWidth * 1.5, 60);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.backgroundColor = ctx.strokeStyle;
    brushPreview.appendChild(circle);
}

// Get mouse position relative to canvas
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// Get touch position relative to canvas
function getTouchPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touch = e.touches[0];
    
    return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
    };
}

// Start drawing
function startDrawing(pos) {
    isDrawing = true;
    lastX = pos.x;
    lastY = pos.y;
    
    // Hide welcome overlay on first draw
    if (canvasOverlay && !canvasOverlay.classList.contains('hidden')) {
        canvasOverlay.classList.add('hidden');
        setTimeout(() => {
            canvasOverlay.style.display = 'none';
        }, 500);
    }
}

// Draw line
function draw(pos) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    lastX = pos.x;
    lastY = pos.y;
}

// Stop drawing
function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        updateStrokeCount();
        saveState();
    }
}

// Mouse events
canvas.addEventListener('mousedown', (e) => {
    const pos = getMousePos(e);
    startDrawing(pos);
});

canvas.addEventListener('mousemove', (e) => {
    const pos = getMousePos(e);
    draw(pos);
});

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const pos = getTouchPos(e);
    startDrawing(pos);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const pos = getTouchPos(e);
    draw(pos);
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopDrawing();
});

// Color picker change
colorPicker.addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
    updateColorPreview(e.target.value);
});

// Line width change
lineWidthSlider.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
    widthDisplay.textContent = e.target.value;
    updateBrushPreview();
});

// Clear canvas
clearBtn.addEventListener('click', () => {
    if (strokes === 0) {
        return;
    }
    
    if (confirm('Are you sure you want to clear the canvas? 🎨')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes = 0;
        strokeCount.innerHTML = '<span class="badge-icon">🎨</span>0 strokes';
        saveState();
        
        // Show welcome overlay again
        if (canvasOverlay) {
            canvasOverlay.style.display = 'flex';
            setTimeout(() => {
                canvasOverlay.classList.remove('hidden');
            }, 10);
        }
    }
});

// Download drawing
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    link.download = `kawaii-drawing-${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Show success message
    const originalText = downloadBtn.querySelector('.btn-text').textContent;
    downloadBtn.querySelector('.btn-text').textContent = 'Saved! ✓';
    setTimeout(() => {
        downloadBtn.querySelector('.btn-text').textContent = originalText;
    }, 2000);
});

// Undo button
undoBtn.addEventListener('click', undo);

// Redo button
redoBtn.addEventListener('click', redo);

// Rotate tips periodically
function rotateTips() {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipText.style.opacity = '0';
    setTimeout(() => {
        tipText.textContent = randomTip;
        tipText.style.opacity = '1';
    }, 300);
}

// Initialize
createPresetColors();
updateColorPreview(ctx.strokeStyle);
updateBrushPreview();
saveState(); // Save initial blank state
updateUndoRedoButtons();

// Add smooth fade-in animation on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 10);
    
    // Start rotating tips
    setInterval(rotateTips, 8000);
});

// Add transition to tip text
tipText.style.transition = 'opacity 0.3s ease';

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Z for undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }
    
    // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
    if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
        e.preventDefault();
        redo();
    }
    
    // Delete or Backspace to clear (with confirmation)
    if ((e.key === 'Delete' || e.key === 'Backspace') && e.target === document.body) {
        e.preventDefault();
        clearBtn.click();
    }
});

console.log('🎨 Kawaii Drawing Studio loaded successfully!');
console.log('💡 Keyboard shortcuts:');
console.log('   - Ctrl/Cmd + Z: Undo');
console.log('   - Ctrl/Cmd + Shift + Z: Redo');
console.log('   - Delete: Clear canvas');