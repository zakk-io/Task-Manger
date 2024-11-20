const singletaskform = document.getElementById("single-task-form")
const taskeditid = document.getElementById("task-edit-id")
const taskeditname = document.getElementById("task-edit-name")
const taskeditcompleted = document.getElementById("task-edit-completed")
const formalert = document.getElementById("form-alert")

const task_id = new URLSearchParams(window.location.search).get("id")

//get task
const GetTask = async function(task_id){
  const response = await fetch(`/api/tasks/${task_id}`)
  
  console.log(response);
  
  if(response.redirected){
    window.location.href = response.url
    return
  }else{
    const data = await response.json()
    taskeditid.innerText = data.task._id
    taskeditname.value = data.task.name
    taskeditcompleted.checked = data.task.complate    
  }

}
//get task


//update task

singletaskform.addEventListener('submit',async (e) => {
  e.preventDefault()

  const body = {
    name:taskeditname.value,
    complate : taskeditcompleted.checked
  }
  const response = await fetch(`/api/tasks/${task_id}`,{
    method : 'PUT',
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify(body)
  })

  if(response.redirected){
    window.location.href = response.url
    console.log(response.url);
    
    return;
  }

})

//update task




GetTask(task_id)



