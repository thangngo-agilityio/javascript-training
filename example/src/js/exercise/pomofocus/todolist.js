function todoList() {
  // let todoItems = [];
  // // Render the todoItems
  // function renderTodo(todo) {
  //   const item = document.querySelector(`[data-key='${todo.id}']`)
  //   console.log(item);

  //   if (todo.deleted) {
  //     item.remove()
  //     return
  //   }

  //   const isChecked = todo.checked ? 'done' : '';
  //   const node = document.createElement('li');
  //   node.setAttribute('class', `todo-item ${isChecked}`);
  //   node.setAttribute('data-key', todo.id);
  //   node.innerHTML = `
  //   <div class="todo-content">
  //     <input id="${todo.id}" type="checkbox" hidden/>
  //     <label for="${todo.id}" class="item-tick js-tick"></label>
  //     <p class="item-desc">${todo.text}</p>
  //   </div>
  //   <div class="todo-feature">
  //     <button class="btn btn-delete">Delete</button>
  //     <button class="btn btn-edit">Edit</button>
  //   </div>
  // `;

  //   if (item) {
  //     list.replaceChild(node, item);
  //   } else {
  //     list.append(node);
  //     form.style.display = 'none';
  //   }
  // }

  // // function addTodo create a new todo object, entered in the text input, and push it into the todoItem array
  // function addTodo(text) {
  //   const todo = {
  //     text,
  //     checked: false,
  //     id: Date.now()
  //   };

  //   todoItems.push(todo);
  //   renderTodo(todo)
  // }


  // // Mark a task as completed
  // function toggleDone(key) {
  //   const index = todoItems.findIndex(item => {
  //     item.id === Number(key)
  //   });
  //   todoItems[index].checked = !todoItems[index].checked;
  //   renderTodo(todoItems[index]);
  // }

  // function deleteTodo(key) {
  //   const index = todoItems.findIndex( i => i.id === Number(key))

  //   const todo = {
  //     deleted: true,
  //     ...todoItems[index]
  //   };
  //   todoItems = todoItems.filter(i => i.id !== Number(key));
  //   renderTodo(todo)
  // }

  // const list = document.querySelector('.js-todo-list');


  // const addBtn = document.getElementById('btn-add');
  // addBtn.addEventListener('click', () => {
  //   form.style.display = 'flex'
  //   const delBtn = document.getElementById('btn-del')
  //   delBtn.style.display = 'none'
  // })

  // form.addEventListener('submit', event => {
  //   event.preventDefault();

  //   const input = document.querySelector('#js-todo-input');

  //   const text = input.value.trim()
  //   if (text !== '') {
  //     addTodo(text);
  //     input.value = '';
  //     input.focus();
  //   }
  // });

  // const btnCancel = document.querySelector('.btn-cancel')
  // btnCancel.addEventListener('click', () => {
  //   form.style.display = 'none'
  // })

  // // Mark a task as completed
  // list.addEventListener('click', event => {
  //   if (event.target.classList.contains('js-tick')) {
  //     const itemKey = event.target.parentElement.dataset.key;
  //     toggleDone(itemKey)
  //   }
  //   if (event.target.classList.contains('btn-delete')) {
  //     const itemKey = event.target.parentElement.dataset.key;
  //   deleteTodo(itemKey); 
  //   }
  // });


  const inputItem = document.getElementById('js-todo-input');
  const todoList = document.getElementById('js-todo-list');
  const form = document.getElementById('js-form');
  const btnAdd = document.getElementById('btn-add');


  btnAdd.addEventListener('click', () => {
    form.style.display = 'flex';
    const delBtn = document.getElementById('btn-del');
    delBtn.style.display = 'none';
  })

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (inputItem.value === '') {
      alert("You must write something!");
    } else {
      let li = document.createElement("li");
      li.setAttribute('class', 'todo-item')
      todoList.append(li);

      const divContent = document.createElement('div')
      divContent.setAttribute('class', 'todo-content');

      const inputCheck = document.createElement('input')
      inputCheck.setAttribute('type', 'checkbox');
      inputCheck.setAttribute('id', 'checked');
      inputCheck.style.display = 'none'
      const labelCheck = document.createElement('label')
      labelCheck.setAttribute('for', 'checked');
      labelCheck.setAttribute('class', 'item-tick');
      const inputDesc = document.createElement('input')
      inputDesc.setAttribute('class', 'item-desc');
      inputDesc.setAttribute('id', 'item-desc');
      inputDesc.setAttribute('type', 'text');
      inputDesc.setAttribute('value', `${inputItem.value}`);
      inputDesc.setAttribute('readonly', 'readonly');
      divContent.append(inputCheck, labelCheck, inputDesc)

      const divFeature = document.createElement('div')
      divFeature.setAttribute('class', 'todo-feature')
      li.append(divContent, divFeature)

      const btnDelete = document.createElement('button')
      btnDelete.setAttribute('class', 'btn btn-delete')
      btnDelete.innerHTML = "Delete";
      const btnEdit = document.createElement('button')
      btnEdit.setAttribute('class', 'btn btn-edit')
      btnEdit.innerHTML = "Edit";
      divFeature.append(btnEdit, btnDelete)

      btnEdit.addEventListener('click', () => {
        if (btnEdit.innerText.toLowerCase() == "edit") {
          inputDesc.removeAttribute("readonly");
          inputDesc.focus();
          btnEdit.innerText = "Save";
        } else {
          inputDesc.setAttribute('readonly', 'readonly');
          btnEdit.innerText = "Edit"
        }
      })

      btnDelete.addEventListener('click', () => {
        todoList.removeChild(li)
      })

      form.style.display = 'none'
    }
    inputItem.value = "";
  })


}

export default todoList;
