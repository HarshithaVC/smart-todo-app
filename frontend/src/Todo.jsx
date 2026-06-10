import { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.css";

const BASE_URL = "https://smart-todo-app-0nap.onrender.com";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [popup, setPopup] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  async function getTodos() {
    try {
      const res = await axios.get(`${BASE_URL}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function handleSubmit() {
    if (!text.trim()) return;

    try {
      if (editId) {
        await axios.put(
          `${BASE_URL}/api/todos/${editId}`,
          { text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditId(null);
      } else {
        await axios.post(
          `${BASE_URL}/api/todos`,
          { text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setText("");
      getTodos();

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`${BASE_URL}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPopup(true);
      setTimeout(() => setPopup(false), 2000);

      getTodos();
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(todo) {
    setText(todo.text);
    setEditId(todo._id);
  }

  return (
    <div>
      <h1>Todo List</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {popup && <div className="popup">Deleted ✅</div>}

      {todos.map((todo) => (
        <div key={todo._id} className="todo-card">
          <h3>{todo.text}</h3>

          <div className="btn-group">
            <button onClick={() => startEdit(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;