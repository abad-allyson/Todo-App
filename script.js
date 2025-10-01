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
      <svg class="delete-button"xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#0e0e0eff"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/></svg>
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
