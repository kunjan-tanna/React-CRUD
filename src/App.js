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
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Router>
        <ProtectedRoute>
          <Navbar />
        </ProtectedRoute>
        <Routes>
          <Route path={routes.SIGNUP} element={<SignUp />} />
          <Route path={routes.SIGNIN} element={<SignIn />} />
          <Route path={routes.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route
            path={routes.EDITPROFILE}
            element={
              <ProtectedRoute>{/* <ChangePassword /> */}</ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
