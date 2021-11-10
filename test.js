const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

form.addEventListener("submit", (e) => {
  if (taskInput.value === "") {
    taskInput.style.borderBottom = "1px solid red";
    form.querySelectorAll("small").forEach((i) => {
      i.classList.add("warning");
    });
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  }

  // Stocker dans local storage
  storeTaskInLocalStorage(taskInput.value);

  //vider taskInput a la soumission du formulaire
  taskInput.value = "";
  e.preventDefault();
});

// MAINTENIR LES TACHES SUR LA PAGE
// ETAPE 1: CONVERSER LES TACHES DANS LOCAL STORAGE
function storeTaskInLocalStorage(inputData) {
  let tasks;
  if (localStorage.getItem("clef") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("clef"));
  }
  tasks.push(inputData);
  localStorage.setItem("clef", JSON.stringify(tasks));
}

// ETAPE 2: AFFICHE LES TACHES AUTOMATIQUEMENT AU CHARGEMENT DE LA PAGE
document.addEventListener("DOMContentLoaded", function () {
  let tasks;
  if (localStorage.getItem("clef") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("clef"));
  }

  // Créer la structure de l'element a afficher
  tasks.forEach((i) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(i));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
});

// SUPPRIMER TOUTES LES TACHES
clearBtn.addEventListener("click", function () {
  // methode 1:
  // taskList.innerHTML = "";
  // methode 2
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // SUPPRIMER TOUTES LES TACHES DU STOCKAGE LOCAL
  localStorage.clear();
});

// vider taskInput au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  taskInput.value = "";
});
