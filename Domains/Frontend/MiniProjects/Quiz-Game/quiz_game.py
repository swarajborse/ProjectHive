import tkinter as tk
from tkinter import messagebox
import random

class QuizGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Quiz Game")
        self.root.geometry("600x400")
        self.score = 0
        self.question_index = 0
        
        # Quiz questions
        self.questions = [
            {"question": "What is the capital of France?", "options": ["London", "Berlin", "Paris", "Madrid"], "answer": "Paris"},
            {"question": "Which planet is known as the Red Planet?", "options": ["Venus", "Mars", "Jupiter", "Saturn"], "answer": "Mars"},
            {"question": "What is 5 + 7?", "options": ["10", "11", "12", "13"], "answer": "12"},
            {"question": "Who painted the Mona Lisa?", "options": ["Van Gogh", "Picasso", "Da Vinci", "Monet"], "answer": "Da Vinci"},
            {"question": "What is the largest ocean on Earth?", "options": ["Atlantic", "Indian", "Arctic", "Pacific"], "answer": "Pacific"},
            {"question": "How many continents are there?", "options": ["5", "6", "7", "8"], "answer": "7"},
            {"question": "What is the smallest prime number?", "options": ["0", "1", "2", "3"], "answer": "2"},
            {"question": "Which animal is known as the King of the Jungle?", "options": ["Tiger", "Lion", "Elephant", "Bear"], "answer": "Lion"}
        ]
        random.shuffle(self.questions)

        # GUI Elements
        self.question_label = tk.Label(root, text="", wraplength=550, font=("Arial", 16))
        self.question_label.pack(pady=20)

        self.buttons = []
        for i in range(4):
            btn = tk.Button(root, text="", width=20, height=2, font=("Arial", 14), command=lambda idx=i: self.check_answer(idx))
            btn.pack(pady=5)
            self.buttons.append(btn)

        self.display_question()

    def display_question(self):
        if self.question_index < len(self.questions):
            q = self.questions[self.question_index]
            self.question_label.config(text=f"Q{self.question_index + 1}: {q['question']}")
            for i, option in enumerate(q['options']):
                self.buttons[i].config(text=option)
        else:
            self.show_results()

    def check_answer(self, idx):
        q = self.questions[self.question_index]
        selected_answer = q['options'][idx]
        if selected_answer == q['answer']:
            self.score += 1
        self.question_index += 1
        self.display_question()

    def show_results(self):
        percentage = (self.score / len(self.questions)) * 100
        if percentage == 100:
            message = f"🏆 Perfect Score! {self.score}/{len(self.questions)}"
        elif percentage >= 80:
            message = f"🎉 Excellent! {self.score}/{len(self.questions)}"
        elif percentage >= 60:
            message = f"👍 Good work! {self.score}/{len(self.questions)}"
        elif percentage >= 40:
            message = f"😊 Not bad! {self.score}/{len(self.questions)}"
        else:
            message = f"📚 Keep studying! {self.score}/{len(self.questions)}"

        play_again = messagebox.askyesno("Quiz Completed!", f"Your Score: {self.score}/{len(self.questions)}\n\n{message}\n\nDo you want to play again?")
        if play_again:
            self.score = 0
            self.question_index = 0
            random.shuffle(self.questions)
            self.display_question()
        else:
            self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = QuizGUI(root)
    root.mainloop()
