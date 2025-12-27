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



const addTodo = () => {
    const task = document.querySelector('#task');
    const status = "To-Do";
    const table = document.getElementById('todo_table');
    const button = document.getElementById('add-button');
    button.onclick = () => {
        let tTask = document.createElement('td');

        tTask.textContent = task.value;

        let tr = document.createElement('tr');

        tr.appendChild(tTask);

        table.appendChild(tr);

        task.value = '';
    };
    

};

//main function
window.onload = () => {
    const todobaslik = ["ID", "Task", "Status", "Edit", "Delete"];

    const todotable = createTable("todo_table");
    createTableHeader(todotable, todobaslik);
    addTodo();
    
};