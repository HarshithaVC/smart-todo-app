import { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [popup, setPopup] = useState(false);
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/todos";

  const token = localStorage.getItem("token");

  // ================= GET TODOS =================
  async function getTodos() {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(res.data);
    } catch (err) {
      console.error("GET ERROR:", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  // ================= ADD / UPDATE =================
  async function handleSubmit() {
    if (!text.trim()) return;

    try {
      if (editId) {
        await axios.put(
          `${API}/${editId}`,
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
          API,
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
      console.error("SUBMIT ERROR:", err.response?.data || err.message);
    }
  }

  // ================= DELETE =================
  async function deleteTodo(id) {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPopup(true);
      setTimeout(() => setPopup(false), 2000);

      getTodos();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  }

  // ================= EDIT =================
  function startEdit(todo) {
    setText(todo.text);
    setEditId(todo._id);
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      {/* INPUT */}
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

      {/* POPUP */}
      {popup && <div className="popup">Deleted ✅</div>}

      {/* LIST */}
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