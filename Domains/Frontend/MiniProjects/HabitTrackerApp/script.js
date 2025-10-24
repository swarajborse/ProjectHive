// DOM Elements
const habitName = document.getElementById("habitName");
const habitCategory = document.getElementById("habitCategory");
const habitFrequency = document.getElementById("habitFrequency");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitsContainer = document.getElementById("habitsContainer");
const totalHabitsEl = document.getElementById("totalHabits");
const currentStreakEl = document.getElementById("currentStreak");
const completionRateEl = document.getElementById("completionRate");
const weekDisplay = document.getElementById("weekDisplay");
const prevWeekBtn = document.getElementById("prevWeek");
const nextWeekBtn = document.getElementById("nextWeek");
const todayBtn = document.getElementById("todayBtn");
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const achievementsGrid = document.getElementById("achievementsGrid");
const viewToggleBtns = document.querySelectorAll(".toggle-btn");

// State
let habits = JSON.parse(localStorage.getItem("habits")) || [];
let currentWeekOffset = 0;
let habitToDelete = null;
let currentView = "week";

// Category Icons
const categoryIcons = {
  health: "💪",
  productivity: "⚡",
  mindfulness: "🧘",
  learning: "📚",
  social: "👥",
  other: "🎯",
};

// Initialize
init();

function init() {
  renderWeek();
  renderHabits();
  updateStats();
  updateAchievements();
  setupEventListeners();
}

function setupEventListeners() {
  addHabitBtn.addEventListener("click", addHabit);
  habitName.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addHabit();
  });
  prevWeekBtn.addEventListener("click", () => {
    currentWeekOffset--;
    renderWeek();
    renderHabits();
  });
  nextWeekBtn.addEventListener("click", () => {
    currentWeekOffset++;
    renderWeek();
    renderHabits();
  });
  todayBtn.addEventListener("click", () => {
    currentWeekOffset = 0;
    renderWeek();
    renderHabits();
  });
  cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.classList.add("hidden");
    habitToDelete = null;
  });
  confirmDeleteBtn.addEventListener("click", confirmDeleteHabit);

  viewToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewToggleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentView = btn.dataset.view;
      renderHabits();
    });
  });
}

function addHabit() {
  const name = habitName.value.trim();
  if (!name) {
    alert("Please enter a habit name");
    return;
  }

  const habit = {
    id: Date.now(),
    name: name,
    category: habitCategory.value,
    frequency: habitFrequency.value,
    createdAt: new Date().toISOString(),
    completions: {},
  };

  habits.push(habit);
  saveHabits();
  renderHabits();
  updateStats();
  updateAchievements();

  habitName.value = "";
  habitName.focus();
}

function deleteHabit(id) {
  habitToDelete = id;
  deleteModal.classList.remove("hidden");
}

function confirmDeleteHabit() {
  if (habitToDelete) {
    habits = habits.filter((h) => h.id !== habitToDelete);
    saveHabits();
    renderHabits();
    updateStats();
    updateAchievements();
    deleteModal.classList.add("hidden");
    habitToDelete = null;
  }
}

function toggleCompletion(habitId, dateStr) {
  const habit = habits.find((h) => h.id === habitId);
  if (habit) {
    if (habit.completions[dateStr]) {
      delete habit.completions[dateStr];
    } else {
      habit.completions[dateStr] = true;
    }
    saveHabits();
    renderHabits();
    updateStats();
    updateAchievements();
  }
}

function renderWeek() {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + currentWeekOffset * 7);

  weekDisplay.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dayCell = document.createElement("div");
    dayCell.className = "day-cell";

    const isToday = date.toDateString() === new Date().toDateString();
    if (isToday) {
      dayCell.classList.add("today");
    }

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    dayCell.innerHTML = `
            <div class="day-name">${dayNames[date.getDay()]}</div>
            <div class="day-date">${date.getDate()}</div>
        `;

    weekDisplay.appendChild(dayCell);
  }
}

