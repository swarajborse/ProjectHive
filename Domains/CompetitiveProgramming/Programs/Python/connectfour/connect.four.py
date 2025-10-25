# Connect Four Game with ASCII Art

# Initialize the game board
ROWS, COLS = 6, 7
board = [[" " for _ in range(COLS)] for _ in range(ROWS)]

def print_board():
    """Print the board with ASCII art."""
    print("\n  " + "   ".join(map(str, range(1, COLS + 1))))
    for row in board:
        print("| " + " | ".join(row) + " |")
        print("-" * (COLS * 4 + 1))

def drop_piece(col, piece):
    """Drop a piece into the selected column."""
    for row in reversed(board):
        if row[col] == " ":
            row[col] = piece
            return True
    return False

def check_winner(piece):
    """Check if the given piece has won."""
    # Check horizontal
    for r in range(ROWS):
        for c in range(COLS - 3):
            if all(board[r][c + i] == piece for i in range(4)):
                return True
    # Check vertical
    for r in range(ROWS - 3):
        for c in range(COLS):
            if all(board[r + i][c] == piece for i in range(4)):
                return True
    # Check diagonal (down-right)
    for r in range(ROWS - 3):
        for c in range(COLS - 3):
            if all(board[r + i][c + i] == piece for i in range(4)):
                return True
    # Check diagonal (up-right)
    for r in range(3, ROWS):
        for c in range(COLS - 3):
            if all(board[r - i][c + i] == piece for i in range(4)):
                return True
    return False

def is_full():
    """Check if the board is full."""
    return all(cell != " " for row in board for cell in row)

# Main game loop
print("Welcome to Connect Four!")
print_board()
current_player = 1

while True:
    try:
        col = int(input(f"Player {current_player} (Piece {'X' if current_player == 1 else 'O'}), choose a column (1-{COLS}): ")) - 1
        if col < 0 or col >= COLS:
            print("Invalid column. Please choose a valid column.")
            continue
        if not drop_piece(col, "X" if current_player == 1 else "O"):
            print("Column is full. Try a different one.")
            continue
        print_board()
        if check_winner("X" if current_player == 1 else "O"):
            print(f"Player {current_player} wins! Congratulations!")
            break
        if is_full():
            print("It's a draw! The board is full.")
            break
        current_player = 3 - current_player  # Switch player (1 -> 2, 2 -> 1)
    except ValueError:
        print("Invalid input. Please enter a number.")
