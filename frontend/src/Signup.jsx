import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    if (!email || !password) {
      alert("Enter all fields");
      return;
    }

    try {
      await axios.post(
        "https://smart-todo-app-0nap.onrender.com/api/auth/signup",
        {
          email,
          password,
        }
      );

      alert("Signup successful ✅");
      navigate("/login");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  }

  return (
    <div>
      <h1>Signup</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;