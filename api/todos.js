let todos = [
  {
    text: "Finir les sujets précédentsss",
    done: true,
    id: 1
  },
  {
    text: "Bien lire le sujet en cours et les documentations",
    done: false,
    id: 3
  },
  {
    text: "Vérifier que mon enseignant est bien ajouté en reporter de mon dépot gitlab",
    done: false,
    id: 2
  },
  {
    text: "Apporter des chouquettes à mon enseignants de TP",
    done: false,
    id: 5
  }
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH");

  // GET
  if (req.method === "GET") {
    return res.status(200).json({ todos });
  }

  // POST
  if (req.method === "POST") {
    const newTodo = { ...req.body, id: Date.now() };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  }

  // DELETE
  if (req.method === "DELETE") {
    const { id } = req.body;
    todos = todos.filter(t => t.id !== id);
    return res.status(200).json({ ok: true });
  }

  // PATCH
  if (req.method === "PATCH") {
    const updated = req.body;

    todos = todos.map(t =>
      t.id === updated.id ? { ...t, ...updated } : t
    );

    return res.status(200).json(updated);
  }

  return res.status(405).json({ message: "Method not allowed" });
}