# 🏁 Typing Speed Race Game

**Contributor:** Soham-Gadekar
**Domain:** Frontend
**Difficulty:** Intermediate
**Tech Stack:** HTML, CSS, JavaScript (ES6+), LocalStorage API

---

<img width="1000" height="1000" alt="Screenshot 2025-10-21 130826" src="https://github.com/user-attachments/assets/beadfe3c-87c5-442f-a300-15bc68fec7a5" />

---

## 📝 Description

A fun and interactive **Typing Speed Race Game** that challenges players to type as fast and accurately as possible.
The app displays random paragraphs and measures typing speed (WPM), accuracy, and time taken.
It also features a **ghost racer** based on your best WPM for an extra challenge!

Perfect for improving typing speed and practicing JavaScript DOM manipulation, event handling, and local storage integration.

---

## 🎯 Features

* 🖋️ Random paragraph generation
* ⚡ Real-time WPM (Words Per Minute) and accuracy tracking
* 🎮 Ghost racer feature (race against your previous best speed)
* 🧠 LocalStorage for best score persistence
* 🕒 Live timer display
* 🧹 Reset and restart functionality
* 📊 Progress bars for player and ghost
* 💥 Animated result modal with “New Record” badge
* 📱 Fully responsive design

---

## 🛠️ Tech Stack

* **HTML5** - Semantic structure
* **CSS3** - Responsive and modern UI
* **JavaScript (ES6+)** - Game logic, DOM updates
* **LocalStorage API** - Store best WPM

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone the repository
2. Open `index.html` in your browser
3. Click “Start Race” and begin typing!

### Method 2: Live Server (Recommended)

1. Install VS Code and Live Server extension
2. Right-click `index.html` → **Open with Live Server**
3. The app will open at `http://localhost:5500`

---

## 📁 Project Structure

```
TypingRace/
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── script.js           # Game logic
└── README.md           # Project documentation
```

---

## 💻 Code Highlights

### Random Paragraph Selection

```javascript
currentText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
displayText();
```

### Ghost Racer Logic

```javascript
const charsPerSecond = (bestWpm * 5) / 60;
ghostInterval = setInterval(() => {
    const elapsed = (Date.now() - ghostStartTime) / 1000;
    const ghostChars = Math.floor(charsPerSecond * elapsed);
    const ghostProgressPercent = Math.min((ghostChars / textLength) * 100, 100);
    ghostProgress.style.width = ghostProgressPercent + '%';
}, 100);
```

### LocalStorage Integration

```javascript
if (wpm > bestWpm) {
    bestWpm = wpm;
    localStorage.setItem('typingRaceBestWpm', wpm);
}
```

---

## 📚 Learning Outcomes

### Skills Practiced

* ✅ DOM Manipulation
* ✅ Real-time event handling
* ✅ JavaScript timing functions
* ✅ Dynamic progress visualization
* ✅ LocalStorage API usage
* ✅ Responsive UI design

### Concepts Learned

* Handling and visualizing live data
* Optimizing UI updates
* Persisting user data in browser
* Building mini-games with pure JavaScript

---

## 🎨 Customization Ideas

1. **Dark/Light Theme Toggle**
2. **Leaderboard** - Global or local high scores
3. **Multiple Difficulty Levels**
4. **Sound Effects** for typing and completion
5. **Multiplayer Mode** (Socket.io or Firebase)
6. **Animated Ghost Character**
7. **Typing Error Highlighting with Suggestions**
8. **Countdown Timer before start**

---

## 🐛 Known Issues

* None currently.
* If the progress bar desyncs, refresh the page.

---

## 🚀 Future Enhancements

* [ ] Add difficulty modes
* [ ] Include typing statistics history
* [ ] Introduce multiplayer ghost race
* [ ] Add customizable typing texts
* [ ] Enhance animations and UI polish

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

**Happy Typing! ⌨️🔥**
