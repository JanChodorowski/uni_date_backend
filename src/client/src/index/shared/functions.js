import { blue, grey, pink, yellow } from "@material-ui/core/colors";
import { BLUE_INTENSITY, PINK_INTENSITY, YELLOW_INTENSITY } from "./constants";
import moment from 'moment'

export const getItemByKey = (item) =>
  typeof window !== "undefined" && window.localStorage.getItem(item);

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
  return  moment().diff(birthday, 'years');
};

export const getGenderColor = (gender) => {
  let genderLowerCase;

  if (gender) {
    genderLowerCase = gender.toLocaleLowerCase();
  }

  switch (genderLowerCase) {
    case "male":
      return blue[BLUE_INTENSITY];
    case "female":
      return pink[PINK_INTENSITY];
    case "other":
      return yellow[YELLOW_INTENSITY];
    default:
      return grey["900"];
  }
};
