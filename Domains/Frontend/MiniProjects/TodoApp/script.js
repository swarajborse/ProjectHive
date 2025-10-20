// ==================== State Management ====================
let tasks = [];
let currentFilter = 'all';

// ==================== DOM Elements ====================
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');
const taskCounter = document.getElementById('taskCounter');
const emptyState = document.getElementById('emptyState');

// ==================== Initialize App ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
    renderTasks();
    updateTaskCounter();
});

// ==================== Event Listeners ====================

// Add task on button click
addBtn.addEventListener('click', handleAddTask);

// Add task on Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddTask();
    }
});

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.filter;
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        renderTasks();
    });
});

// Clear completed tasks
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// ==================== Core Functions ====================

/**
 * Handle adding a new task
 */
function handleAddTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    addTask(taskText);
    taskInput.value = '';
    taskInput.focus();
}

/**
 * Add a new task to the list
 * @param {string} text - The task description
 */
function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasksToStorage();
    renderTasks();
    updateTaskCounter();
}

/**
 * Toggle task completion status
 * @param {number} id - The task ID
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        updateTaskCounter();
    }
}

/**
 * Delete a task
 * @param {number} id - The task ID
 */
function deleteTask(id) {
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    
    if (taskElement) {
        // Add removing animation
        taskElement.classList.add('removing');
        
        // Wait for animation to complete
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== id);
            saveTasksToStorage();
            renderTasks();
            updateTaskCounter();
        }, 300);
    }
}

/**
 * Clear all completed tasks
 */
function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasksToStorage();
        renderTasks();
        updateTaskCounter();
    }
}

/**
 * Render tasks based on current filter
 */
function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

/**
 * Create a task element
 * @param {Object} task - The task object
 * @returns {HTMLElement} - The task list item
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));
    
    // Task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    // Append elements
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    
    return li;
}

/**
 * Get filtered tasks based on current filter
 * @returns {Array} - Filtered tasks
 */
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

/**
 * Update task counter
 */
function updateTaskCounter() {
    const activeTasksCount = tasks.filter(t => !t.completed).length;
    taskCounter.textContent = activeTasksCount;
}

// ==================== LocalStorage Functions ====================

/**
 * Save tasks to localStorage
 */
function saveTasksToStorage() {
    try {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Load tasks from localStorage
 */
function loadTasksFromStorage() {
    try {
        const savedTasks = localStorage.getItem('todoTasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        tasks = [];
    }
}

// ==================== Utility Functions ====================

/**
 * Get formatted date
 * @param {string} isoString - ISO date string
 * @returns {string} - Formatted date
 */
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

/**
 * Export tasks to JSON file
 */
function exportTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todo-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// ==================== Debug Functions ====================

// Log current tasks (for debugging)
function logTasks() {
    console.log('Current Tasks:', tasks);
    console.log('Total:', tasks.length);
    console.log('Active:', tasks.filter(t => !t.completed).length);
    console.log('Completed:', tasks.filter(t => t.completed).length);
}

// Make debug function available in console
window.todoApp = {
    tasks,
    logTasks,
    exportTasks,
    clearAll: () => {
        if (confirm('Delete ALL tasks?')) {
            tasks = [];
            saveTasksToStorage();
            renderTasks();
            updateTaskCounter();
        }
    }
};

console.log('Todo App loaded! Type "todoApp" in console for debug functions.');
