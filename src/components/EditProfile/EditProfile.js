import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./EditProfile.module.css";
import { AuthContext } from "../../context/AuthContext";
import { displayLog } from "../../utils/functions";
import routes from "../../Routes/Routes";

const EditProfile = () => {
  const { loggedInUser, updateUser, users } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.isAuthenticated) {
      setValue("firstName", loggedInUser.firstName);
      setValue("lastName", loggedInUser.lastName);
      setValue("email", loggedInUser.email);
      setValue("mobile", loggedInUser.mobile);
    }
  }, [loggedInUser, setValue]);

  const onSubmit = (data) => {
    // console.log("FINAL", data);
    const emailExists = users.some(
      (user) => user.email === data.email && user.email !== loggedInUser.email
    );
    if (emailExists) {
      displayLog(0, "Email already exists");
      return;
    }
    console.log("emailExists", emailExists);

    const response = updateUser(data);
    if (response.success) {
      displayLog(1, "Profile Updated");
    } else {
      displayLog(0, response.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className={styles.formContainer}>
        <Typography variant="h4" className={styles.formTitle}>
          Edit Profile
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
                {...register("lastName", {
                  required: "Last Name is required",
                })}
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
              <Button type="submit" fullWidth className={styles.submitButton}>
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EditProfile;
