//Online Examination System

import java.util.*;
public class OnlineExamination {
    static class Student {
        String name;
        int rollNumber;
        String password;
        int score;

        Student(String name, int rollNumber, String password, int score) {
            this.name = name;
            this.rollNumber = rollNumber;
            this.password = password;
            this.score = score;
        }
    }

    private List<Student> students = new ArrayList<>();

    public OnlineExamination() {
        students.add(new Student("Parth", 101, "pass101",0));
        students.add(new Student("Abeer", 102, "pass102",0));
        students.add(new Student("Anushka", 103, "pass103",0));
        students.add(new Student("Aliza", 104, "pass104",0));
        students.add(new Student("Ansh", 105, "pass105",0));
        students.add(new Student("Anurag", 106, "pass106",0));
        students.add(new Student("Shreya", 107, "pass107",0));
        students.add(new Student("Vedika", 108, "pass108",0));
        students.add(new Student("Omkar", 109, "pass109",0));
        students.add(new Student("Tallu", 110, "pass110",0));
    }

    public void login(String name, int rollNumber, String password) {
        for (Student student : students) {
            if (student.name.equals(name) && student.rollNumber == rollNumber && student.password.equals(password)) {
                System.out.println("Login successful! Welcome " + student.name);
                return;
            }
        }
        System.out.println("Login failed! Please check your credentials.");
    }

    
    private volatile boolean timeUp = false;
    private volatile int lastScore = 0;

    public void startExamWithTimeLimit() {
        Thread examThread = new Thread(() -> MCQQuestionPaperWithTimeLimit());
        examThread.start();

        try {
            examThread.join(2 * 60 * 1000); 
            if (examThread.isAlive()) {
                timeUp = true;
                System.out.println("\nTime's up! The exam has ended and is being submitted automatically.");
                examThread.interrupt();
                examThread.join();
                System.out.println("Your score is: " + lastScore + "/100");
            }
        } catch (InterruptedException e) {
            System.out.println("Exam interrupted.");
        }
    }


    public void MCQQuestionPaperWithTimeLimit() {
        char[] answers = new char[5];
        char[] correctAnswers = {'c', 'b', 'b', 'b', 'a'};
        String[] questions = {
            "1. What is the capital of India?\na) Bengaluru\nb) Kolkata\nc) New Delhi\nd) Mumbai",
            "2. Who is the current Prime Minister of India?\na) Rahul Gandhi\nb) Narendra Modi\nc) Manmohan Singh\nd) Amit Shah",
            "3. Which is the largest continent by area?\na) Africa\nb) Asia\nc) Europe\nd) Antarctica",
            "4. What is the chemical symbol for carbon dioxide?\na) H2O\nb) CO2\nc) O2\nd) N2",
            "5. What is the chemical name of vitamin B12?\na) Cobalamin\nb) Thiamine\nc) Riboflavin\nd) Niacin"
        };
        int score = 0;
        Scanner sc = new Scanner(System.in);

        for (int i = 0; i < 5; i++) {
            if (timeUp || Thread.currentThread().isInterrupted()) {
                System.out.println("\nTime's up! Auto-submitting your exam...");
                break;
            }
            System.out.println(questions[i]);
            System.out.print("Your answer: ");
            try {
                if (sc.hasNext()) {
                    answers[i] = sc.next().charAt(0);
                } else {
                    answers[i] = ' ';
                }
            } catch (Exception e) {
                answers[i] = ' ';
            }
            if (answers[i] == correctAnswers[i]) {
                System.out.println("Correct answer!");
                score += 20;
            } else {
                System.out.println("Wrong answer!");
            }       
            System.out.println();
        }
        lastScore = score;
        System.out.println("Thank you for participating in the exam!");
        System.out.println("Your score is: " + score + "/100");
        if (score >= 40) {
            System.out.println("Congratulations! You passed the exam.");
        } else {
            System.out.println("Unfortunately, you did not pass the exam. Better luck next time!");
        }
        System.out.println("Examination completed. Thank you for your participation!");
    }

    public void updateLoginDetails(String name, int rollNumber, String password) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter new name:");
        name = sc.nextLine();
        System.out.println("Enter your roll number:");
        rollNumber = sc.nextInt();
        System.out.println("Enter new password:");
        password = sc.next();
        students.add(new Student(name, rollNumber, password, 0));
        System.out.println("Login details updated successfully!");
    }

    public void logout() {
        int reply;
        Scanner sc = new Scanner(System.in);
        System.out.println("Press 1 to logout: ");
        reply = sc.nextInt();
        if (reply == 1) {
            System.out.println("Logging out");
            sc.close();
        }
    }

    public static void main(String[] args) {
        System.out.println("Welcome to the Online Examination System!");
        System.out.println();
        System.out.println();
        System.out.println("Please enter your credentials to login.");
        System.out.println();
        System.out.println();

        OnlineExamination exam = new OnlineExamination();
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter your name:");
        String name = sc.nextLine();
        System.out.println("Enter your roll number:");
        int rollNumber = sc.nextInt();
        System.out.println("Enter your password:");
        String password = sc.next();

        System.out.println();
        System.out.println();
        System.out.println("Note that you have only 2 minutes to complete the exam.");

        exam.login(name, rollNumber, password);
        exam.startExamWithTimeLimit();
        System.out.println();

        int choice;
        System.out.println("Do you want to update your login details? Press 1 for Yes, 0 for No:");
        choice = sc.nextInt();
        if (choice == 1) {
            exam.updateLoginDetails(name, rollNumber, password);
        } else {
            System.out.println("You chose not to update your login details.");
        }

        exam.logout();
        sc.close();
    }

    
    
}
