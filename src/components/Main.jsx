import TodoList from "./TodoList";
import FormAddTodo from "./FormAddTodo.jsx";
import useTodos from "../hooks/useTodos.js";
import { InstallPWAButton } from "./InstallPWAButton.jsx";
import { SWUpdateBanner } from "./SWUpdateBanner.jsx";

export default function Main() {
    const { todos, isLoading, toggleTodo, deleteTodo, updateTodo, addTodo, networkError, checkNetwork } = useTodos();

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
                    <div style={{ marginTop: "10px" }}>
                        <button
                            onClick={checkNetwork}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#990000",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Recharger
                        </button>
                    </div>
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

