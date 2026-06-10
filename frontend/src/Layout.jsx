import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      {/* NAVBAR */}
      <nav>
        <Link to="/about">About</Link> | 
        <Link to="/todo">Todo</Link>
      </nav>

      {/* PAGE CONTENT */}
      <Outlet />
    </div>
  );
}

export default Layout;