import tkinter as tk
from tkinter import messagebox

class TicTacToe:
    def __init__(self, root):
        # Initialize the main application window
        self.root = root
        self.root.title("Tic Tac Toe")
        
        # Set the current player and initialize the board state
        self.current_player = "X"
        self.board = [""] * 9
        
        # List to hold button references for the game board
        self.buttons = []
        self.create_board()

    def create_board(self):
        # Create a frame to hold the game board buttons
        frame = tk.Frame(self.root, bg="lightblue")  # Add background color for aesthetic
        frame.pack(padx=10, pady=10)
        
        # Create 9 buttons (3x3 grid) for the board
        for i in range(9):
            button = tk.Button(
                frame, text="", font=("Arial", 24, "bold"), width=5, height=2,
                bg="white", fg="black", command=lambda i=i: self.on_click(i), relief="raised"  # Pass button index to the click handler
            )
            button.grid(row=i//3, column=i%3, padx=5, pady=5)  # Position button in the grid
            self.buttons.append(button)

        # Add a label to display the current player's turn
        self.turn_label = tk.Label(
            self.root, text=f"Player {self.current_player}'s Turn", font=("Arial", 16), bg="lightblue"
        )
        self.turn_label.pack(pady=5)

        # Add a restart button below the game board
        self.restart_button = tk.Button(
            self.root, text="Restart Game", font=("Arial", 14, "bold"), bg="orange", fg="white",
            command=self.restart_game
        )
        self.restart_button.pack(pady=10)

    def on_click(self, index):
        # Handle a button click event
        if self.board[index] == "":  # Ensure the button has not already been clicked
            self.board[index] = self.current_player
            self.buttons[index].config(text=self.current_player, fg="blue" if self.current_player == "X" else "red")  # Update button text
            
            if self.check_winner():  # Check if the current player has won
                messagebox.showinfo("Game Over", f"Player {self.current_player} wins!")
                self.turn_label.config(text=f"Player {self.current_player} wins!")
                self.disable_buttons()  # Disable further interaction with the board
            elif "" not in self.board:  # Check for a draw condition
                messagebox.showinfo("Game Over", "It's a draw!")
                self.turn_label.config(text="It's a draw!")
            else:
                # Switch to the other player
                self.current_player = "O" if self.current_player == "X" else "X"
                self.turn_label.config(text=f"Player {self.current_player}'s Turn")

    def check_winner(self):
        # Define winning patterns (rows, columns, diagonals)
        win_patterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
            [0, 4, 8], [2, 4, 6]              # Diagonals
        ]
        
        # Check if any winning pattern is satisfied
        for pattern in win_patterns:
            if self.board[pattern[0]] == self.board[pattern[1]] == self.board[pattern[2]] != "":
                return True
        return False

    def disable_buttons(self):
        # Disable all buttons to prevent further interaction
        for button in self.buttons:
            button.config(state="disabled")

    def restart_game(self):
        # Reset the game to its initial state
        self.current_player = "X"  # Reset to player X
        self.board = [""] * 9  # Clear the board state
        self.turn_label.config(text=f"Player {self.current_player}'s Turn")  # Update turn label
        for button in self.buttons:
            button.config(text="", state="normal", bg="white")  # Clear button text and enable them

if __name__ == "__main__":
    # Create the main application window and run the game
    root = tk.Tk()
    root.configure(bg="lightblue")  # Set a background color for the main window
    game = TicTacToe(root)
    root.mainloop()
