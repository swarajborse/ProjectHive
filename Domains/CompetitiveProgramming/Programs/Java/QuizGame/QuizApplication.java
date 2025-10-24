import java.util.Scanner;

class Question {
    String question;
    String[] options;
    char correctAnswer;

    Question(String question, String[] options, char correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    boolean checkAnswer(char answer) {
        return Character.toUpperCase(answer) == Character.toUpperCase(correctAnswer);
    }
}

public class QuizApplication {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int score = 0;

        Question[] questions = {
            new Question("1. Which company developed Java?", 
                new String[]{"A. Sun Microsystems", "B. Microsoft", "C. Apple", "D. IBM"}, 'A'),
            new Question("2. Which of the following is not a Java feature?", 
                new String[]{"A. Object-Oriented", "B. Portable", "C. Use of pointers", "D. Secure"}, 'C'),
            new Question("3. Which keyword is used to inherit a class in Java?", 
                new String[]{"A. super", "B. this", "C. extends", "D. implement"}, 'C'),
            new Question("4. What is the size of int in Java?", 
                new String[]{"A. 2 bytes", "B. 4 bytes", "C. 8 bytes", "D. Depends on OS"}, 'B'),
            new Question("5. Which method is the entry point for a Java program?", 
                new String[]{"A. start()", "B. main()", "C. run()", "D. execute()"}, 'B')
        };

        System.out.println("===== WELCOME TO JAVA QUIZ =====");
        for (Question q : questions) {
            System.out.println("\n" + q.question);
            for (String opt : q.options) {
                System.out.println(opt);
            }
            System.out.print("Enter your answer (A/B/C/D): ");
            char ans = sc.next().charAt(0);

            if (q.checkAnswer(ans)) {
                System.out.println("✅ Correct!");
                score++;
            } else {
                System.out.println("❌ Wrong! Correct Answer: " + q.correctAnswer);
            }
        }

        System.out.println("\n===== QUIZ FINISHED =====");
        System.out.println("Your Score: " + score + "/" + questions.length);
        sc.close();
    }
}
