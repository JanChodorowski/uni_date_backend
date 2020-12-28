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

export const LIGHT_TRANSPARENT = "rgba(255, 255, 255, 0.8)";
export const DARK_TRANSPARENT = "rgba(38, 50, 56, 0.7)";
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
          backgroundColor: LIGHT_TRANSPARENT,
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
          backgroundColor: DARK_TRANSPARENT,
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

export const BASIC_VALIDATION = {
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

export const EMPTY_PROFILES = [];

export const AVATAR_SIZE = "80px";

export const APP_NAME = "BERG DATE";

export const DEFAULT_SPACE = "0.5rem";

export const DEFAULT_IMAGE_SIZE = "375px";

// export const DATA_UPDATED = "DATA_UPDATED";
//
// export const DATA_NOT_UPDATED = "DATA_NOT_UPDATED";

export const AUTO_HIDE_DURATION = 6000;

export const PINK_INTENSITY = "400";
export const YELLOW_INTENSITY = "800";
export const BLUE_INTENSITY = "700";
