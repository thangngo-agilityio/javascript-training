import TodoModel from "./model/todo";
import TodoView from "./view/todo";
import TodoController from "./controller/todo";

const app = new TodoController(new TodoModel(), new TodoView(TodoModel))

