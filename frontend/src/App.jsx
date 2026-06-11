import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Signup from "./Signup";
import Todo from "./Todo";

import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;