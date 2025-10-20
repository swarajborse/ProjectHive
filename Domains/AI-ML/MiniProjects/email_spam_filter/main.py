# Simple Spam Classifier based on Word Frequency (Easy ML/Statistics)
import numpy as np 
import csv 

# --- 1. DATA LOADING FUNCTION ---

def load_data_from_csv(filename="sample.csv"):
    """
    Reads text and label data from a specified CSV file.
    Expects two columns: Text (str) and Label (int 0 or 1).
    """
    data = []
    try:
        with open(filename, mode='r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)  # Skip the header row (e.g., "Text,Label")
            for row in reader:
                if len(row) == 2:
                    text = row[0].strip()
                    # Convert label to integer
                    try:
                        label = int(row[1].strip())
                        data.append((text, label))
                    except ValueError:
                        print(f"[Warning] Skipping row with non-integer label: {row}")
    except FileNotFoundError:
        print(f"[CRITICAL ERROR] The file '{filename}' was not found.")
        print("Please ensure the CSV file is in the same directory as the script.")
        return []
    except Exception as e:
        print(f"[ERROR] An error occurred while reading the CSV: {e}")
        return []

    return data

# --- 2. TRAIN THE CLASSIFIER (Counting) ---

def train_classifier(data):
    """
    Counts the frequency of words in spam and ham messages.
    """
    spam_word_counts = {}
    ham_word_counts = {}
    total_spam_messages = 0
    total_ham_messages = 0

    print("--- Training Model (Counting Words) ---")
    
    for text, label in data:
        # Convert text to lowercase and split into words
        words = text.lower().split()
        
        if label == 1:
            total_spam_messages += 1
            counts = spam_word_counts
        else:
            total_ham_messages += 1
            counts = ham_word_counts
            
        for word in words:
            # Use a basic dictionary to store word frequency
            counts[word] = counts.get(word, 0) + 1

    print(f"Total Spam Messages: {total_spam_messages}")
    print(f"Total Ham Messages: {total_ham_messages}")
    print("[Training Complete]")
    
    return spam_word_counts, ham_word_counts, total_spam_messages, total_ham_messages

# --- 3. PREDICTION LOGIC ---

def predict_spam_score(text, spam_counts, ham_counts, total_spam, total_ham):
    """
    Scores a new message based on how many "spam words" it contains.
    The score is the ratio of spam-words found.
    """
    words = text.lower().split()
    spam_score = 0
    
    print(f"\nAnalyzing Text: '{text}'")
    
    for word in words:
        # Calculate the simple probability of this word being in spam vs ham
        
        # Count how many times this word appeared in spam and ham training data
        spam_hits = spam_counts.get(word, 0)
        ham_hits = ham_counts.get(word, 0)
        
        # Simple probability: P(word|Spam)
        # Add '1' (Laplace smoothing) to avoid dividing by zero if a word wasn't seen
        p_word_given_spam = (spam_hits + 1) / (total_spam + 2) 
        p_word_given_ham = (ham_hits + 1) / (total_ham + 2)
        
        # Calculate the ratio: How much more likely is this word to be spam?
        if p_word_given_spam > p_word_given_ham:
            ratio = p_word_given_spam / p_word_given_ham
            # Log the ratio to prevent numbers from exploding, and add to the score
            spam_score += np.log(ratio) 
            print(f"  - '{word}': Spam Likely (Score added: {np.log(ratio):.2f})")
        else:
            print(f"  - '{word}': Ham Likely")

    return spam_score

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    try:
        # NumPy is needed for the log function, which keeps numbers manageable
        import numpy as np 
        
        # 1. Load Data from CSV
        DATA = load_data_from_csv()
        
        if not DATA:
            print("\n[Execution Halted] Cannot proceed without training data.")
        else:
            # 2. Train the Classifier
            s_counts, h_counts, t_spam, t_ham = train_classifier(DATA)

            # 3. Set the threshold (a score above this is classified as SPAM)
            SPAM_THRESHOLD = 1.0 

            # 4. Interactive Testing
            print("\n--- Interactive Spam Tester ---")
            print(f"Prediction Threshold: Score > {SPAM_THRESHOLD} is SPAM")
            print("Enter 'quit' to exit.")
            
            while True:
                test_text = input("\nEnter email subject/body: ")
                if test_text.lower() == 'quit':
                    break
                
                final_score = predict_spam_score(test_text, s_counts, h_counts, t_spam, t_ham)
                
                print(f"\nFINAL SPAM SCORE: {final_score:.3f}")

                if final_score > SPAM_THRESHOLD:
                    print("CLASSIFICATION: 🚨 SPAM")
                else:
                    print("CLASSIFICATION: ✅ HAM")
                print("-" * 30)
            
    except ImportError:
        print("\n[CRITICAL ERROR] NumPy is required for this script (for log function).")
        print("Please ensure your Python environment has NumPy installed.")
    except Exception as e:
        print(f"[ERROR] An unexpected error occurred: {e}")
