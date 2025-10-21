# ✅ Todo App

**Contributor:** Dhiraj201226
**Domain:** Frontend  
**Difficulty:** Beginner  
**Tech Stack:** HTML, CSS, JavaScript

---

## 📝 Description
 
This is a sleek and interactive web game where you can play the classic Rock, Paper, Scissors against the computer.

The page has a modern dark theme and features large, satisfying emoji buttons (🪨, 📄, ✂️) that animate when you play. It keeps a running score for both you and the computer. When you make a move, there's a brief, suspenseful pause before the choices are revealed with a smooth animation.

The final result is displayed in a large, colorful message—green for a win, red for a loss—making it instantly clear who won the round. A "Play Again" button appears after each round, letting you reset the scores and start a new match anytime.

## 🎯 Features

Interactive Gameplay: The game responds to player clicks on the Rock, Paper, and Scissors buttons to initiate a round.

Score Tracking: It keeps a running score for both the player and the computer, updating the display after each round.

Random Computer AI: The computer's choice is randomly generated for each round, making the game unpredictable.

Suspenseful Delay: A one-second setTimeout creates a brief, dramatic pause after you make your choice, simulating the computer "thinking" before revealing its move.

Clear Result Display: The game clearly announces whether you win, lose, or draw.

Animated UI: The game uses CSS classes like .visible to create smooth fade-in and scaling animations for the choices and results, making the experience more polished.

Game Reset: A "Play Again" button appears after the first round, allowing the user to reset the scores and start a new game at any time.

## 🛠️ Tech Stack

HTML (HyperText Markup Language): This is used for the core structure of your game, defining all the elements like the title, score boxes, buttons, and result displays.

CSS (Cascading Style Sheets): This provides all the styling, including the dark theme, colors, fonts, button shapes, and the animations that make the game feel interactive and polished.

JavaScript (Vanilla JS): This is the programming language that runs all the game's logic. It's "vanilla" because it doesn't use any external frameworks or libraries. It handles everything from detecting button clicks and generating the computer's choice to updating the score and displaying the final result.

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone this folder
2. Open `index.html` in your browser
3. Start playing!!

### Method 2: Live Server

1. Install VS Code Live Server extension
2. Right-click on `1.html`
3. Select "Open with Live Server"
4. App opens at `http://localhost:5500`

---

## 📁 Project Structure

```
new1/
├── 1.html          # Main HTML file
├── 1.css          # Styling
├── 1.js           # JavaScript logic
├── README.md           # Documentation
└── ss.png      # Web screenshot


## 📚 Learning Outcomes

->DOM Manipulation
->Event Handling
->Conditional Logic
->State Management
->Asynchronous JavaScript
->CSS Transitions & Animations
->Modern CSS Layout
---


## 🐛 Known Issues

->Rapid Clicking Issue: If you click a choice button very rapidly, it's possible to start a new round before the 1-second setTimeout delay from the previous round has finished. This can cause the UI animations and state updates to get slightly out of sync. It's a minor visual glitch but can be confusing.

->No Clear "End Game": The score keeps track indefinitely. While this is fine for a casual game, there's no defined win condition (e.g., "First to 5 wins!"). A player might not know when a "match" is over.

->Draws Don't Feel Neutral: A "draw" round still prompts the user with "Play again?", which feels a bit like the end of a decisive round. It might be better to immediately prompt "Go again!" or "It's a tie, choose again!" without needing the reset button.

---

## 🚀 Future Enhancements

1. Make a dataabase to store history of all games
2. Also add a option to play with friends
3. Also to play with other online players
4. Improve UI/UX
5. Some rewards after winning a game to make it more interesting.

---

## 📄 License

MIT License - Free to use and modify!

---

## 🤝 Contributing

This is a sample project for ProjectHive. Feel free to:
- Fork and enhance
- Report issues
- Suggest improvements
- Use as learning material

---

**Happy Coding! 🚀**
