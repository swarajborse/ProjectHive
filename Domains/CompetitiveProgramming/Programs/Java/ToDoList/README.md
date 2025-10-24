**Contributor**
# ✅ To-Do List Application (Java Console Project)

## 📘 Overview
This is a simple **console-based To-Do List application** built in **Java**.  
It allows users to **add, view, mark, delete, and save tasks** using file handling and serialization.  
All tasks are saved in a file so that they are automatically **restored in the next session**.

---

## 🧩 Features
- 📝 Add new tasks  
- 👀 View all tasks with completion status  
- ✔️ Mark tasks as completed  
- 🗑️ Delete tasks  
- 💾 Automatically save and load tasks from a file (`tasks.txt`)  
- 🔁 Persistent storage using **Object Serialization**  

---

## ⚙️ Technologies Used
- **Language:** Java  
- **Concepts Used:**  
  - Object-Oriented Programming (OOP)  
  - File Handling (Input/Output Streams)  
  - Serialization (`Serializable` interface)  
  - Collections (`ArrayList`)  
  - Conditional statements and loops  

---

## 🧠 How It Works
1. When the program starts, it loads previously saved tasks from `tasks.txt` (if available).  
2. The user can choose from several menu options:
   - Add a new task  
   - View existing tasks  
   - Mark a task as completed  
   - Delete a task  
   - Exit and save all tasks  
3. When exiting, all tasks are serialized and saved to `tasks.txt`.  
4. On next run, the saved tasks are automatically loaded again.

---

