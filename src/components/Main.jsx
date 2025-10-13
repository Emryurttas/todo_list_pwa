import TodoList from "./TodoList";
import FormAddTodo from "./FormAddTodo.jsx";
import useTodos from "../hooks/useTodos.js";
import { InstallPWAButton } from "./InstallPWAButton.jsx";
import { SWUpdateBanner } from "./SWUpdateBanner.jsx";

export default function Main() {
    const { todos, isLoading, toggleTodo, deleteTodo, updateTodo, addTodo } = useTodos();

    return (
        <main className="main" style={{ minHeight: "100vh", padding: "20px" }}>
            <SWUpdateBanner />

            <InstallPWAButton />

            <FormAddTodo addTodo={addTodo} />

            <TodoList
                todos={todos}
                isLoading={isLoading}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
            />
        </main>
    );
}
