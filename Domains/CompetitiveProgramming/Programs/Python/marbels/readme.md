**Contributor:** AbhinavPundir18
# 🤖 Unbeatable Game of Nim

This is a Python implementation of the classic mathematical "Game of Nim." You play against a perfect, unbeatable AI opponent.

The AI uses a mathematical strategy based on the **Nim-Sum** (using the bitwise XOR operator) to determine the perfect move every time. If you make a single mistake, the AI will win.

---

## ✨ Features

* **Unbeatable AI:** The AI opponent is mathematically perfect. It cannot be beaten unless it starts in a losing position and you play perfectly.
* **Simple Terminal Interface:** The game is played entirely within your command line.
* **Clear Visuals:** The piles are printed in an easy-to-read format on every turn.
* **Easily Configurable:** You can change the starting state of the game by simply editing the `INITIAL_PILES` list at the top of the script.

4.  Follow the on-screen prompts to play the game.



## 룰 Rules of the Game

1.  The game starts with several piles of items (in this case, 'O's).
2.  Two players (you and the AI) take turns.
3.  On your turn, you must remove **at least one** item from **only one** pile. You can take the whole pile if you want.
4.  The player who takes the **very last item** on the board wins the game.

---

## 🧠 The AI's Strategy (The "Nim-Sum")

The AI's "magic" comes from a simple concept called the **Nim-Sum**.

* The Nim-Sum is the result of applying a bitwise **XOR** (`^`) to the number of items in every pile.
    * *Example:* For piles `[3, 5, 7]`, the Nim-Sum is `3 ^ 5 ^ 7`.
    * `3` in binary is `011`
    * `5` in binary is `101`
    * `7` in binary is `111`
    * `011 ^ 101 ^ 111 = 101` (which is 5)

* **If the Nim-Sum is 0:** The player whose turn it is is in a **losing position**.
* **If the Nim-Sum is not 0:** The player is in a **winning position**.

The AI will **always** make a move that leaves the Nim-Sum at **0** for your turn. If you can't find a move that makes the Nim-Sum 0 for the AI, you will eventually lose.