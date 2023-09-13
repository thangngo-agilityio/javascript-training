function todoList() {
  let todoItems = [];

  const addBtn = document.getElementById('btn-add');
  addBtn.addEventListener('click', () => {
    form.style.display = 'flex'
    const delBtn = document.getElementById('btn-del')
    delBtn.style.display = 'none'
  })

  // function addTodo create a new todo object, entered in the text input, and push it into the todoItem array
  function addTodo(text) {
    const todo = {
      text,
      checked: false,
      id: Date.now()
    };
    
    todoItems.push(todo);
    renderTodo(todo)
  }

  const form = document.getElementById('js-form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const input = document.querySelector('#js-todo-input');

    const text = input.value.trim()
    if(text !== '') {
      addTodo(text);
      input.value = '';
      input.focus();
    }
  });

  // Render the todoItems
  function renderTodo(todo) {
    const list = document.querySelector('#js-todo-list');

    const isChecked = todo.checked ? 'done': '';

    const node = document.createElement('li');
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
      <p>${todo.text}</p>
    `;

    list.append(node)
    form.style.display = 'none'
  }

}

export default todoList;
