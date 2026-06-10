import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Smart Todo App </h1>
      <p>Plan your day and stay productive!</p>

      <div className="home-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Home;