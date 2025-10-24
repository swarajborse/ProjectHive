**Contributor**
# Java Quiz Application

A simple **Java console-based quiz application** that allows users to answer multiple-choice questions and calculates their score at the end. The program demonstrates **object-oriented programming**, **arrays**, and **user input handling** in Java.

---

### Project Overview

This application presents a set of multiple-choice questions (MCQs) to the user.  
- Users select an answer by entering the corresponding option (A/B/C/D).  
- The program checks the answer and provides instant feedback (Correct/Wrong).  
- At the end, it displays the total score.  

The application uses a `Question` class to store the question text, options, and the correct answer.

---

### Features

- Multiple-choice questions with 4 options each  
- Instant feedback after each answer  
- Total score calculation at the end  
- Case-insensitive answer checking  
- Easy to add or modify questions  

---

### Working Principle

1. Create an array of `Question` objects, each containing the question, options, and correct answer.  
2. Loop through each question:  
   - Display the question and its options.  
   - Accept the user's answer from the console.  
   - Check if the answer is correct using the `checkAnswer` method.  
   - Display feedback (Correct/Wrong).  
3. After all questions, display the total score.  

---

