import TodoList from "./TodoList";
import FormAddTodo from "./FormAddTodo.jsx";
import useTodos from "../hooks/useTodos.js";
import { InstallPWAButton } from "./InstallPWAButton.jsx";
import { SWUpdateBanner } from "./SWUpdateBanner.jsx";

export default function Main() {
    const { todos, isLoading, toggleTodo, deleteTodo, updateTodo, addTodo, networkError } = useTodos();

    return (
        <main className="main" style={{ minHeight: "100vh", padding: "20px" }}>
            <SWUpdateBanner />

            <InstallPWAButton />

            {networkError && (
                <div
                    style={{
                        backgroundColor: "#ffcccc",
                        color: "#990000",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "15px",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Vous êtes actuellement hors ligne ou le serveur est inaccessible.
                </div>
            )}

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
