
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a text!');
        return;
    }

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskSpan = document.createElement('span');
    taskSpan.innerText = taskInput.value;

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit ✏️';
    editButton.onclick = () => editTask(taskDiv, taskSpan);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete ❌';
    deleteButton.onclick = () => deleteTask(taskDiv);

    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);

    taskList.appendChild(taskDiv);

    taskInput.value = ''; // Clear input field
}

function editTask(taskDiv, taskSpan) {
    const currentText = taskSpan.innerText;

    // Hide current text and buttons
    taskSpan.style.display = 'none';
    taskDiv.querySelectorAll('button').forEach(btn => btn.style.display = 'none');

    // Add input field for editing
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;

    const updateButton = document.createElement('button');
    updateButton.innerText = 'Update ✔️';
    updateButton.onclick = () => updateTask(taskDiv, taskSpan, editInput);

    taskDiv.appendChild(editInput);
    taskDiv.appendChild(updateButton);
}

function updateTask(taskDiv, taskSpan, editInput) {
    if (editInput.value.trim() === '') {
        alert('Task cannot be empty!');
        return;
    }

    // Update the task text
    taskSpan.innerText = editInput.value;

    // Remove edit input and update button
    editInput.remove();
    taskDiv.querySelector('button:last-child').remove();

    // Show the updated task and buttons
    taskSpan.style.display = 'inline';
    taskDiv.querySelectorAll('button').forEach(btn => btn.style.display = 'inline');
}

function deleteTask(taskDiv) {
    taskDiv.remove(); // Remove task from the list
}
