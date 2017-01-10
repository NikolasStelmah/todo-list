function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
    var task = document.getElementById('task').value;
 
    var todos = get_todos();
    todos.push({value: task, key: todos.length>0 ? todos[todos.length-1].key+1 : 0} )
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
    console.log(todos);
 
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}

function SortName() {

    var todos = get_todos();
    todos.sort(function (todoA, todoB) {
        if (todoA.value > todoB.value) {
            return 1;
        }
        if (todoA.name < todoB.name) {
            return -1;
        }
        return 0;
    });
    
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
    console.log(todos);

 
    return false;
}

function SortID() {
    var todos = get_todos();
    function compareKey(todoA, todoB) {
        return todoA.key - todoB.key;
    }
    todos.sort(compareKey);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
    console.log(todos);

 
    return false;
}
 
function show() {
    var todos = get_todos();
 
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i].value + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}
 
document.getElementById('add').addEventListener('click', add);
document.getElementById('SortID').addEventListener('click', SortID);
document.getElementById('SortName').addEventListener('click', SortName);
show();