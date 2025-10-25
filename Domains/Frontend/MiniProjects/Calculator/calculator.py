import tkinter as tk
from tkinter import messagebox

# Function to handle button clicks
def click(button_text):
    if button_text == "=":
        try:
            result = str(eval(entry.get()))
            entry.delete(0, tk.END)
            entry.insert(tk.END, result)
        except ZeroDivisionError:
            messagebox.showerror("Error", "Cannot divide by zero!")
            entry.delete(0, tk.END)
        except Exception:
            messagebox.showerror("Error", "Invalid input!")
            entry.delete(0, tk.END)
    elif button_text == "C":
        entry.delete(0, tk.END)
    else:
        entry.insert(tk.END, button_text)

# Create main window
root = tk.Tk()
root.title("Simple Calculator")
root.geometry("300x400")

# Entry widget for display
entry = tk.Entry(root, width=16, font=("Arial", 24), borderwidth=2, relief="ridge")
entry.grid(row=0, column=0, columnspan=4, padx=10, pady=10)

# Buttons
buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
]

# Place buttons in grid
row_val = 1
col_val = 0
for button in buttons:
    tk.Button(root, text=button, width=5, height=2, font=("Arial", 18),
              command=lambda b=button: click(b)).grid(row=row_val, column=col_val, padx=5, pady=5)
    col_val += 1
    if col_val > 3:
        col_val = 0
        row_val += 1

root.mainloop()
