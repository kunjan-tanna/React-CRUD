import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { AuthContext } from "../../../context/AuthContext";
import { displayLog } from "../../../utils/functions";
import routes from "../../../Routes/Routes";

const SignIn = () => {
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("FINAL", data);
    const response = login(data.email, data.password);
    if (response.success) {
      displayLog(1, "Login Successful");
      setTimeout(() => {
        navigate(routes.EDITPROFILE);
      }, 500);
    } else {
      displayLog(0, response.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className={styles.formContainer}>
        <Typography variant="h4" className={styles.formTitle}>
          Sign In
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                fullWidth
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                className={styles.formField}
              />
            </Grid>
            <Grid item xs={12}>
              <NavLink
                to={routes.FORGOTPASSWORD}
                className={styles.forgotPassword}
              >
                Forgot Password?
              </NavLink>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                    message:
                      "Password must be 8-32 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
                fullWidth
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                className={styles.formField}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth className={styles.submitButton}>
                Sign In
              </Button>
              <br />
              <br />
              <Typography variant="body2" className={styles.linkField}>
                Don't have an account?{" "}
                <NavLink to={routes.SIGNUP}>Create Account</NavLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