function renderHabits() {
  if (habits.length === 0) {
    habitsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No habits yet</h3>
                <p>Start building better habits by adding your first one above!</p>
            </div>
        `;
    return;
  }

  habitsContainer.innerHTML = "";

  habits.forEach((habit) => {
    const habitRow = document.createElement("div");
    habitRow.className = "habit-row";

    const streak = calculateStreak(habit);
    const weekDates = getWeekDates();

    let checkboxesHTML = "";
    if (currentView === "week") {
      checkboxesHTML = weekDates
        .map((date) => {
          const dateStr = date.toISOString().split("T")[0];
          const isCompleted = habit.completions[dateStr];
          const isToday = date.toDateString() === new Date().toDateString();

          return `
                    <div class="day-checkbox ${
                      isCompleted ? "completed" : ""
                    } ${isToday ? "today-checkbox" : ""}"
                         onclick="toggleCompletion(${habit.id}, '${dateStr}')">
                        ${isCompleted ? "✓" : ""}
                    </div>
                `;
        })
        .join("");
    }

    habitRow.innerHTML = `
            <div class="habit-category-icon">
                ${categoryIcons[habit.category]}
            </div>
            <div class="habit-info">
                <h3>${habit.name}</h3>
                <div class="habit-meta">
                    <span>📅 ${habit.frequency}</span>
                    <span>📊 ${
                      Object.keys(habit.completions).length
                    } completions</span>
                </div>
            </div>
            ${
              currentView === "week"
                ? `
                <div class="habit-streak">
                    <span class="streak-number">${streak}</span>
                    <span>🔥 day streak</span>
                </div>
                <div class="habit-checkboxes">
                    ${checkboxesHTML}
                </div>
            `
                : `
                <div class="habit-streak">
                    <span class="streak-number">${streak}</span>
                    <span>🔥 day streak</span>
                </div>
            `
            }
            <div class="habit-actions">
                <button class="icon-btn delete-btn" onclick="deleteHabit(${
                  habit.id
                })">
                    🗑️
                </button>
            </div>
        `;

    habitsContainer.appendChild(habitRow);
  });
}

function getWeekDates() {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + currentWeekOffset * 7);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date);
  }
  return dates;
}

function calculateStreak(habit) {
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const dateStr = currentDate.toISOString().split("T")[0];
    if (habit.completions[dateStr]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

function updateStats() {
  // Total habits
  totalHabitsEl.textContent = habits.length;

  // Calculate longest current streak
  let maxStreak = 0;
  habits.forEach((habit) => {
    const streak = calculateStreak(habit);
    if (streak > maxStreak) {
      maxStreak = streak;
    }
  });
  currentStreakEl.textContent = maxStreak;

  // Calculate completion rate for current week
  if (habits.length === 0) {
    completionRateEl.textContent = "0%";
    return;
  }

  const weekDates = getWeekDates();
  let totalPossible = 0;
  let totalCompleted = 0;

  habits.forEach((habit) => {
    weekDates.forEach((date) => {
      if (date <= new Date()) {
        totalPossible++;
        const dateStr = date.toISOString().split("T")[0];
        if (habit.completions[dateStr]) {
          totalCompleted++;
        }
      }
    });
  });

  const rate =
    totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
  completionRateEl.textContent = rate + "%";
}

function updateAchievements() {
  const achievements = [
    {
      id: "first-streak",
      icon: "🔥",
      title: "First Streak",
      description: "Complete a habit for 3 days",
      check: () => habits.some((h) => calculateStreak(h) >= 3),
    },
    {
      id: "week-warrior",
      icon: "⚡",
      title: "Week Warrior",
      description: "Complete a habit for 7 days",
      check: () => habits.some((h) => calculateStreak(h) >= 7),
    },
    {
      id: "diamond-habit",
      icon: "💎",
      title: "Diamond Habit",
      description: "Complete a habit for 30 days",
      check: () => habits.some((h) => calculateStreak(h) >= 30),
    },
    {
      id: "perfect-week",
      icon: "🎯",
      title: "Perfect Week",
      description: "Complete all habits for a week",
      check: () => {
        if (habits.length === 0) return false;

        const weekDates = getWeekDates();
        const today = new Date();

        for (let habit of habits) {
          for (let date of weekDates) {
            if (date <= today) {
              const dateStr = date.toISOString().split("T")[0];
              if (!habit.completions[dateStr]) {
                return false;
              }
            }
          }
        }
        return true;
      },
    },
  ];

  achievementsGrid.innerHTML = "";

  achievements.forEach((achievement) => {
    const isUnlocked = achievement.check();

    const card = document.createElement("div");
    card.className = `achievement-card ${isUnlocked ? "unlocked" : "locked"}`;

    card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            </div>
        `;

    achievementsGrid.appendChild(card);
  });
}

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Make toggleCompletion and deleteHabit available globally
window.toggleCompletion = toggleCompletion;
window.deleteHabit = deleteHabit;
