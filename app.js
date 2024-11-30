
// Load only "Done" tasks from localStorage on page load
function loadTasks() {
  const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];
  doneTasks.forEach(taskText => createTaskElement(taskText, true));
}

// Save "Done" tasks to localStorage
function saveTasks() {
  const doneTasks = Array.from(document.querySelectorAll('.done span')).map(task => task.innerText);
  localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
}

// Create a task element
function createTaskElement(taskText, isDone = false) {
  const taskList = document.getElementById('taskList');

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  if (isDone) {
    taskDiv.classList.add('done');
  }

  const taskTextElement = document.createElement('span');
  taskTextElement.innerText = taskText;

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.onclick = function () {
    if (!taskDiv.classList.contains('done')) {
      editTask(taskDiv, taskTextElement, editButton, deleteButton, doneButton);
    }
  };

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = function () {
    taskDiv.remove();
    saveTasks();
  };

  const doneButton = document.createElement('button');
  doneButton.innerText = 'Done';
  doneButton.onclick = function () {
    taskDiv.classList.add('done');
    saveTasks();
  };

  taskDiv.appendChild(taskTextElement);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(deleteButton);
  taskDiv.appendChild(doneButton);
  taskList.appendChild(taskDiv);
}

// Add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  if (taskInput.value.trim() === '') {
    alert('Please enter a text!');
    return;
  }

  createTaskElement(taskInput.value);
  taskInput.value = ''; // Clear input field
}

// Edit a task
function editTask(taskDiv, taskTextElement, editButton, deleteButton, doneButton) {
  const currentText = taskTextElement.innerText;

  // Hide text and buttons
  taskTextElement.style.display = 'none';
  editButton.style.display = 'none';
  deleteButton.style.display = 'none';
  doneButton.style.display = 'none';

  // Add input field for editing
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = currentText;

  const updateButton = document.createElement('button');
  updateButton.innerText = 'Update';
  updateButton.onclick = function () {
    if (editInput.value.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }

    // Update text
    taskTextElement.innerText = editInput.value;

    // Restore original state
    taskTextElement.style.display = 'inline';
    editButton.style.display = 'inline';
    deleteButton.style.display = 'inline';
    doneButton.style.display = 'inline';

    // Remove editing elements
    editInput.remove();
    updateButton.remove();
  };

  taskDiv.appendChild(editInput);
  taskDiv.appendChild(updateButton);
}

// Load "Done" tasks on page load
window.onload = loadTasks;
