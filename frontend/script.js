const API_URL = '/api/v1/secured/todos';

const createTable = (divID) => {
    const tableElement = document.createElement('table');
    const tableDiv = document.getElementById(divID);
    tableDiv.innerHTML = '';
    tableDiv.appendChild(tableElement);
    return tableElement;
};

const createTableHeader = (table, data) => {
    const TableHeader = table.createTHead();
    const row = TableHeader.insertRow();
    for (let element of data) {
        let title = document.createTextNode(element);
        let th = document.createElement("th");
        th.appendChild(title);
        row.appendChild(th);
    }
};

const createTableBody = (table, data) => {
    const TableBody = table.createTBody();
    for (let element of data) {
        let row = TableBody.insertRow();

        let cellId = row.insertCell();
        cellId.textContent = element.id.substring(0, 8);

        let cellTask = row.insertCell();
        cellTask.textContent = element.title;

        let cellStatus = row.insertCell();
        cellStatus.textContent = element.completed ? "Done" : "To-Do";

        let cellEdit = row.insertCell();
        let editBtn = document.createElement('button');
        editBtn.textContent = "Edit";
        cellEdit.appendChild(editBtn);

        let cellDel = row.insertCell();
        let delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        cellDel.appendChild(delBtn);

        let cellSave = row.insertCell();
        let saveBtn = document.createElement('button');
        saveBtn.textContent = "Save";
        cellSave.appendChild(saveBtn);

        row.dataset.id = element.id;
    }
};

const fetchTodos = async (search = '') => {
    try {
        let url = API_URL;
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) return;
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error(error);
    }
};

const renderTable = (data) => {
    const todobaslik = ["ID", "Task", "Status", "Edit", "Delete", "Save"];
    const todotable = createTable("todo_table");
    createTableHeader(todotable, todobaslik);
    createTableBody(todotable, data);
};

const addTodo = () => {
    const taskInput = document.querySelector('#task');
    const button = document.getElementById('add-button');

    button.onclick = async () => {
        const title = taskInput.value;
        if (!title) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title: title, completed: false })
            });
            if (response.ok) {
                taskInput.value = '';
                fetchTodos();
            }
        } catch (error) {
            console.error(error);
        }
    };
};

const deleteTodo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            fetchTodos();
        }
    } catch (error) {
        console.error(error);
    }
};

const updateTodo = async (id, title, completed) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ title: title, completed: completed })
        });
        fetchTodos();
    } catch (error) {
        console.error(error);
    }
};

const TodoActions = () => {
    const tableDiv = document.getElementById('todo_table');
    tableDiv.addEventListener('click', (clicked) => {
        const target = clicked.target;
        const row = target.closest('tr');
        if (!row) return;
        const id = row.dataset.id;

        if (target.textContent === 'Delete') {
            deleteTodo(id);
        } else if (target.textContent === 'Edit') {
            const statusCell = row.children[2];
            const currentStatus = statusCell.textContent;

            const select = document.createElement('select');
            const options = ["To-Do", "Done"];
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                if (opt === currentStatus) option.selected = true;
                select.appendChild(option);
            });
            statusCell.textContent = '';
            statusCell.appendChild(select);

            const taskCell = row.children[1];
            const currentTask = taskCell.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentTask;
            taskCell.textContent = '';
            taskCell.appendChild(input);

        } else if (target.textContent === 'Save') {
            const statusCell = row.children[2];
            const taskCell = row.children[1];

            let newStatus = statusCell.textContent;
            let newTask = taskCell.textContent;

            const statusInput = statusCell.querySelector('select');
            if (statusInput) {
                newStatus = statusInput.value;
            }

            const taskInput = taskCell.querySelector('input');
            if (taskInput) {
                newTask = taskInput.value;
            }

            const completed = newStatus === "Done";
            updateTodo(id, newTask, completed);
        }
    });
};

const addSearch = () => {
    const searchInput = document.querySelector('#search');
    const searchButton = document.querySelector('#search-button');

    searchButton.addEventListener('click', () => {
        fetchTodos(searchInput.value);
    });
};

window.onload = () => {
    fetchTodos();
    addTodo();
    TodoActions();
    addSearch();
};