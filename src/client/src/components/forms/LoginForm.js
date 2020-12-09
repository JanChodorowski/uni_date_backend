import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { login } from "../../api";
import { Grid, IconButton, Input, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import PasswordVisibilityBtn from "../buttons/PasswordVisibilityBtn";
import { basicValidation } from "../../shared/constants";

const validationSchema = yup.object(basicValidation);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [areCredentialsIncorrect, setAreCredentialsIncorrect] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "domestos@gmail.com",
      password: "domestos",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formattedValues = {
        ...values,
        email: values.email.trim(),
      };
      console.log("res1");
      let res;
      try {
        res = await login(values);
      } catch {
      } finally {
        console.log("res2", res);
        if (res?.data?.email) {
          setAreCredentialsIncorrect(false);
        } else {
          setAreCredentialsIncorrect(true);
        }
        console.log("res", res);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <br />
        <br />
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          wrap="nowrap"
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
        <br />
        {areCredentialsIncorrect && (
          <>
            <p style={{ color: "rgb(204,0,0)" }}>
              No user with this email and password
            </p>
          </>
        )}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
