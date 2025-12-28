// create table
const createTable = (divID) => {
    const tableElement = document.createElement('table'); 
    const tableDiv = document.getElementById(divID);
    tableDiv.appendChild(tableElement);
    return tableElement;
};

// create table header
const createTableHeader = (table, data) => {
    const TableHeader = table.createTHead();
    const row = TableHeader.insertRow(); 
    for (let element of data)
        {
            let title = document.createTextNode(element);
            let th = document.createElement("th");
            th.appendChild(title);
            row.appendChild(th);
        }
};

// create table body
const createTableBody = (table, data) => {
    const TableBody = table.createTBody();
    for (let element of data) // each object in array
        {
            let row = TableBody.insertRow();
            for (key in element) // each key in object
                {
                    let cell = row.insertCell();
                    if (key === 'del' || key === 'edit') {
                        const button = document.createElement('button');
                        button.textContent = element[key];
                        cell.appendChild(button);
                    } else {
                        let text = document.createTextNode(element[key]);
                        cell.appendChild(text);
                    }
                }
        }
};


// add todo function
const addTodo = () => {
    const task = document.querySelector('#task'); // variables
    const edit = "Edit";
    const del = "Delete";
    let id = localStorage.getItem('lastId') || 1;
    const status = "To-Do";
    const table = document.getElementById('todo_table');
    const button = document.getElementById('add-button');
    button.onclick = () => { // submit
        let tTask = document.createElement('td'); // create td elements
        let tStatus = document.createElement('td');
        let tId = document.createElement('td');
        let editBtn = document.createElement('button');
        let delBtn = document.createElement('button');
// set text content
        editBtn.textContent = edit;
        delBtn.textContent = del;

        tId.textContent = id;
        tTask.textContent = task.value;
        tStatus.textContent = status;

        let tr = document.createElement('tr');
// append td to tr
        tr.appendChild(tId);
        tr.appendChild(tTask);
        tr.appendChild(tStatus);
        tr.appendChild(editBtn);
        tr.appendChild(delBtn);


        table.appendChild(tr);
// save to local storage
        const todolist = JSON.parse(localStorage.getItem('todoTable')) || [];
        todolist.push({
            id: id,
            task: task.value,
            status: status,
            edit: edit,
            del: del
        });
        localStorage.setItem('todoTable', JSON.stringify(todolist));

        task.value = '';
        id++;

        // save last id to local storage
        localStorage.setItem('lastId', id);
    };
};

// action todo function
const TodoActions = () => {
    const table = document.getElementById('todo_table');
    table.addEventListener('click', (clicked) => {
        if (clicked.target.textContent === 'Delete') {
            const row = clicked.target.closest('tr'); 
            row.remove(); 
            const id = row.firstChild.textContent;
            let todolist = JSON.parse(localStorage.getItem('todoTable')) || [];
            todolist = todolist.filter(item => item.id != id);
            localStorage.setItem('todoTable', JSON.stringify(todolist));
            
        }
    });
};

//main function
window.onload = () => {
    const todobaslik = ["ID", "Task", "Status", "Edit", "Delete"];
    const todotable = createTable("todo_table");
    createTableHeader(todotable, todobaslik);
    const todolist = localStorage.getItem('todoTable');
    createTableBody(todotable, todolist ? JSON.parse(todolist) : []);
    addTodo();
    TodoActions();
    
};