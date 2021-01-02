import { blue, grey, pink, yellow } from "@material-ui/core/colors";
import { BLUE_INTENSITY, PINK_INTENSITY, YELLOW_INTENSITY } from "./constants";

export const getItemByKey = (item) =>
  typeof window !== "undefined" && window.localStorage.getItem(item);

export const removeFalsyFields = (obj) =>
  Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);

export function compareFileNames(a, b) {
  if (a.fileName < b.fileName) {
    return 1;
  }
  if (a.fileName > b.fileName) {
    return -1;
  }
  return 0;
}

export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator.language
) =>
  first && first.toLocaleUpperCase(locale) + rest.join("").toLocaleLowerCase();

export const calculateAge = (birthday) => {
  if (!birthday) {
    return "";
  }

  birthday = new Date(birthday);
  let ageDifMs = Date.now() - birthday;
  let ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const getGenderColor = (gender) => {
  if (!gender) {
    return;
  }

  const genderLowerCase = gender.toLocaleLowerCase();

  if (genderLowerCase === "male") {
    return blue[BLUE_INTENSITY];
  } else if (genderLowerCase === "female") {
    return pink[PINK_INTENSITY];
  } else if (genderLowerCase === "other") {
    return yellow[YELLOW_INTENSITY];
  } else {
    return grey["900"];
  }
};