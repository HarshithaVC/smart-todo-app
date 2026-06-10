import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://smart-todo-app-0nap.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      console.log("TOKEN:", res.data.token);

      // ✅ Redirect to TODO (MAIN PAGE)
      navigate("/todo");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Invalid login ❌");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;