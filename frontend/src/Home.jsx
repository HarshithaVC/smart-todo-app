import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Smart Todo App</h1>
      <p>Plan your day and stay productive!</p>

      <Link to="/login"><button>Login</button></Link>
      <Link to="/signup"><button>Sign Up</button></Link>
    </div>
  );
}

export default Home;