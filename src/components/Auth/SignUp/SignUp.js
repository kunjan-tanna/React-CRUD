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
import styles from "./SignUp.module.css";
import { AuthContext } from "../../../context/AuthContext";
import { displayLog } from "../../../utils/functions";
import routes from "../../../Routes/Routes";

const SignUp = () => {
  const { signup } = useContext(AuthContext);

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
    const response = signup(data);
    if (response.success) {
      displayLog(1, "User is Created");
      setTimeout(() => {
        navigate(routes.SIGNIN);
      }, 500);
    } else {
      displayLog(0, response.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className={styles.formContainer}>
        <Typography variant="h4" className={styles.formTitle}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName", {
                  required: "First Name is required",
                })}
                fullWidth
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                className={styles.formField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName", { required: "Last Name is required" })}
                fullWidth
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                className={styles.formField}
              />
            </Grid>

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
              <TextField
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                fullWidth
                label="Mobile"
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
                className={styles.formField}
              />
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
              <TextField
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                fullWidth
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                className={styles.formField}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth className={styles.submitButton}>
                Sign Up
              </Button>
              <Typography variant="body2" color="textSecondary" mt={2}>
                Already have an account?{" "}
                <NavLink to={routes.SIGNIN}>Login</NavLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
