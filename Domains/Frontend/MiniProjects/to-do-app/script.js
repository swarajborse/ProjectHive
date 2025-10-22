const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">✔️</button>
        <button onclick="deleteTodo(${index})">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function addTodo(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Init
renderTodos();
todoForm.addEventListener('submit', addTodo);
