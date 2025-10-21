document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const taskList = document.getElementById('task-list');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');

    // Load tasks from LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- Main Render Function ---
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sort by deadline

        if (tasks.length === 0) {
            taskList.innerHTML = `<p class="text-center text-gray-500">No tasks yet. Add one above!</p>`;
        } else {
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                const isCompleted = task.completed;
                const today = new Date().toISOString().split('T')[0];
                const isOverdue = !isCompleted && task.deadline < today;

                let cardColorClass = 'bg-white';
                if (isCompleted) {
                    cardColorClass = 'bg-green-100';
                } else if (isOverdue) {
                    cardColorClass = 'bg-red-100';
                }
                
                taskItem.className = `task-item flex items-center p-4 rounded-lg shadow-sm ${cardColorClass} ${isCompleted ? 'completed' : ''}`;
                taskItem.dataset.id = task.id;

                taskItem.innerHTML = `
                    <div class="flex-grow">
                        <p class="font-semibold text-lg ${isCompleted ? 'text-gray-500' : 'text-gray-800'}">${task.text}</p>
                        <p class="text-sm ${isCompleted ? 'text-gray-400' : isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'}">
                            <i class="fa-regular fa-calendar"></i> Deadline: ${task.deadline} ${isOverdue ? '(Overdue!)' : ''}
                        </p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <button class="toggle-btn text-2xl">${isCompleted ? '<i class="fa-solid fa-square-check text-green-600"></i>' : '<i class="fa-regular fa-square text-gray-400"></i>'}</button>
                        <button class="edit-btn text-blue-500 hover:text-blue-700"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                taskList.appendChild(taskItem);
            });
        }
        updateProgress();
    };

    // --- Update Progress Bar ---
    const updateProgress = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        
        progressText.textContent = `${completedTasks}/${totalTasks} tasks done`;

        if (totalTasks === 0) {
            progressBar.style.width = '0%';
        } else {
            const percentage = (completedTasks / totalTasks) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    };
    
    // --- Save tasks to LocalStorage ---
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // --- Event: Add a Task ---
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const taskDeadline = taskDeadlineInput.value;

        if (taskText === '' || taskDeadline === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            deadline: taskDeadline,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        taskInput.value = '';
        taskDeadlineInput.value = '';
    });

    // --- Event: Click on a Task (Toggle, Edit, Delete) ---
    taskList.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = Number(taskItem.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        
        // Toggle complete
        if (e.target.closest('.toggle-btn')) {
            task.completed = !task.completed;
        }
        
        // Delete task
        if (e.target.closest('.delete-btn')) {
            tasks = tasks.filter(t => t.id !== taskId);
        }
        
        // Edit task
        if (e.target.closest('.edit-btn')) {
            const newText = prompt('Edit your task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
            }
        }
        
        saveTasks();
        renderTasks();
    });

    // Initial render
    renderTasks();
});
