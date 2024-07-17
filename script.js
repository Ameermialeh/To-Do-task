function getFromLocalStorage() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function taskExists(title) {
  return tasks.some((task) => task.title.toLowerCase() === title.toLowerCase());
}

function displayTasks() {
  if (document.getElementById("tasks").style.display == "block") {
    let taskCardsContainer = document.getElementById("taskCards");
    taskCardsContainer.innerHTML = "";

    tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    const incompleteTasks = tasks.filter((task) => !task.completed);

    incompleteTasks.forEach((task, index) => {
      let card = document.createElement("div");
      card.classList.add("task-card");

      let title = document.createElement("h3");
      title.textContent = task.title;

      let description = document.createElement("p");
      description.textContent = "Description: " + task.description;

      let date = document.createElement("p");
      date.textContent = new Date(task.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      date.classList.add("date");

      let completedBtn = document.createElement("button");
      completedBtn.classList.add("completed-btn");
      let completedIcon = document.createElement("img");
      completedIcon.src = "assets/done_btn.png";
      completedIcon.alt = "Done";
      completedBtn.appendChild(completedIcon);
      completedBtn.addEventListener("click", () => {
        task.completed = true;
        saveToLocalStorage(tasks);
        isEmptyList();
      });

      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      let deleteIcon = document.createElement("img");
      deleteIcon.src = "assets/delete-btn.png";
      deleteIcon.alt = "Delete";
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveToLocalStorage(tasks);
        isEmptyList();
      });

      card.appendChild(deleteBtn);
      card.appendChild(completedBtn);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(date);

      taskCardsContainer.appendChild(card);
    });
  } else if (document.getElementById("comptasks").style.display == "block") {
    /* Completed Tasks */
    let taskCardsContainer = document.getElementById("taskCardsComp");
    taskCardsContainer.innerHTML = "";

    tasks.sort((a, b) => new Date(b.date) - new Date(a.date));

    const completeTasks = tasks.filter((task) => task.completed);
    completeTasks.forEach((task, index) => {
      let card = document.createElement("div");
      card.classList.add("task-card-comp");

      let title = document.createElement("h3");
      title.textContent = task.title;

      let description = document.createElement("p");
      description.textContent = "Description: " + task.description;

      let date = document.createElement("p");
      date.textContent = new Date(task.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      date.classList.add("date");

      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      let deleteIcon = document.createElement("img");
      deleteIcon.src = "assets/delete-btn.png";
      deleteIcon.alt = "Delete";
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveToLocalStorage(tasks);
        isEmptyList();
      });

      card.appendChild(deleteBtn);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(date);

      taskCardsContainer.appendChild(card);
    });
  }
}
let tasks = getFromLocalStorage();

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".sectionLeft").forEach((section) => {
    section.style.display = "none";
  });
  // Show the selected section
  document.getElementById(sectionId).style.display = "block";
  isEmptyList();
}

function addTask() {
  let title = document.getElementById("taskTitle").value.trim();
  let description = document.getElementById("taskDescription").value.trim();

  // Validate input
  if (title === "" || description === "") {
    alert("Please enter both title and description.");
    return;
  }

  // if the task already exists
  if (taskExists(title)) {
    alert("Task with the same title already exists!");
    return;
  }

  let newTask = {
    title: title,
    description: description,
    completed: false,
    date: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveToLocalStorage(tasks);

  console.log(tasks);
  isEmptyList();
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
}

function isEmptyList() {
  if (tasks.length === 0) {
    document.getElementById("no-task1").style.display = "block";
    document.getElementById("no-task2").style.display = "block";
  } else {
    let allCompleted = tasks.every((task) => task.completed);
    if (allCompleted) {
      document.getElementById("no-task1").style.display = "block";
      document.getElementById("no-task2").style.display = "none";
    } else {
      document.getElementById("no-task1").style.display = "none";
      document.getElementById("no-task2").style.display = "block";
    }
  }
  displayTasks();
}

function clearAllTasks(taskStatus) {
  if (confirm("Are you sure you want to delete all tasks?")) {
    if (taskStatus) {
      tasks = tasks.filter((task) => task.completed);
      saveToLocalStorage(tasks);
      isEmptyList();
    } else {
      tasks = tasks.filter((task) => !task.completed);
      saveToLocalStorage(tasks);
      isEmptyList();
    }
  }
}

// when the page loads
document.addEventListener("DOMContentLoaded", () => {
  showSection("tasks");
});
