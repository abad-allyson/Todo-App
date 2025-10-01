const form = document.querySelector("form");
const taskInput = document.getElementById("input");
const taskList = document.getElementById("taskList");
let tasks = [];

function saveTaskToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="checkbox" ${
      task.completed ? "checked" : ""
    }>
      <span>${task.item}</span>
      <svg class="delete-button" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
    `;

    if (task.completed) {
      li.classList.add("completed");
    }

    taskList.appendChild(li);

    const checkbox = li.querySelector(".checkbox");
    const deleteTask = li.querySelector(".delete-button");

    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      li.classList.toggle("completed", checkbox.checked);
      saveTaskToLocalStorage();
    });

    deleteTask.addEventListener("click", () => {
      tasks.splice(index, 1);
      addTask();
      saveTaskToLocalStorage();
    });
  });
  console.log(tasks);
  saveTaskToLocalStorage();
}

function submitForm(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    alert("Please enter a task.");
    return;
  }
  const task = { item: text, completed: false };
  tasks.push(task);
  taskInput.value = "";
  addTask();
  saveTaskToLocalStorage();
}

function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = savedTasks;
  addTask();
}

form.addEventListener("submit", submitForm);
loadTasksFromLocalStorage();
