import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import * as yup from "yup";

export const LOCAL_STORAGE_KEY = {
  theme: "theme-ui-color-mode",
};

export const THEME_NAMES = {
  light: "light",
  dark: "dark",
};

const primaryColor = red;
const secondaryColor = green;

const APP_THEME_EXTENDED = {
  primary: {
    main: primaryColor["500"],
  },
  secondary: {
    main: secondaryColor["900"],
  },
};

const lightBackgroundColor = "rgba(255, 255, 255, 0.6)";
const darkBackgroundColor = "rgba(38, 50, 56, 0.7)";

export const APP_THEME = {
  light: {
    palette: {
      type: THEME_NAMES.light,

      ...APP_THEME_EXTENDED,
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: lightBackgroundColor,
        },
      },
      MuiBottomNavigation: {
        root: {
          backgroundColor: lightBackgroundColor,
        },
      },
    },
  },
  dark: {
    palette: {
      type: THEME_NAMES.dark,
      ...APP_THEME_EXTENDED,
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: darkBackgroundColor,
        },
      },
      MuiBottomNavigation: {
        root: {
          backgroundColor: darkBackgroundColor,
        },
      },
    },
  },
};

export const NAVIGATION = {
  chat: "chat",
  match: "match",
  filter: "filter",
  profile: "profile",
  settings: "settings",
  deleteaccount: "deleteaccount",
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
