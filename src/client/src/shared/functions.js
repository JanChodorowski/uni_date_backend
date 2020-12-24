import * as yup from "yup";

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

export const calculateAge = (birthday) => { // birthday is a date
  console.log('birthday',birthday)
  birthday = new Date(birthday)
  let ageDifMs = Date.now() - birthday;
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  console.log('Math.abs(ageDate.getUTCFullYear() - 1970)',Math.abs(ageDate.getUTCFullYear() - 1970))

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
