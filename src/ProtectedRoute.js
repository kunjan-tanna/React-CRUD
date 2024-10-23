import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import routes from "./Routes/Routes";

const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  if (!loggedInUser?.isAuthenticated) {
    return <Navigate to={routes.SIGNIN} />;
  }

  return children;
};

export default ProtectedRoute;
