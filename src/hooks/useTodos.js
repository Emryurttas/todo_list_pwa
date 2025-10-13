import {useEffect, useState} from "react";
import {addApiTodo, deleteApiTodo, getApiTodos, updateApiTodo, isApiReachable} from "../services/todos.js";


export default function useTodos() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false);

    useEffect(() => {
        getAllTodos().catch((err) => {
            console.log(err.message);
            setNetworkError(true);
        });
    }, []);

    const getAllTodos = async function () {
        try {
            const data = await getApiTodos();
            setTodos(data);
            setNetworkError(false);
        } catch (err) {
            console.log(err.message);
            setNetworkError(true);
        } finally {
            setLoading(false);
        }
    };

    const getTodos = () => {
        getAllTodos();
    };

    const toggleTodo = (id) => {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        updateApiTodo({ ...todoToUpdate, done: !todoToUpdate.done })
            .then(() => getAllTodos())
            .catch((err) => {
                console.log(err.message);
                setNetworkError(true);
            });
    };

    const deleteTodo = (id) => {
        deleteApiTodo(id)
            .then(() => getAllTodos())
            .catch((err) => {
                console.log(err.message);
                setNetworkError(true);
            });
    };

    const updateTodo = (id, text) => {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        updateApiTodo({ ...todoToUpdate, text })
            .then(() => getAllTodos())
            .catch((err) => {
                console.log(err.message);
                setNetworkError(true);
            });
    };

    const addTodo = (text) => {
        addApiTodo(text)
            .then(() => getAllTodos())
            .catch((err) => {
                console.log(err.message);
                setNetworkError(true);
            });
    };
    const checkNetwork = async () => {
        const reachable = await isApiReachable();
        if (reachable) {
            console.log("Réseau disponible à nouveau !");
            setNetworkError(false);
            window.location.reload();
        } else {
            console.log("Réseau toujours indisponible.");
            setNetworkError(true);
        }
    };


    return {
        todos,
        isLoading,
        networkError,
        toggleTodo,
        addTodo,
        deleteTodo,
        updateTodo,
        getTodos,
        checkNetwork,
    };
}
