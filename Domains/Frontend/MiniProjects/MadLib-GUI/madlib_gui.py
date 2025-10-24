import tkinter as tk
from tkinter import messagebox

class MadLibsGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Mad Libs Game")
        self.root.geometry("500x600")
        
        tk.Label(root, text="Welcome to Mad Libs!", font=("Arial", 18, "bold")).pack(pady=10)
        tk.Label(root, text="Fill in the blanks and create a funny story!", font=("Arial", 12)).pack(pady=5)
        
        # Input fields
        self.entries = {}
        fields = ["Name", "Adjective", "Noun", "Verb", "Place", "Animal"]
        for field in fields:
            tk.Label(root, text=f"Enter a {field}:").pack(pady=5)
            entry = tk.Entry(root, font=("Arial", 14))
            entry.pack(pady=5)
            self.entries[field] = entry
        
        # Button to generate story
        tk.Button(root, text="Generate Story", font=("Arial", 14), command=self.generate_story).pack(pady=20)
        
        # Text box to display the story
        self.story_text = tk.Text(root, height=10, width=50, font=("Arial", 12), wrap=tk.WORD)
        self.story_text.pack(pady=10)
    
    def generate_story(self):
        # Get user inputs
        try:
            name = self.entries["Name"].get().strip()
            adjective = self.entries["Adjective"].get().strip()
            noun = self.entries["Noun"].get().strip()
            verb = self.entries["Verb"].get().strip()
            place = self.entries["Place"].get().strip()
            animal = self.entries["Animal"].get().strip()
            
            if not all([name, adjective, noun, verb, place, animal]):
                messagebox.showerror("Error", "Please fill in all the fields!")
                return
            
            # Create the Mad Lib story
            story = (f"One day, {name} went to {place}. "
                     f"It was a {adjective} day. Suddenly, a {animal} appeared with a {noun} in its paws. "
                     f"{name} decided to {verb} as fast as possible. "
                     "It was an adventure that {name} would never forget!")
            
            # Display story
            self.story_text.delete(1.0, tk.END)
            self.story_text.insert(tk.END, story)
        
        except Exception as e:
            messagebox.showerror("Error", f"Something went wrong: {e}")

# Run the app
if __name__ == "__main__":
    root = tk.Tk()
    app = MadLibsGUI(root)
    root.mainloop()
