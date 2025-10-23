# 🎵 Music Visualizer

**Contributer:** shr128 
**Domain:** Frontend  
**Difficulty:** Intermediate  
**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), Web Audio API, Canvas API

---

<p align="center">
  <img src="https://via.placeholder.com/1000x500/667eea/ffffff?text=Music+Visualizer+Screenshot" alt="Music Visualizer Screenshot" width="100%"/>
</p>

---

## 📝 Description

An **interactive Music Visualizer** that transforms audio into stunning real-time visual animations. Upload your favorite songs or generate test tones to see audio frequencies come to life with multiple visualization modes.

Features dynamic frequency analysis using the Web Audio API and Canvas rendering for smooth, responsive animations. Perfect for learning audio processing, canvas manipulation, and creating engaging user experiences!

---

## 🎯 Features

* 🎵 **Audio File Upload** - Support for MP3, WAV, and other audio formats
* 🎹 **Tone Generator** - Built-in 440Hz tone for testing
* 🎨 **4 Visualization Modes:**
  * **Bars** - Classic frequency bars with rainbow colors
  * **Wave** - Flowing waveform animation
  * **Circular** - Radial spectrum analyzer
  * **Spectrum** - Gradient frequency display
* ⚡ **Real-time Audio Analysis** - Live frequency data processing
* 🎮 **Playback Controls** - Play, pause, and restart audio
* ✨ **Animated Background** - Floating particle effects
* 🌈 **Dynamic Gradients** - Smooth color transitions
* 📱 **Fully Responsive** - Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

* **HTML5** - Semantic structure with Canvas element
* **CSS3** - Modern UI with gradients, glassmorphism, and animations
* **JavaScript (ES6+)** - Audio processing and visualization logic
* **Web Audio API** - Audio context, analyser nodes, and frequency data
* **Canvas API** - Real-time graphics rendering

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone the repository
2. Open `index.html` in your browser
3. Click "Choose Audio File" to upload a song or "Generate Tone" to test
4. Select a visualization mode and enjoy!

### Method 2: Live Server (Recommended)

1. Install VS Code and the Live Server extension
2. Right-click `index.html` → **Open with Live Server**
3. The app will open at `http://localhost:5500`

### Method 3: Local Server

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

---

## 📁 Project Structure

```
MusicVisualizer/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Visualization logic and audio processing
└── README.md           # Project documentation
```

---

## 💻 Code Highlights

### Audio Context Setup

```javascript
function setupAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
}
```

### Real-time Frequency Analysis

```javascript
function visualize() {
    animationId = requestAnimationFrame(visualize);
    analyser.getByteFrequencyData(dataArray);
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(26, 26, 46, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw visualization based on selected mode
    if (currentMode === 'bars') drawBars();
}
```

### Circular Visualization

```javascript
function drawCircular() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    
    for (let i = 0; i < bufferLength; i++) {
        const angle = (i / bufferLength) * Math.PI * 2;
        const barHeight = (dataArray[i] / 255) * 100;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);
        
        ctx.strokeStyle = `hsl(${(i / bufferLength) * 360}, 100%, 60%)`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}
```

### Tone Generator

```javascript
generateToneBtn.addEventListener('click', () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2000);
});
```

---

## 📚 Learning Outcomes

### Skills Practiced

* ✅ Web Audio API implementation
* ✅ Canvas 2D rendering and animation
* ✅ Real-time data visualization
* ✅ Event-driven programming
* ✅ DOM manipulation and file handling
* ✅ Responsive design principles
* ✅ CSS animations and gradients

### Concepts Learned

* Audio frequency analysis and FFT (Fast Fourier Transform)
* RequestAnimationFrame for smooth animations
* Creating audio oscillators and gain nodes
* Canvas drawing techniques (bars, waves, circles)
* Glassmorphism and modern UI design
* Audio context lifecycle management

---

## 🎨 Customization Ideas

1. **Additional Visualization Modes**
   * Waveform with glow effects
   * 3D particle system
   * Spiral pattern
   * Mandala-style visualization

2. **Audio Controls**
   * Volume slider
   * Playback speed control
   * Loop functionality
   * Playlist support

3. **Visual Enhancements**
   * Color theme selector
   * Custom gradient builder
   * Fullscreen mode
   * Screen recording feature

4. **Advanced Features**
   * Beat detection and rhythm analysis
   * Equalizer with frequency bands
   * Save visualization as GIF/Video
   * Microphone input for live audio

5. **UI Improvements**
   * Dark/Light mode toggle
   * Keyboard shortcuts
   * Drag-and-drop file upload
   * Audio file metadata display

---

## 🐛 Known Issues

* Some browsers may require user interaction before playing audio
* Large audio files may take time to load
* Safari may have limited Web Audio API support

### Solutions:
* Ensure user clicks a button before initializing audio context
* Add loading indicators for file processing
* Test across multiple browsers for compatibility

---

## 🚀 Future Enhancements

* [ ] Add microphone input support
* [ ] Implement beat detection
* [ ] Create playlist functionality
* [ ] Add export visualization as video
* [ ] Include preset visual themes
* [ ] Add audio effects (reverb, delay, etc.)
* [ ] Implement WebGL for 3D visualizations
* [ ] Add sharing capabilities
* [ ] Create mobile app version

---

## 🌐 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ⚠️ Partial (some audio API limitations) |
| Edge    | ✅ Full |
| Opera   | ✅ Full |

---

## 📖 Resources

* [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [Canvas API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [AnalyserNode Reference](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)

---

## 📄 License

MIT License — Free to use, modify, and share!

---

## 🤝 Contributing

This project is open for contributions!  
Feel free to:

* Fork and improve the visualizations
* Report bugs or issues
* Add new visualization modes
* Enhance UI/UX design
* Submit pull requests

---

## 👨‍💻 Author

Created with 🎵 and ❤️ for music and code enthusiasts!

---

**Enjoy the Rhythm! 🎵🔥**