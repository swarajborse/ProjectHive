# Simple Quiz App in Python

def run_quiz(questions):
    score = 0
    for q in questions:
        print("\n" + q["question"])
        for option in q["options"]:
            print(option)
        answer = input("Enter your answer (A/B/C/D): ").upper()
        if answer == q["answer"]:
            print("✅ Correct!")
            score += 1
        else:
            print(f"❌ Wrong! Correct answer is {q['answer']}")
    print("\n🎯 You got", score, "out of", len(questions), "correct!")


# List of questions
questions = [
    {
        "question": "1. What is the capital of France?",
        "options": ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
        "answer": "C"
    },
    {
        "question": "2. Which language is used for web apps?",
        "options": ["A. Python", "B. JavaScript", "C. HTML", "D. All of the above"],
        "answer": "D"
    },
    {
        "question": "3. What is 5 + 7?",
        "options": ["A. 10", "B. 12", "C. 14", "D. 15"],
        "answer": "B"
    },
    {
        "question": "4. Who developed Python?",
        "options": ["A. Guido van Rossum", "B. Elon Musk", "C. Bill Gates", "D. Mark Zuckerberg"],
        "answer": "A"
    },
    {
        "question": "5. What does HTML stand for?",
        "options": ["A. Hyper Trainer Marking Language", 
                    "B. Hyper Text Markup Language", 
                    "C. Hyper Text Marketing Language", 
                    "D. None of these"],
        "answer": "B"
    }
]

# Run the quiz
run_quiz(questions)
