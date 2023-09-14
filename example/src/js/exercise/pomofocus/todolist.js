function todoList() {
  let todoItems = [];

  // Render the todoItems
  function renderTodo(todo) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));

    const list = document.querySelector(".js-todo-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
      item.remove();
      return;
    }

    const isChecked = todo.checked ? "done" : "";
    const node = document.createElement("li");
    node.setAttribute("class", `todo-item ${isChecked}`);
    node.setAttribute("data-key", todo.id);
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox" hidden/>
    <label for="${todo.id}" class="item-tick js-tick"></label>
    <p class="item-desc">${todo.text}</p>
    <button class="btn btn-delete">Delete</button>
    <button class="btn btn-edit">Edit</button>
  `;

    if (item) {
      list.replaceChild(node, item);
    } else {
      list.append(node);
      form.style.display = "none";
    }
  }

  function addTodo(text) {
    const todo = {
      text,
      checked: false,
      id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
  }

  // Mark a task as completed
  function toggleDone(key) {
    const index = todoItems.findIndex((item) => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
  }

  // function delete todo item
  function deleteTodo(key) {
    const index = todoItems.findIndex((i) => i.id === Number(key));

    const todo = {
      deleted: true,
      ...todoItems[index],
    };

    todoItems = todoItems.filter((i) => i.id !== Number(key));
    renderTodo(todo);
  }

  function editTodo(key) {
    const index = todoItems.findIndex((item) => item.id === Number(key));

    const input = document.querySelector(".js-todo-input");

    input.value = todoItems[index].text
    form.style.display = 'flex'
    form.setAttribute('id', key)
  }

  const addBtn = document.getElementById("btn-add");
  addBtn.addEventListener("click", () => {
    form.style.display = "flex";
  });


  const form = document.querySelector(".js-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector(".js-todo-input");

    let taskId = form.getAttribute('id')
    let task = localStorage.getItem("todoItems");

    if (taskId) {
      task[taskId] = {text: input.value}
    }
    else {
      todoItems.push({text: input.value})
    }

    const text = input.value.trim();
    if (text !== "") {
      addTodo(text);
      input.value = "";
      input.focus();
    }
    else {
      alert("You must write something!");
    }
  });

  const list = document.querySelector(".js-todo-list");
  list.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-tick")) {
      const itemKey = event.target.parentElement.dataset.key;
      toggleDone(itemKey);
    }

    if (event.target.classList.contains("btn-delete")) {
      const itemKey = event.target.parentElement.dataset.key;
      deleteTodo(itemKey);
    }

    if (event.target.classList.contains("btn-edit")) {
      const itemKey = event.target.parentElement.dataset.key;
      editTodo(itemKey)
    }
  });

  const btnCancel = document.querySelector(".btn-cancel");
  btnCancel.addEventListener("click", () => {
    form.style.display = "none";
  });

  window.document.addEventListener("DOMContentLoaded", () => {
    const ref = localStorage.getItem("todoItems");
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach((data) => {
        renderTodo(data);
      });
    }
  });
}

export default todoList;
