import React, {useContext, useState} from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { register } from "../../api";
import {
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import red from "@material-ui/core/colors/red";
import PasswordVisibilityBtn from "../buttons/PasswordVisibilityBtn";
import { basicValidation } from "../../shared/constants";
import {UserContext} from "../../context/userContext";

const validationSchema = yup.object({
  ...basicValidation,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isUserExisting, setIsUserExisting] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [user,  setUser ] = useContext(UserContext);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "abcdefgh@gmail.com",
      password: "abcdefgh",
      passwordConfirmation: "abcdefgh",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let res;
      try {
        res = await register(values);
        setUser(res?.data)

      } catch {
      } finally {
        setIsUserExisting(!!res?.data?.isUserExisting);
        console.log('user',user)

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
        <TextField
          fullWidth
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />
        <br />
        <br />
        {isUserExisting && (
          <>
            <p style={{ color: "rgb(204,0,0)" }}>
              User with this email already exists
            </p>
            <br />
          </>
        )}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          CREATE NEW ACCOUNT
        </Button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default RegisterForm;
