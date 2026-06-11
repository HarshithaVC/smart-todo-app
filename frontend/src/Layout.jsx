import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/about">About</Link> |{" "}
        <Link to="/todo">Todo</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;