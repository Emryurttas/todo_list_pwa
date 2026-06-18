const api =
  import.meta.env.VITE_API_URL ||
  "/api/todos";

export async function getApiTodos() {
  const resp = await fetch(api);

  if (!resp.ok) {
    throw new Error(`todos network error: ${resp.status}`);
  }

  const data = await resp.json();
  return data.todos || data;
}

export async function addApiTodo(text) {
  const resp = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      done: false
    })
  });

  if (!resp.ok) {
    throw new Error(`todos network error: ${resp.status}`);
  }

  return resp.json();
}

export async function updateApiTodo(todo) {
  const resp = await fetch(api, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  });

  if (!resp.ok) {
    throw new Error(`todos network error: ${resp.status}`);
  }

  return resp.json();
}

export async function deleteApiTodo(id) {
  const resp = await fetch(`${api}?id=${id}`, {
    method: "DELETE"
  });

  if (!resp.ok) {
    throw new Error(`todos network error: ${resp.status}`);
  }
}

export async function isApiReachable() {
  try {
    const resp = await fetch(api, { method: "GET" });
    return resp.ok;
  } catch (error) {
    console.error("Erreur réseau détectée:", error.message);
    return false;
  }
}