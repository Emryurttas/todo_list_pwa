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
        try {
            const reachable = await isApiReachable();
            if (reachable) {
                console.log("Réseau disponible à nouveau !");
                setNetworkError(false);

                window.location.reload();
            } else {
                console.log("Réseau toujours indisponible");
                setNetworkError(true);
                alert("Le serveur est toujours inaccessible. Vérifiez votre connexion ou redémarrez l'API");
            }
        } catch (err) {
            console.log("Erreur lors de la vérification du réseau :", err.message);
            setNetworkError(true);
            alert("Erreur réseau. Impossible de recharger");
        }
    };

    useEffect(() => {
        const handleOnline = () => {
            console.log("Évènement ONLINE détecté");
            checkNetwork();
        };

        const handleOffline = () => {
            console.log("Évènement OFFLINE détecté");
            setNetworkError(true);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

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
