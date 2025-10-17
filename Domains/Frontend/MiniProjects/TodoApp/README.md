# ✅ Todo App

**Contributor:** SampleContributor  
**Domain:** Frontend  
**Difficulty:** Beginner  
**Tech Stack:** HTML, CSS, JavaScript

---

## 📝 Description

A simple, clean, and functional Todo List application built with vanilla JavaScript. This project demonstrates DOM manipulation, local storage, and modern CSS styling. Perfect for beginners learning frontend development!

---

## 🎯 Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Filter tasks (All, Active, Completed)
- ✅ Clear all completed tasks
- ✅ Task counter
- ✅ Data persistence with LocalStorage
- ✅ Responsive design
- ✅ Clean and modern UI

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox
- **JavaScript (ES6+)** - DOM manipulation and logic
- **LocalStorage API** - Data persistence

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone this folder
2. Open `index.html` in your browser
3. Start managing your tasks!

### Method 2: Live Server

1. Install VS Code Live Server extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. App opens at `http://localhost:5500`

---

## 📁 Project Structure

```
TodoApp/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # JavaScript logic
├── README.md           # Documentation
└── screenshot.png      # (Optional) App screenshot
```

---

## 💻 Code Highlights

### LocalStorage Integration
```javascript
// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}
```

### Add Task Function
```javascript
function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
}
```

---

## 📚 Learning Outcomes

### Skills Practiced
- ✅ DOM Manipulation
- ✅ Event Handling
- ✅ Array Methods (filter, map, forEach)
- ✅ LocalStorage API
- ✅ CSS Flexbox
- ✅ Responsive Design
- ✅ JavaScript ES6 Features

### Concepts Learned
- State management in vanilla JavaScript
- Browser storage APIs
- Event delegation
- Dynamic UI updates
- CSS animations and transitions

---

## 🎨 Customization Ideas

Want to enhance this project? Try adding:

1. **Due Dates** - Add calendar integration
2. **Priority Levels** - High, Medium, Low
3. **Categories/Tags** - Organize tasks by type
4. **Dark Mode** - Toggle theme
5. **Drag & Drop** - Reorder tasks
6. **Search** - Find tasks quickly
7. **Export/Import** - Backup your tasks
8. **Notifications** - Browser notifications

---

## 🐛 Known Issues

None currently. Feel free to report any bugs!

---

## 🚀 Future Enhancements

- [ ] Add task editing functionality
- [ ] Implement drag-and-drop reordering
- [ ] Add dark mode toggle
- [ ] Include task priority levels
- [ ] Add due date feature

---

## 📄 License

MIT License - Free to use and modify!

---

## 🤝 Contributing

This is a sample project for ProjectHive. Feel free to:
- Fork and enhance
- Report issues
- Suggest improvements
- Use as learning material

---

**Happy Coding! 🚀**
