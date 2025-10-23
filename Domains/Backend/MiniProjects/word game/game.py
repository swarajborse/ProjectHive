import random

def load_words(filename="words.txt"):
    """Load words from a file."""
    try:
        with open(filename, "r") as f:
            words = [word.strip().lower() for word in f.readlines() if word.strip()]
        return words
    except FileNotFoundError:
        print("❌ words.txt not found. Please add some words!")
        return []

def play_game():
    words = load_words()
    if not words:
        return

    word = random.choice(words)
    guessed = ["_"] * len(word)
    attempts = 6
    guessed_letters = []

    print("🎯 Welcome to Guess the Word Game!")
    print("Guess the hidden word by entering one letter at a time.\n")

    while attempts > 0 and "_" in guessed:
        print(f"Word: {' '.join(guessed)}")
        print(f"Attempts left: {attempts}")
        print(f"Guessed letters: {', '.join(guessed_letters)}")
        letter = input("Enter a letter: ").lower()

        if not letter.isalpha() or len(letter) != 1:
            print("⚠️ Please enter a single alphabet letter.\n")
            continue

        if letter in guessed_letters:
            print("⚠️ You already guessed that letter.\n")
            continue

        guessed_letters.append(letter)

        if letter in word:
            print("✅ Good guess!\n")
            for i, ch in enumerate(word):
                if ch == letter:
                    guessed[i] = letter
        else:
            print("❌ Wrong guess!\n")
            attempts -= 1

    if "_" not in guessed:
        print(f"🎉 You guessed it! The word was: {word.upper()}")
    else:
        print(f"😢 Out of attempts! The word was: {word.upper()}")

if __name__ == "__main__":
    play_game()
