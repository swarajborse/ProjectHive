**contributor** honey-khatri

🎯 Connect Four — ASCII Edition
Welcome to Connect Four, a classic two-player strategy game brought to life in your terminal using Python and ASCII art!
🧩 Game Overview
Connect Four is a turn-based game where two players take turns dropping pieces into a 7-column, 6-row grid. The goal is to be the first to connect four of your pieces horizontally, vertically, or diagonally.
📦 Features
- ASCII-rendered game board for a retro terminal experience
- Two-player mode with alternating turns
- Input validation for column selection
- Win detection across all directions
- Draw detection when the board is full


🎮 How to Play
- Players take turns choosing a column (1–7) to drop their piece.
- Player 1 uses X, Player 2 uses O.
- The game ends when a player connects four pieces or the board is full.
🖥️ Sample Board
  1   2   3   4   5   6   7
|   |   |   |   |   |   |   |
-----------------------------
|   |   |   |   |   |   |   |
-----------------------------
|   |   |   |   |   |   |   |
-----------------------------
|   |   |   |   |   |   |   |
-----------------------------
|   |   |   |   |   |   |   |
-----------------------------
|   |   |   |   |   |   |   |
-----------------------------


🛠️ Code Structure
- print_board() — Renders the board with column numbers and grid lines.
- drop_piece(col, piece) — Places a piece in the lowest available row of the selected column.
- check_winner(piece) — Checks for four connected pieces in all directions.
- is_full() — Determines if the board is completely filled.
- Main loop — Handles player input, turn switching, and game termination.
📌 Notes
- Input is validated to ensure players choose a valid column.
- If a column is full, players are prompted to choose another.
- The game runs entirely in the terminal — no external libraries required.
🧠 Future Enhancements
- Add AI opponent mode
- GUI version using tkinter or pygame
- Score tracking across multiple rounds

