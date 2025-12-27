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
    for (let element of data)
        {
            let row = TableBody.insertRow();
            for (key in element)
                {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                }
        }
};


// add todo function
const addTodo = () => {
    const task = document.querySelector('#task');
    const edit = "Edit";
    const del = "Delete";
    let id = 1;
    const status = "To-Do";
    const table = document.getElementById('todo_table');
    const button = document.getElementById('add-button');
    button.onclick = () => {
        let tTask = document.createElement('td');
        let tStatus = document.createElement('td');
        let tId = document.createElement('td');
        let editBtn = document.createElement('td');
        let delBtn = document.createElement('td');

        editBtn.textContent = edit;
        delBtn.textContent = del;

        tId.textContent = id;
        tTask.textContent = task.value;
        tStatus.textContent = status;

        let tr = document.createElement('tr');

        tr.appendChild(tId);
        tr.appendChild(tTask);
        tr.appendChild(tStatus);
        tr.appendChild(editBtn);
        tr.appendChild(delBtn);


        table.appendChild(tr);

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
    };
    

};

//main function
window.onload = () => {
    const todobaslik = ["ID", "Task", "Status", "Edit", "Delete"];

    const todotable = createTable("todo_table");
    createTableHeader(todotable, todobaslik);
    const todolist = localStorage.getItem('todoTable');
    createTableBody(todotable, todolist ? JSON.parse(todolist) : []);
    addTodo();
    
    
};