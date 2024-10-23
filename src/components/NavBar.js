import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../Routes/Routes";
import { AuthContext } from "../context/AuthContext";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const { loggedInUser, logout } = useContext(AuthContext);
  console.log("loggedInUser...", loggedInUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(routes.SIGNIN);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" className={styles.navBarTitle}>
          React CRUD
        </Typography>

        {loggedInUser && (
          <Box className={styles.container}>
            <Button
              color="inherit"
              component={NavLink}
              to={routes.LISTPRODUCTS}
            >
              Products
            </Button>
            <Button color="inherit" component={NavLink} to={routes.EDITPROFILE}>
              Edit Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
