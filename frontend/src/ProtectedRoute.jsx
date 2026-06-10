import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("loggedInUser");

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;