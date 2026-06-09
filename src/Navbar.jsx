import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>TodoApp</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link> {/* ✅ FIXED */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/todo">Todo</Link>
      </div>
    </nav>
  );
}

export default Navbar;