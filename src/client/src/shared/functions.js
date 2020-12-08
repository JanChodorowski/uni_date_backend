import * as yup from "yup";



export const getItemByKey = (item) =>
  typeof window !== "undefined" && window.localStorage.getItem(item);
