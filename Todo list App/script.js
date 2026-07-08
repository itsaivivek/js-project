let form = document.querySelector("#taskform")
let inp = document.querySelector("#newtask")
let tasksContainer = document.querySelector(".tasks")
let totalTasks = document.querySelector('#total')
let completedTasks = document.querySelector('#completed')
const themeSelect = document.querySelector('#themeSelect')

// sync the dropdown interface with saved localstorage option
function syncDropdownUI(){
  const currentSaved = localStorage.getItem('theme') || 'system'
  themeSelect.value = currentSaved;
}

// Manage theme visibility
function updateThemeVisibility(){
  const selectedMode = themeSelect.value;
  localStorage.setItem('theme', selectedMode)

  if(selectedMode === 'dark'){
    document.documentElement.classList.add('dark');
  } else if(selectedMode === 'light'){
    document.documentElement.classList.remove('dark');
  }
  else{
    // if system is active then select system preference
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', systemDark);
  }

}

// Reads the current DOM items and rewrite into localstorage correctly

function syncTasksToStorage(){
  const allTaskElements = tasksContainer.querySelectorAll(".task")
  const taskArray = []

  let totalCount = 0;
  let completedCount = 0;

  allTaskElements.forEach((taskEl) => {
    const title = taskEl.querySelector('h4').textContent;
    const isDone = taskEl.querySelector('.checkBox').checked;

    taskArray.push({title: title, isDone: isDone});

    totalCount++;
    if(isDone) completedCount++;
  }
  )

  // Update counters smoothly
  totalTasks.textContent = totalCount;
  completedTasks.textContent = completedCount;

  localStorage.setItem('mytasks', JSON.stringify(taskArray))
}

// Loads the task back on page
function fetchFromLocalStorage(){
  // clear the task container to prevent duplication
  tasksContainer.innerHTML = '';

  let tasks = []
  if(localStorage.getItem('mytasks')){
    tasks = JSON.parse(localStorage.getItem('mytasks'))
  }
  tasks.forEach((e) => {
    createTask(e.title, e.isDone)

    syncTasksToStorage(); // Recalculate numbers globally
  });

}

// Task creating function
let createTask = (taskTitle, isDone = false)=>{
 let taskdiv = document.createElement('div')
    taskdiv.className = "task hover:bg-neutral-300 dark:hover:bg-neutral-700 flex justify-between gap-4 items-center py-2 px-5 rounded-2xl"

    
    taskdiv.innerHTML = `<div class="flex items-center justify-start gap-4">
    <input class="checkBox cursor-pointer scale-150 accent-orange-600" type="checkbox" name="" id="">
    <h4 class="min-h-6 h-auto wrap-break-word"></h4>`

    taskdiv.querySelector('h4').textContent = taskTitle

    taskdiv.querySelector(".checkBox").checked = isDone;

    if(isDone){
      taskdiv.classList.add('taskFinished')
    }
    else{
      taskdiv.classList.remove('taskFinished')
    }
    
    let deleteBtn = document.createElement('button')
    deleteBtn.className = 'deleteBtn cursor-pointer dark:invert'
    deleteBtn.innerHTML = `<img src="./img/trash.svg" alt="">`
    
    taskdiv.appendChild(deleteBtn)

    tasksContainer.appendChild(taskdiv);
    
}


function main(){

  syncDropdownUI()

// 2. Refresh initial class state based on current select values
updateThemeVisibility();

// listen for manual dropdown
themeSelect.addEventListener('change', updateThemeVisibility)

// listen for system theme in background
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // if user selected sytem then only adjust UI 
      if(themeSelect.value === 'system'){
        document.documentElement.classList.toggle('dark', e.matches)
      }
}
)


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let taskTitle = inp.value.trim();
    // if inp.value has some string then only task will be created
    if(taskTitle){
      createTask(taskTitle, false);
      syncTasksToStorage();
    }
    inp.value = ''
}
)

// Event Delegation for checkbox and deleteBtn
tasksContainer.addEventListener('click', (event) => {
    // look for button, even if img was clicked
  const deleteButton = event.target.closest('.deleteBtn')

  // if deleteButton exist or lclicked
  if(deleteButton){
    // select the task div 
    const parentDiv = deleteButton.closest('.task')

    // if there was task div 
    if(parentDiv){
        parentDiv.remove() // removing task div
        syncTasksToStorage(); // sync the changes
    }
  }
  
  // look for checkbox
  const checkBox = event.target.closest('.checkBox')
  
  // if checkBox clicked 
  if(checkBox){
    // select the task div
    const parentDiv = checkBox.closest('.task')

    // if parentDiv exist
    if(parentDiv){
      if(checkBox.checked){
          parentDiv.classList.add('taskFinished')
        }
        else{
          parentDiv.classList.remove('taskFinished')
        }
        syncTasksToStorage() // Save the changes
    }
  }
}
)

fetchFromLocalStorage();

}

main()