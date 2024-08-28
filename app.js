document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {

    e.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let dueTime = document.getElementById('dueTime').value;
    // agregando la fecha y hora tando de ingreso de la tarea y tambien fecha y hora pautada
    let dueDateTime = new Date(dueDate + 'T' + dueTime);
    let formattedDueDateTime = dueDateTime.toLocaleString();
    
    let dateTime = new Date();
    let formattedDateTime = dateTime.toLocaleString();

    const task = {
        title,
        description,
        dateTime: formattedDateTime,
        dueDateTime: formattedDueDateTime //aqui puse la fecha y hora
    };

    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();

    document.getElementById('formTask').reset();

}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksview = document.getElementById('tasks');

    tasksview.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        let dateTime = tasks[i].dateTime;
        let dueDateTime = tasks[i].dueDateTime;
       

        tasksview.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <p>${title} - ${description}</p>
                    <p>Due At: ${dueDateTime}</p>
                    <p> Created At: ${dateTime}</p>

                    <button class="btn btn-danger" onclick="deleteTask(${i})">Delete</button>
                </div>
            </div>
        `;
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')); 
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks(); // Llamar a getTasks inicialmente para cargar las tareas almacenadas

//  Funcion de verificar tiempo y eliminar las tareas gg
function CheckDueTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks){
        let currentTime = new Date().getTime(); 

        for (let i = 0; i < tasks.length; i++){
            let dueDateTime = new Date(tasks[i].dueDateTime).getTime();

            if ( currentTime > dueDateTime){
                tasks.splice(i, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                getTasks();
            }
        }
    }
}
setInterval(CheckDueTasks, 60000);