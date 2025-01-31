
const taskInput = document.getElementById('inputTask');
const taskButton = document.getElementById('taskButton');
const taskList = document.getElementById('taskList');

window.addEventListener('DOMContentLoaded', loadTasks);

taskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    li.remove();
    removeTaskFromStorage(taskText); 
  });

  li.appendChild(deleteButton);

  taskList.appendChild(li);

  saveTaskToStorage(taskText);

  taskInput.value = '';
}

function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      li.remove();
      removeTaskFromStorage(task); 
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}