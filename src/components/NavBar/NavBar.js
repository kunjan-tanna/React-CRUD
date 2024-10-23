import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../../Routes/Routes";
import { AuthContext } from "../../context/AuthContext";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const { loggedInUser, logout } = useContext(AuthContext);
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

        {loggedInUser?.isAuthenticated && (
          <Box className={styles.container}>
            <Button
              color="inherit"
              component={NavLink}
              to={routes.LISTPRODUCTS}
              sx={{
                color: "inherit",
                "&.active": {
                  color: "#ff4081",
                  fontWeight: "bold",
                },
              }}
              // className={({ isActive }) =>
              //   isActive ? styles.activeTab : undefined
              // }
            >
              Products
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to={routes.EDITPROFILE}
              sx={{
                color: "inherit",
                "&.active": {
                  color: "#ff4081",
                  fontWeight: "bold",
                },
              }}
              // className={({ isActive }) =>
              //   isActive ? styles.activeTab : undefined
              // }
            >
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
