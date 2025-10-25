# 🎟️ Lottery Game

**Contributor:** Tejas-Santosh-Nalawade
**Domain:** Frontend
**Tech Stack:** HTML, CSS, JavaScript (vanilla)

A small browser-based Lottery Game where users can pick numbers and compare them with a randomly drawn set to see if they win. It's a lightweight project intended for learning DOM manipulation and basic game logic in JavaScript.

---

## Demo

Open `index.html` in your browser to try the game locally. The UI is minimal—pick numbers, draw, and check results.

---

## Features

- Pick a set of numbers (configurable by UI)
- Draw random winning numbers
- Compare user picks with the drawn numbers and show matches
- Simple win/lose feedback with a small animation or highlight
- Responsive layout for desktop and mobile

---

## How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge).

Optional (for a local dev server):
1. Install VS Code and the Live Server extension.
2. Right-click `index.html` → Open with Live Server.

---

## Controls / How to Play

1. Select your numbers using the on-screen number buttons.
2. Click the `Draw` button to generate winning numbers.
3. The UI will highlight matches and show a simple message whether you won.

---

## Project Structure

```
Lottery-Game/
├── index.html        # Main page and UI
├── style.css         # Styling
├── script.js         # Game logic (number selection, draw, comparison)
└── README.md         # This file
```

---

## Implementation Notes

- The draw uses a simple random shuffle to pick unique winning numbers.
- Game state is kept in-memory; no backend or persistent storage is used.
- Designed to be easy to read and modify for beginners.

---

## Contributing

Contributions are welcome. Good first contributions:

- Improve UI/UX or add animations
- Add unit tests for game logic
- Make draw rules configurable (range, picks count)
- Add score tracking or history (localStorage)

Please open issues or submit PRs with descriptive titles and a short explanation.

---

## License

This project is released under the MIT License.

Enjoy the game! 🎉