const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')
const errorMessage = document.querySelector('.error')

tasksContainer.style.display = "none";

const validateInput = () => {
    const inputIsEmpty = inputElement.value.trim().length === 0

    if(inputIsEmpty){
        inputElement.classList.add('error')
    } else {
        inputElement.classList.remove('error')
    }

    return !inputIsEmpty
}

const handleAddTask = () =>{
    const inputIsValid = validateInput()

    if (!inputIsValid){
        return inputElement.classList.add('error')
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')
    
    const taskContent = document.createElement('p')
    taskContent.innerText = inputElement.value
    
    if (taskItemContainer) { 
        tasksContainer.style.display = "block";
    }
    
    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('fa-solid')
    deleteItem.classList.add('fa-trash-can')

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer)

    inputElement.value = ''

    

}

const handleClick = (taskContent) =>{
    const tasks = tasksContainer.childNodes

    for(const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle('completed')
        }
    }

}

const handleDeleteClick = (taskItemContainer, taskContent) =>{
    const tasks = tasksContainer.childNodes

    for(const task of tasks){
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if(currentTaskIsBeingClicked){
            taskItemContainer.remove()
        }
    }

    if (tasksContainer.childNodes.length === 0) {
        tasksContainer.style.display = "none";
    }
}

inputElement.addEventListener('keypress', (event) => {
    const inputIsValid = validateInput()
    if(event.key === 'Enter' && inputIsValid){
        handleAddTask()
    }
})


const handleInputChange = () =>{
    const inputIsValid = validateInput()

    if (inputIsValid){
        return inputElement.classList.remove('error')
    }
}


addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('change', () => handleInputChange())