import random
import functools
import operator

# --- Game Configuration ---

# You can change this to any list of numbers to change the game!
# e.g., [1, 2, 3] or [7, 5, 3, 1]
INITIAL_PILES = [3, 5, 7]

PLAYER_HUMAN = "Human"
PLAYER_AI = "AI"


def print_piles(piles):
    """Prints the current state of the piles."""
    print("\n--- Current Piles ---")
    for i, count in enumerate(piles):
        # Print pile index, count, and a visual representation
        print(f"Pile {i}: {count:<2} | {'O ' * count}")
    print("---------------------\n")


def calculate_nim_sum(piles):
    """
    Calculates the Nim-Sum of the game state.
    The Nim-Sum is the bitwise XOR of all pile sizes.
    If the Nim-Sum is 0, the current player is in a losing position.
    If the Nim-Sum is non-zero, the current player is in a winning position.
    """
    # functools.reduce applies the operator.xor function cumulatively
    # to all items in the list. It's the same as: p[0] ^ p[1] ^ p[2] ...
    return functools.reduce(operator.xor, piles)


def get_player_move(piles):
    """Gets and validates the human player's move."""
    while True:
        try:
            # 1. Get pile index
            pile_idx = int(input(f"Which pile to take from (0 to {len(piles) - 1}): "))
            if not 0 <= pile_idx < len(piles):
                print("Error: Invalid pile index.")
                continue
            if piles[pile_idx] == 0:
                print("Error: That pile is already empty.")
                continue

            # 2. Get number of items
            num_to_take = int(input(f"How many to take from pile {pile_idx} (1 to {piles[pile_idx]}): "))
            if not 1 <= num_to_take <= piles[pile_idx]:
                print(f"Error: You must take between 1 and {piles[pile_idx]} items.")
                continue
            
            # If both inputs are valid, return them
            return pile_idx, num_to_take

        except ValueError:
            print("Error: Please enter a valid number.")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")


def find_ai_move(piles):
    """
    Calculates the perfect, unbeatable move for the AI.
    The AI's goal is to always make a move that results
    in a Nim-Sum of 0 for the human player.
    """
    nim_sum = calculate_nim_sum(piles)
    
    if nim_sum == 0:
        # --- LOSING POSITION ---
        # The AI is in a "losing" position (the human has played perfectly).
        # It can't force a win, so it makes a random, valid move
        # (takes 1 from the first non-empty pile) and hopes the human makes a mistake.
        for i, count in enumerate(piles):
            if count > 0:
                return i, 1  # (pile_index, num_to_take)
    
    else:
        # --- WINNING POSITION ---
        # The AI can force a win. It finds a move that makes the new Nim-Sum 0.
        for i, count in enumerate(piles):
            # The "target" is what this pile's count *should* be
            # to make the total Nim-Sum 0.
            target_size = count ^ nim_sum
            
            # If the target size is less than the current pile size,
            # this is a valid move.
            if target_size < count:
                num_to_take = count - target_size
                return i, num_to_take # (pile_index, num_to_take)

    # Fallback (should never be reached if logic is correct)
    # This just makes a "panic" move if something went wrong.
    for i, count in enumerate(piles):
        if count > 0:
            return i, 1


def is_game_over(piles):
    """Checks if the game is over (all piles are 0)."""
    return all(count == 0 for count in piles)


def main_game_loop():
    """Runs the main game loop."""
    
    piles = INITIAL_PILES[:]  # Create a copy
    current_player = PLAYER_HUMAN
    
    print("Welcome to the Game of Nim!")
    print("Rules: Take at least one item from one pile per turn.")
    print("The player to take the LAST item wins.")
    print("The AI will play perfectly. Can you find the winning strategy?")
    
    while True:
        print_piles(piles)
        
        if current_player == PLAYER_HUMAN:
            print("It's your turn (Human).")
            pile_idx, num_to_take = get_player_move(piles)
            piles[pile_idx] -= num_to_take
            
        else: # AI's turn
            print("It's the AI's turn...")
            pile_idx, num_to_take = find_ai_move(piles)
            
            print(f"AI takes {num_to_take} from pile {pile_idx}.")
            piles[pile_idx] -= num_to_take
            
        # Check for a winner
        if is_game_over(piles):
            print_piles(piles)
            if current_player == PLAYER_HUMAN:
                print("🎉 Congratulations! You win! 🎉")
            else:
                print("🤖 The AI wins! 🤖")
            break
            
        # Switch turns
        current_player = PLAYER_AI if current_player == PLAYER_HUMAN else PLAYER_HUMAN

# --- Start the Game ---
if __name__ == "__main__":
    main_game_loop()