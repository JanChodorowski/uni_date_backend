import { Grid, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { changePassword } from "../../shared/api";
import {
  AUTO_HIDE_DURATION,
  DEFAULT_SPACE,
  STANDARD_MAX_WIDTH,
} from "../../shared/constants";
import { LoadingContext } from "../../shared/loadingContext";
import Slide from "@material-ui/core/Slide";
import { Alert } from "@material-ui/lab";
import PasswordVisibilityBtn from "../shared/PasswordVisibilityBtn";
import PublishIcon from "@material-ui/icons/Publish";

const PasswordChangeForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [areCredentialsCorrect, setAreCredentialsCorrect] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isUpdatedCorrectly, setIsUpdatedCorrectly] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      password: "",
    },
    validationSchema: yup.object({
      newPassword: yup
        .string("Enter a new password")
        .min(8, "Password should be of minimum 8 characters length")
        .notOneOf([yup.ref("password"), null], "Passwords must be different")
        .required("Password is required"),
      password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let { newPassword, password } = values;
      setAreCredentialsCorrect(true);
      setIsLoading(true);
      const trimmedNewPassword = newPassword.trim();
      changePassword(trimmedNewPassword, password)
        .then((res) => {
          if (!res.data.hasPasswordChanged) {
            return;
          }
          setIsUpdatedCorrectly(true);
          resetForm({ values: "" });
        })
        .catch((e) => {
          setAreCredentialsCorrect(false);
        })
        .finally(() => {
          setIsLoading(false);
          setSnackbarOpen(true);
        });
    },
  });

  return (
    <>
      <div style={{ maxWidth: STANDARD_MAX_WIDTH }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            wrap="nowrap"
            style={{ marginBottom: DEFAULT_SPACE }}
          >
            <Grid item>
              <TextField
                fullWidth
                id="newPassword"
                name="newPassword"
                label="New Password"
                value={formik.values.newPassword}
                type={showNewPassword ? "text" : "password"}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                autoFocus
                size="small"
                style={{ marginBottom: DEFAULT_SPACE }}
                autoComplete="new-password"
                onFocus={(event) => {
                  event.target.setAttribute("autocomplete", "off");
                }}
              />
            </Grid>
            <Grid item>
              <PasswordVisibilityBtn
                showPassword={showNewPassword}
                handleClickShowPassword={handleClickShowNewPassword}
                handleMouseDownPassword={handleMouseDownPassword}
              ></PasswordVisibilityBtn>
            </Grid>
          </Grid>
          {formik.values.newPassword && (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              wrap="nowrap"
              style={{ marginBottom: DEFAULT_SPACE }}
            >
              <Grid item>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  size="small"
                  autoComplete="new-password"
                  onFocus={(event) => {
                    event.target.setAttribute("autocomplete", "off");
                  }}
                />
              </Grid>
              <Grid item>
                <PasswordVisibilityBtn
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                ></PasswordVisibilityBtn>
              </Grid>
            </Grid>
          )}
          {!areCredentialsCorrect && !isLoading && (
            <p style={{ color: "rgb(204,0,0)", textAlign: "center" }}>
              Wrong password
            </p>
          )}
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting || isLoading}
            size="small"
            startIcon={<PublishIcon></PublishIcon>}
          >
            UPDATE PASSWORD
          </Button>
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={isUpdatedCorrectly ? "success" : "error"}
        >
          {isUpdatedCorrectly
            ? "PASSWORD HAS CHANGED"
            : "PASSWORD HAS NOT CHANGED"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PasswordChangeForm;
