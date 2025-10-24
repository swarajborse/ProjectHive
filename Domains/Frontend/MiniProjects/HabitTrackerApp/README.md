# 📊 Habit Tracker

**Contributor:** shr128  
**Domain:** Frontend  
**Difficulty:** Intermediate  
**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), LocalStorage API

---

<img width="1000" height="500" alt="Habit Tracker Screenshot" src="https://via.placeholder.com/1000x500/6366f1/ffffff?text=Habit+Tracker" />

---

## 📝 Description

A powerful and intuitive **Habit Tracker** that helps users build and maintain positive habits through visual tracking and gamification.
The app allows users to create custom habits, track daily completions, view streaks, and unlock achievements.
It features a **weekly view** with interactive checkboxes, real-time statistics, and persistent data storage!

Perfect for personal development, learning JavaScript DOM manipulation, local storage integration, and building engaging user interfaces.

---

## 🎯 Features

* ➕ Create custom habits with categories and frequencies
* 📅 Weekly calendar view with interactive completion tracking
* 🔥 Streak calculation and display
* 📊 Real-time statistics (total habits, current streak, completion rate)
* 🏆 Achievement system with unlockable badges
* 🗑️ Delete habits with confirmation modal
* 🔄 Navigate between weeks (previous/next/today)
* 💾 LocalStorage for persistent data
* 🎨 Beautiful gradient UI with smooth animations
* 📱 Fully responsive design

---

## 🛠️ Tech Stack

* **HTML5** - Semantic structure
* **CSS3** - Modern UI with gradients and animations
* **JavaScript (ES6+)** - Habit logic, DOM updates
* **LocalStorage API** - Store habits and completions

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone the repository
2. Open `index.html` in your browser
3. Add your first habit and start tracking!

### Method 2: Live Server (Recommended)

1. Install VS Code and Live Server extension
2. Right-click `index.html` → **Open with Live Server**
3. The app will open at `http://localhost:5500`

---

## 📁 Project Structure

```
HabitTracker/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # Habit tracking logic
└── README.md           # Project documentation
```

---

## 💻 Code Highlights

### Add Habit Function

```javascript
function addHabit() {
    const habit = {
        id: Date.now(),
        name: habitName.value.trim(),
        category: habitCategory.value,
        frequency: habitFrequency.value,
        createdAt: new Date().toISOString(),
        completions: {}
    };
    habits.push(habit);
    saveHabits();
}
```

### Streak Calculation Logic

```javascript
function calculateStreak(habit) {
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (habit.completions[dateStr]) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}
```

### LocalStorage Integration

```javascript
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
    habits = JSON.parse(localStorage.getItem('habits')) || [];
}
```

---

## 📚 Learning Outcomes

### Skills Practiced

* ✅ DOM Manipulation and event handling
* ✅ Dynamic UI rendering
* ✅ Date manipulation and formatting
* ✅ LocalStorage API usage
* ✅ State management in vanilla JavaScript
* ✅ CSS Grid and Flexbox layouts
* ✅ Responsive design principles

### Concepts Learned

* Building interactive dashboards
* Implementing streak tracking algorithms
* Creating achievement systems
* Managing complex state with plain JavaScript
* Designing intuitive user interfaces
* Persisting user data in browser storage

---

## 🎨 Customization Ideas

1. **Dark/Light Theme Toggle**
2. **Habit Categories with Custom Icons**
3. **Monthly View Calendar**
4. **Export Data to CSV/JSON**
5. **Habit Notes and Reflections**
6. **Reminder Notifications**
7. **Charts and Graphs** (using Chart.js)
8. **Social Sharing Features**
9. **Import/Export Habits**
10. **Custom Achievement Creator**

---

## 🐛 Known Issues

* None currently.
* If data doesn't persist, check browser's localStorage settings.

---

## 🚀 Future Enhancements

* [ ] Add monthly and yearly views
* [ ] Include habit analytics and insights
* [ ] Introduce habit reminders/notifications
* [ ] Add data export functionality
* [ ] Create habit templates library
* [ ] Implement habit notes feature
* [ ] Add charts for progress visualization
* [ ] Enable habit sharing with friends

---

## 📄 License

MIT License — Free to use, modify, and share!

---

## 🤝 Contributing

This project is open for contributions!  
Feel free to:

* Fork and improve
* Report issues
* Add new features
* Submit pull requests

---

**Build Better Habits! 📊🔥**