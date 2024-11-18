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

  else if(data.status === 200){
    formalert.innerHTML = data.message
  }
})


//create task
