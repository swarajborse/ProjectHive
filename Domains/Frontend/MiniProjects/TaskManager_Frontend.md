# Task Manager App

**Contributor:** SampleContributor
**Domain:** Frontend
**Difficulty:** Beginner
**Tech Stack:** HTML, CSS, JavaScript, Local Storage

## 📝 Description

A simple yet functional task management application that allows users to create, update, delete, and organize their daily tasks. The app uses browser's local storage to persist data, ensuring tasks are saved even after the browser is closed.

## 🎯 Features

- ✅ Create new tasks with title and description
- ✅ Mark tasks as complete/incomplete
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Filter tasks (All, Active, Completed)
- ✅ Search functionality
- ✅ Persistent storage using localStorage
- ✅ Responsive design for mobile and desktop
- ✅ Clean and intuitive user interface
- ✅ Task counter showing active tasks

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Styling with Flexbox/Grid
- **Vanilla JavaScript** - Core functionality
- **Local Storage API** - Data persistence
- **Font Awesome** - Icons

## 📸 Screenshots

```
[Home Page - Task List View]
┌─────────────────────────────────────┐
│  📋 My Task Manager                 │
│  ─────────────────────────────────  │
│  [ + Add New Task ]                 │
│  ─────────────────────────────────  │
│  🔍 Search tasks...                 │
│  [All] [Active] [Completed]         │
│  ─────────────────────────────────  │
│  ☐ Complete project documentation   │
│     Due: Tomorrow                    │
│  ─────────────────────────────────  │
│  ☑ Review pull requests             │
│     Completed ✓                      │
│  ─────────────────────────────────  │
│  3 tasks remaining                   │
└─────────────────────────────────────┘
```

## 🚀 How to Run

### Method 1: Direct Browser
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   ```

2. Navigate to the project directory
   ```bash
   cd task-manager
   ```

3. Open `index.html` in your browser
   ```bash
   # On Windows
   start index.html
   
   # On Mac
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

### Method 2: Live Server (Recommended)
1. Install VS Code Live Server extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. App will open at `http://localhost:5500`

## 📁 Project Structure

```
task-manager/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles
│   └── responsive.css     # Media queries
├── js/
│   ├── app.js            # Main application logic
│   ├── storage.js        # LocalStorage handler
│   └── ui.js             # UI manipulation
├── assets/
│   ├── icons/            # Custom icons
│   └── images/           # Images
└── README.md             # Project documentation
```

## 💻 Code Highlights

### Key Functions

**1. Add Task**
```javascript
function addTask(title, description) {
  const task = {
    id: Date.now(),
    title: title,
    description: description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(task);
  saveTasks();
  renderTasks();
}
```

**2. LocalStorage Integration**
```javascript
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}
```

**3. Filter Tasks**
```javascript
function filterTasks(filter) {
  switch(filter) {
    case 'active':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
}
```

## 📚 Learning Outcomes

### Skills Developed
- **DOM Manipulation**: Dynamic creation and updating of HTML elements
- **Event Handling**: Managing user interactions (clicks, form submissions)
- **Local Storage**: Browser-based data persistence
- **Array Methods**: filter(), map(), forEach(), find()
- **CSS Layout**: Flexbox and Grid for responsive design
- **JavaScript ES6**: Arrow functions, template literals, destructuring

### Challenges Overcome
1. **State Management**: Keeping UI in sync with data
2. **Data Persistence**: Implementing localStorage effectively
3. **Responsive Design**: Making it work across devices
4. **User Experience**: Adding smooth transitions and feedback

### Best Practices Learned
- Separation of concerns (HTML, CSS, JS)
- DRY (Don't Repeat Yourself) principle
- Semantic HTML for accessibility
- Mobile-first responsive design
- Error handling and validation

## 🎨 Customization Ideas

Want to extend this project? Try adding:

1. **Priority Levels**: High, Medium, Low priority tasks
2. **Categories**: Work, Personal, Shopping, etc.
3. **Due Dates**: Calendar integration
4. **Dark Mode**: Theme toggle
5. **Export/Import**: JSON data export
6. **Drag & Drop**: Reorder tasks
7. **Notifications**: Browser notifications for due tasks
8. **Statistics**: Charts showing task completion trends

## 🔗 Live Demo

[View Live Demo](https://yourusername.github.io/task-manager) *(Replace with your actual demo link)*

## 🐛 Known Issues

- Filter buttons state doesn't persist on page reload
- No confirmation dialog for delete action
- Search is case-sensitive

## 🚀 Future Enhancements

- [ ] Add user authentication
- [ ] Backend integration for cloud sync
- [ ] Mobile app version (React Native)
- [ ] Collaboration features
- [ ] Task sharing via link
- [ ] Voice input for tasks

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

MIT License - feel free to use this project for learning purposes!

---

## 📚 Additional Resources

- [MDN Web Docs - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Responsive Web Design](https://web.dev/responsive-web-design-basics/)

---

**Happy Coding! 🚀**

*This is a sample project for ProjectHive. Replace this content with your actual project details when contributing.*
