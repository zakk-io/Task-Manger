//list tasks
const taskscontainer = document.getElementById("tasks-container")

const ListTasks = async function(){
  const response = await fetch('/api/tasks',{
    method : "GET",
  })

  const data = await response.json()
  if(data.successful === true){
    var Tasks = ""
    for (let task = data.tasks.length - 1; task >= 0; task--) {
        const name = data.tasks[task].name
        const completed = data.tasks[task].complete

        Tasks += `<div class="single-task ${completed}">
                  <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                  <div class="task-links">
                  
                  <!-- edit link -->
                  <a href="task.html?id="  class="edit-link">
                  <i class="fas fa-edit"></i>
                  </a>
                  <!-- delete btn -->
                  <button type="button" class="delete-btn" data-id="">
                  <i class="fas fa-trash"></i>
                  </button>
                  </div>
                  </div>`
        
    }
    taskscontainer.innerHTML = Tasks
  }

}
//list tasks

//create task
const taskform = document.getElementById("task-form")
const taskinput = document.getElementById("task-input")
const formalert = document.getElementById("form-alert")

taskform.addEventListener('submit',async (e) => {
  e.preventDefault()

  const body = {
    name : taskinput.value,
    complate : false
  }

  const response = await fetch('/api/tasks',{
    method : "POST",
    headers : {"Content-Type": "application/json"},
    body : JSON.stringify(body)
  })

  const data = await response.json()
  if(data.status === 400){
    formalert.innerHTML = data.body
  }

  else if(data.status === 201){
    taskinput.value = ""
    formalert.innerHTML = data.message
    ListTasks()
  }
})
//create task



ListTasks()
