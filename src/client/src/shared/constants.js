import red from "@material-ui/core/colors/red";
import * as yup from "yup";

export const LOCAL_STORAGE_KEY = {
  theme: "theme-ui-color-mode",
};

export const THEME_NAMES = {
  light: "light",
  dark: "dark",
};

const color = red;

const APP_THEME_EXTENDED = {
  primary: {
    main: color["900"],
  },
};

export const APP_THEME = {
  light: {
    palette: {
      type: THEME_NAMES.light,
      ...APP_THEME_EXTENDED,
    },
  },
  dark: {
    palette: {
      type: THEME_NAMES.dark,
      ...APP_THEME_EXTENDED,
    },
  },
};

export const NAVIGATION = {
  chat: "chat",
  match: "match",
  filter: "filter",
  profile: "profile",
  settings: "settings",
};

export const basicValidation = {
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
};

export const emptyUser = {};
