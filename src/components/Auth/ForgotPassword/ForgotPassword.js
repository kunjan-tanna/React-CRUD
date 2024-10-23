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
import styles from "./ForgotPassword.module.css";
import { AuthContext } from "../../../context/AuthContext";
import { displayLog } from "../../../utils/functions";
import routes from "../../../Routes/Routes";

const ForgotPassword = () => {
  const { decryptPassword, users, forgotPassword } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const currentPassword = watch("currentPassword");

  const onSubmit = (data) => {
    // console.log("FINAL", data);
    const { currentPassword, password } = data;
    const usersData = users.find(
      (u) => decryptPassword(u.password) == currentPassword
    );
    if (usersData === undefined) {
      displayLog(
        0,
        "Current password is not the same as the user's current password"
      );
      return;
    }
    const response = forgotPassword(password, currentPassword);
    if (response.success) {
      displayLog(1, "Rest Password Success");
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
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("currentPassword", {
                  required: "Current Password is required",
                })}
                fullWidth
                label="Current Password"
                type="password"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
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
                  validate: (value) =>
                    value !== currentPassword ||
                    "New password should not be same as current password",
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
                Reset Password
              </Button>
              <Typography variant="body2" color="textSecondary" mt={2}>
                Remember the password? please click{" "}
                <NavLink to={routes.SIGNIN}>Login</NavLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
