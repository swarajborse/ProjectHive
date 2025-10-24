**Contributor** bigturtle679
# Online Examination System

This is a command-line Java application that simulates a secure, timed online examination system. It features a student login module, a timed multiple-choice quiz that runs on a separate thread, and automatic submission when the time limit is reached.

## Features

* **Student Login:** Users must log in with a valid Name, Roll Number, and Password to start the exam.
* **Pre-populated Student List:** The system is initialized with 10 hardcoded student profiles for testing.
* **Timed Exam (2 Minutes):** The exam is strictly limited to 2 minutes. It runs on a separate thread, and the main thread uses a timed `join()` to enforce the limit.
* **Auto-Submission:** If the 2-minute timer expires, the exam is automatically interrupted, and the user's current score is submitted.
* **Multiple-Choice Quiz:** Features a 5-question general knowledge quiz.
* **Instant Scoring:** Provides an immediate score out of 100 (20 points per question) and a pass/fail message (passing score $\ge 40$).
* **Profile Management:** After the exam, the user is prompted to "update" their details (which currently adds a new user profile) and to log out.

## Prerequisites

To compile and run this project, you will need:

* **Java Development Kit (JDK)** (version 8 or newer)

## How to Run

1.  **Save the Code:** Save the code as `OnlineExamination.java`.
2.  **Open a Terminal:** Open your terminal or command prompt.
3.  **Navigate to the Directory:** Change to the directory where you saved the file.
    ```bash
    cd path/to/your/directory
    ```
4.  **Compile the Code:**
    ```bash
    javac OnlineExamination.java
    ```
5.  **Run the Program:**
    ```bash
    java OnlineExamination
    ```

## Valid Login Credentials

You must use one of the following hardcoded accounts to log in:

| Name | Roll Number | Password |
| :--- | :--- | :--- |
| Parth | 101 | pass101 |
| Abeer | 102 | pass102 |
| Anushka | 103 | pass103 |
| Aliza | 104 | pass1