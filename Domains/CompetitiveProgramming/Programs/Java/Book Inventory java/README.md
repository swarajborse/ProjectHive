📚 Bookstore Management System

Contributor: snehal492006

🧾 Overview

The Bookstore Management System is a Java-based console application that allows users to view and purchase books from different categories.
It maintains book details, prices, and records customer purchases in a text file for reference.

⚙️ Features

View categorized book lists:

Fantasy Books

Romantic Books

Horror Books

Thriller Books

Mystery Books

Action & Adventure Books

Autobiographies

Textbooks

Biographies

Coding Books

Buy books using index numbers

Automatically record client purchases in a text file

Book data updates dynamically when purchases are made

🗂️ Project Structure
📦 BookStoreProject
 ┣ 📜 BookStore.java       # Main class (includes all categories)
 ┣ 📜 client_purchase_info.txt  # Stores purchase records
 ┗ 📜 README.md

🧠 Concept Used

Object-Oriented Programming (OOP)

Inheritance (each category inherits from the previous one)

Encapsulation

File Handling (using FileWriter for storing client data)

Collections (using Vector for dynamic book lists)

Exception Handling (try-catch for I/O operations)

User Input Handling (via Scanner class)

💻 How to Run the Program

Open your Java IDE (e.g., NetBeans, IntelliJ IDEA, or Command Prompt).

Create a new project and add the file BookStore.java.

Compile the program:

javac BookStore.java


Run the program:

java BookStore


Choose a category and follow the instructions in the console.

📄 Output Example
Categories:
1. Fantasy Books
2. Romantic Books
3. Horror Books
...

Enter your choice: 1

Our list of Fantasy Books:
1. A Wizard of Earthsea (Price: 340.0)
2. Children of Blood and Bone (Price: 429.86)
...

Enter index number of book to buy: 2
Enter client name: Snehal
Purchase recorded successfully.
You have bought Children of Blood and Bone of Rs.429.86

🧾 Purchase Record Format

All client purchases are saved in client_purchase_info.txt as:

Client: Snehal, Book: Children of Blood and Bone
Client: Radhan, Book: The Hobbit

🧑‍💻 Developed Using

Language: Java

IDE Used: Any Java IDE (e.g., NetBeans, IntelliJ, Eclipse, or Dev-C++)

Concepts: File Handling, OOP, Exception Handling, Java Collections