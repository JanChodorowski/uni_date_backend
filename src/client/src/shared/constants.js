import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import * as yup from "yup";

export const LOCAL_STORAGE_KEY = {
  theme: "theme-ui-color-mode",
  jwtToken: "token",
};

export const THEME_NAMES = {
  light: "light",
  dark: "dark",
};

const primaryColor = blue;
const secondaryColor = red;

const APP_THEME_EXTENDED = {
  primary: {
    main: primaryColor["500"],
  },
  secondary: {
    main: secondaryColor["900"],
  },
};

const lightTransparent = "rgba(255, 255, 255, 0.6)";
const darkTransparent = "rgba(38, 50, 56, 0.7)";
const lightOpaque = "rgba(255, 255, 255, 0.98)";
const darkOpaque = "rgba(38, 50, 56, 0.98)";

const MuiCssBaseline = {
  MuiCssBaseline: {
    "@global": {
      body: {
        backgroundColor: "lightblue", //rgb(255, 191, 20)
      },
    },
  },
};
export const APP_THEME = {
  light: {
    palette: {
      type: THEME_NAMES.light,
      ...APP_THEME_EXTENDED,
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: lightOpaque,
        },
      },
      MuiBottomNavigation: {
        root: {
          backgroundColor: lightTransparent,
        },
      },
      ...MuiCssBaseline,
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
          backgroundColor: darkOpaque,
        },
      },
      MuiBottomNavigation: {
        root: {
          backgroundColor: darkTransparent,
        },
      },
      ...MuiCssBaseline,
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

export const EMPTY_USER = {};

export const AVATAR_SIZE = "80px";

export const APP_NAME = "BERG DATE";

export const DEFAULT_PADDING = "0.5rem";

export const DEFAULT_IMAGE_SIZE = "325px";
