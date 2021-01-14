import { Grid, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { changeEmail } from "../../shared/api";
import { AUTO_HIDE_DURATION, DEFAULT_SPACE } from "../../shared/constants";
import { LoadingContext } from "../../shared/loadingContext";
import { UserContext } from "../../shared/userContext";
import Slide from "@material-ui/core/Slide";
import { Alert } from "@material-ui/lab";
import PasswordVisibilityBtn from "../shared/PasswordVisibilityBtn";
import PublishIcon from "@material-ui/icons/Publish";

const EmailChangeForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [areCredentialsCorrect, setAreCredentialsCorrect] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [user, setUser] = useContext(UserContext);
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
      newEmail: "",
      currPassword: "",
    },
    validationSchema: yup.object({
      newEmail: yup
        .string("Enter an new email")
        .email("Enter a valid new email")
        .notOneOf([user.email], "Provided new email is the same as current")
        .required("New email is required"),
      currPassword: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let { newEmail, currPassword } = values;
      setAreCredentialsCorrect(true);
      const trimmedNewEmail = newEmail.trim();
      changeEmail(trimmedNewEmail, currPassword)
        .then((res) => {
          if (!res.data.hasEmailChanged) {
            return;
          }
          setIsUpdatedCorrectly(true);
          resetForm({ values: "" });
          setUser((user) => {
            return {
              ...user,
              email: trimmedNewEmail,
            };
          });
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
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="newEmail"
            name="newEmail"
            label="New Email"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            autoFocus
            size="small"
            style={{ marginBottom: DEFAULT_SPACE }}
            autoComplete="new-password"
            onFocus={(event) => {
              event.target.setAttribute("autocomplete", "off");
            }}
          />

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
                id="currPassword"
                name="currPassword"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.currPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.currPassword && Boolean(formik.errors.currPassword)
                }
                helperText={formik.touched.currPassword && formik.errors.currPassword}
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
            disabled={formik.isSubmitting}
            size="small"
            startIcon={<PublishIcon></PublishIcon>}
          >
            UPDATE EMAIL
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
          {isUpdatedCorrectly ? "EMAIL HAS CHANGED" : "EMAIL HAS NOT CHANGED"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmailChangeForm;
