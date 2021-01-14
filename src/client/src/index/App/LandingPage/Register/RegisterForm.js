import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { register, sendLocation } from "../../../shared/api";
import { BASIC_VALIDATION, DEFAULT_SPACE } from "../../../shared/constants";
import { LoadingContext } from "../../../shared/loadingContext";
import { UserContext } from "../../../shared/userContext";
import PasswordVisibilityBtn from "../../shared/PasswordVisibilityBtn";

const validationSchema = yup.object({
  ...BASIC_VALIDATION,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterForm = ({ longitude, latitude }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isUserExisting, setIsUserExisting] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      register(values)
        .then((res) => {
          setIsLoading(false);
          const { data } = res;
          if (data?.email) {
            setUser(data);
            sendLocation({ latitude, longitude })
              .then(() => {})
              .catch((err) => {});
          }
          setIsUserExisting(!!data?.isUserExisting);
        })
        .catch((e) => {
          setIsLoading(false);
        });
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
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
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
          size="small"
          style={{ marginBottom: DEFAULT_SPACE }}
          autoComplete="new-password"
          onFocus={(event) => {
            event.target.setAttribute("autocomplete", "off");
          }}
        />

        <br />
        {isUserExisting && !isLoading && (
          <>
            <p style={{ color: "rgb(204,0,0)", marginBottom: DEFAULT_SPACE }}>
              User with this email already exists
            </p>
          </>
        )}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
          size="small"
          startIcon={<ArrowUpwardIcon></ArrowUpwardIcon>}
          endIcon={<ArrowUpwardIcon></ArrowUpwardIcon>}
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
