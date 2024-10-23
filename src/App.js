import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import "./styles/variable.css";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import "alertifyjs/build/css/alertify.css";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import Navbar from "./components/NavBar/NavBar";
import EditProfile from "./components/EditProfile/EditProfile";
import { useContext } from "react";
import ProductList from "./components/Products/ProductList";
import ViewProduct from "./components/ViewProduct/ViewProduct";

function App() {
  const { loggedInUser } = useContext(AuthContext);
  console.log("loggedInUser", loggedInUser);
  return (
    <>
      <Router>
        {loggedInUser?.isAuthenticated && <Navbar />}
        <Routes>
          <Route path={routes.SIGNUP} element={<SignUp />} />
          <Route path={routes.SIGNIN} element={<SignIn />} />
          <Route path={routes.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route
            path={routes.EDITPROFILE}
            element={<ProtectedRoute>{<EditProfile />}</ProtectedRoute>}
          />
          <Route
            path={routes.LISTPRODUCTS}
            element={<ProtectedRoute>{<ProductList />}</ProtectedRoute>}
          />
          <Route
            path={routes.VIEWPRODUCT}
            element={<ProtectedRoute>{<ViewProduct />}</ProtectedRoute>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
