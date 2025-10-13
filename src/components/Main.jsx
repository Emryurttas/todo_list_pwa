import TodoList from "./TodoList";
import FormAddTodo from "./FormAddTodo.jsx";
import useTodos from "../hooks/useTodos.js";
import {InstallPWAButton} from "./InstallPWAButton.jsx";

export default function Main() {
  const { todos, isLoading, toggleTodo, deleteTodo, updateTodo, addTodo } = useTodos();

  return (
        <main className="main">
            <InstallPWAButton></InstallPWAButton>
            <FormAddTodo addTodo={addTodo} />
            <TodoList todos={todos} isLoading={isLoading} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        </main>
    )
}
