import red from "@material-ui/core/colors/red";

export const LOCAL_STORAGE_KEY = {
  theme: "theme-ui-color-mode",
};
export const getItemByKey = (item) =>
  typeof window !== "undefined" && window.localStorage.getItem(item);

export const THEME_NAMES = {
  light: "light",
  dark: "dark",
};

const color = red;

const APP_THEME_EXTENDED = {
  // overrides: {
  //   MUIDataTableBodyCell: {
  //     root: {
  //       backgroundColor: color["600"],
  //     },
  //   },
  // },
  primary: {
    main: color["900"],
  },
};

export const APP_THEME = {
  light: {
    palette: {
      type: THEME_NAMES.light,
      // primary: {
      //   main: color['900'],
      // },
      // background: {
      //   default: color['50'],
      // },
      // elevation1: {
      //   backgroundColor: color['100'],
      // },
      // elevation2: {
      //   backgroundColor: color['200'],
      // },
      ...APP_THEME_EXTENDED,
    },
  },
  dark: {
    palette: {
      type: THEME_NAMES.dark,
      // primary: {
      //   main: color['50'],
      // },
      // background: {
      //   default: color['900'],
      // },
      // elevation1: {
      //   backgroundColor: color['800'],
      // },
      // elevation2: {
      //   backgroundColor: color['700'],
      // },
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
