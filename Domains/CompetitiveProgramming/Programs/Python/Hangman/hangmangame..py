import random

# ASCII art for the hangman stages
HANGMAN_PICS = [
    """
  +---+
  |   |
      |
      |
      |
      |
=========""",
    """
  +---+
  |   |
  O   |
      |
      |
      |
=========""",
    """
  +---+
  |   |
  O   |
  |   |
      |
      |
=========""",
    """
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========""",
    """
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========""",
    """
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========""",
    """
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
========="""
]

# List of words for the game
word_list = ["python", "programming", "hangman", "computer", "challenge", "developer"]

def get_random_word(word_list):
    """Chooses a random word from the given list."""
    return random.choice(word_list).lower()

def display_board(HANGMAN_PICS, missed_letters, correct_letters, secret_word):
    """Displays the current state of the game board."""
    print(HANGMAN_PICS[len(missed_letters)])
    print()

    print("Missed letters:", end=" ")
    for letter in missed_letters:
        print(letter, end=" ")
    print()

    blanks = "_" * len(secret_word)

    for i in range(len(secret_word)):  # Replace blanks with correctly guessed letters
        if secret_word[i] in correct_letters:
            blanks = blanks[:i] + secret_word[i] + blanks[i+1:]

    for letter in blanks:  # Show the secret word with blanks and spaces
        print(letter, end=" ")
    print()

def get_guess(already_guessed):
    """Gets a valid letter guess from the player."""
    while True:
        guess = input("Guess a letter: ").lower()
        if len(guess) != 1:
            print("Please enter a single letter.")
        elif guess in already_guessed:
            print("You have already guessed that letter. Choose again.")
        elif not 'a' <= guess <= 'z':
            print("Please enter a letter.")
        else:
            return guess

def play_again():
    """Asks the player if they want to play again."""
    print("Do you want to play again? (yes or no)")
    return input().lower().startswith('y')

def hangman_game():
    """Main function to run the Hangman game."""
    print("H A N G M A N")
    missed_letters = []
    correct_letters = []
    secret_word = get_random_word(word_list)
    game_is_done = False

    while not game_is_done:
        display_board(HANGMAN_PICS, missed_letters, correct_letters, secret_word)

        guess = get_guess(missed_letters + correct_letters)

        if guess in secret_word:
            correct_letters.append(guess)
            # Check if the player has won
            found_all_letters = True
            for i in range(len(secret_word)):
                if secret_word[i] not in correct_letters:
                    found_all_letters = False
                    break
            if found_all_letters:
                print(f"Yes! The secret word is '{secret_word}'! You have won!")
                game_is_done = True
        else:
            missed_letters.append(guess)
            # Check if player has lost
            if len(missed_letters) == len(HANGMAN_PICS) - 1:
                display_board(HANGMAN_PICS, missed_letters, correct_letters, secret_word)
                print(f"You have run out of guesses! The word was '{secret_word}'. You lose!")
                game_is_done = True

    if play_again():
        hangman_game()
    else:
        print("Thanks for playing!")

if __name__ == "__main__":
    hangman_game()