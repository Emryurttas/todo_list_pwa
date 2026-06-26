let todos = [
  {
    text: "Finaliser les tâches en cours",
    done: true,
    id: 1
  },
  {
    text: "Lire la documentation du projet",
    done: false,
    id: 3
  },
  {
    text: "Vérifier la configuration du dépôt",
    done: false,
    id: 2
  },
  {
    text: "Préparer les éléments nécessaires au projet",
    done: false,
    id: 5
  }
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({ todos });
  }

  if (req.method === "POST") {
    const newTodo = {
      ...req.body,
      id: Date.now()
    };

    todos.push(newTodo);

    return res.status(201).json(newTodo);
  }

  if (req.method === "DELETE") {
    const id = Number(req.query.id);

    todos = todos.filter(t => t.id !== id);

    return res.status(200).json({ ok: true, id });
  }

  if (req.method === "PATCH") {
    const updated = req.body;

    todos = todos.map(t =>
      t.id === updated.id ? { ...t, ...updated } : t
    );

    return res.status(200).json(updated);
  }

  return res.status(405).json({ message: "Method not allowed" });
}