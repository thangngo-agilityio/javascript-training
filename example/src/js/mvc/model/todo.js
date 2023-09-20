export default class TodoModel {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todoItems')) || [
    ]
  }

  _commit(todos) {
    this.onTodoListChanged(todos)
    localStorage.setItem('todoItems', JSON.stringify(todos))
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    }
    this.todos.push(todo)
    this._commit(this.todos)
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? {
        id: todo.id,
        text: updatedText,
        complete: todo.complete
      } : todo,
    )
    this._commit(this.todos)
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
    localStorage.setItem('todoItems', JSON.stringify(this.todos));

    this._commit(this.todos)
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) => 
      todo.id === id ? {
        id: todo.id,
        text: todo.text,
        complete: !todo.complete
      } : todo,
    )
    this._commit(this.todos)
  }
}
