import Todo from "../models/todoModels.js";

// GET
export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// POST
export const createTodo = async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text
  });
  res.json(todo);
};

// DELETE
export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// ⭐ ADD THIS - UPDATE TODO
export const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};