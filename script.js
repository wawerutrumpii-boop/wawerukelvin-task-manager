let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const taskList = document.getElementById('taskList');
// Load tasks on page load
displayTasks();
function addTask() {
const taskText = taskInput.value.trim();
const category = categorySelect.value;
if (taskText) {
tasks.push({
text: taskText,
category: category,
completed: false
});
taskInput.value = '';
saveTasks();
displayTasks();
}
}
function deleteTask(index) {
tasks.splice(index, 1);
saveTasks();
displayTasks();
}
function toggleTask(index) {
tasks[index].completed = !tasks[index].completed;
saveTasks();
displayTasks();
}
function displayTasks() {
taskList.innerHTML = '';
tasks.forEach((task, index) => {
const li = document.createElement('li');
li.className = `task-item ${task.category} ${task.completed ? 'completed' : ''}`;
const categoryNames = {
work: '💼 Work',
personal: '⭐ Personal',
shopping: '🛒 Shopping'
};
li.innerHTML = `
<input type="checkbox" ${task.completed ? 'checked' : ''}
onchange="toggleTask(${index})">
<span class="category-badge">${categoryNames[task.category]}</span>
<span>${task.text}</span>
<button onclick="deleteTask(${index})">Delete</button>
`;
taskList.appendChild(li);
});
}
function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Enter key support
taskInput.addEventListener('keypress', function(e) {
if (e.key === 'Enter') addTask();
});