import tkinter as tk
from tkinter import messagebox
import json
import os
from datetime import datetime

class TodoGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("To-Do List Manager")
        self.root.geometry("500x500")
        self.filename = "todos.json"
        self.todos = self.load_todos()

        # Entry to add tasks
        self.entry = tk.Entry(root, width=30, font=("Arial", 14))
        self.entry.pack(pady=10)

        # Buttons
        tk.Button(root, text="Add Task", width=15, command=self.add_task).pack(pady=5)
        tk.Button(root, text="Mark as Complete", width=15, command=self.complete_task).pack(pady=5)
        tk.Button(root, text="Delete Task", width=15, command=self.delete_task).pack(pady=5)
        tk.Button(root, text="Clear Completed Tasks", width=20, command=self.clear_completed).pack(pady=5)

        # Listbox to display tasks
        self.listbox = tk.Listbox(root, width=50, height=15, font=("Arial", 12))
        self.listbox.pack(pady=10)

        # Load tasks into listbox
        self.display_tasks()

    def load_todos(self):
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as f:
                return json.load(f)
        return []

    def save_todos(self):
        with open(self.filename, 'w') as f:
            json.dump(self.todos, f, indent=2)

    def display_tasks(self):
        self.listbox.delete(0, tk.END)
        for todo in self.todos:
            status = "✓" if todo['completed'] else "📌"
            self.listbox.insert(tk.END, f"[{todo['id']}] {status} {todo['task']}")

    def add_task(self):
        task_text = self.entry.get().strip()
        if not task_text:
            messagebox.showerror("Error", "Task cannot be empty!")
            return
        todo = {
            "id": len(self.todos) + 1,
            "task": task_text,
            "completed": False,
            "created": datetime.now().strftime("%Y-%m-%d %H:%M")
        }
        self.todos.append(todo)
        self.save_todos()
        self.entry.delete(0, tk.END)
        self.display_tasks()

    def complete_task(self):
        selection = self.listbox.curselection()
        if not selection:
            messagebox.showerror("Error", "Select a task to mark as complete")
            return
        index = selection[0]
        self.todos[index]['completed'] = True
        self.save_todos()
        self.display_tasks()

    def delete_task(self):
        selection = self.listbox.curselection()
        if not selection:
            messagebox.showerror("Error", "Select a task to delete")
            return
        index = selection[0]
        deleted_task = self.todos.pop(index)
        self.save_todos()
        self.display_tasks()
        messagebox.showinfo("Deleted", f"Task '{deleted_task['task']}' deleted!")

    def clear_completed(self):
        self.todos = [t for t in self.todos if not t['completed']]
        self.save_todos()
        self.display_tasks()
        messagebox.showinfo("Cleared", "All completed tasks removed!")

# Run the app
if __name__ == "__main__":
    root = tk.Tk()
    app = TodoGUI(root)
    root.mainloop()
