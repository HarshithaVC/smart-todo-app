import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ STORE USER EMAIL (FIXED)
      localStorage.setItem("user", res.data.user.email);

      // ✅ REDIRECT TO ABOUT PAGE (as you wanted)
      navigate("/about");

    } catch (err) {
      alert("Invalid login");
      console.error(err.response?.data || err.message);
    }
  }

  return (
    <div className="page">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
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