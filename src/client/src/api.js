const axios = require("axios");

export const login = ({ email, password }) => {
  return axios.post("/api/auth/login", {
    email,
    password,
  });
};

export const secret = () => {
  axios
    .post("/api/auth/secret")
};

export const refresh = () => {
  axios
    .post("/api/auth/refresh")

};

export const register = ({ email, password, passwordConfirmation }) => {
  return axios.post("/api/auth/register", {
    email,
    password,
    passwordConfirmation,
  });
};

export const getUserData = () => {
  return axios.get("/api/users/data");
};

export const deleteUser = () => {
  return axios.delete("/api/users");
};

export const uploadPictures = (pictures) => {
  const formData = new FormData();
  pictures.forEach((p, i) => {
    formData.append("files", pictures[i]);
  });

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  return axios.post("/api/pictures", formData, config);
};

export const getPicture = (fileName) => {
  return axios.post("/api/pictures/getone",{fileName}, {responseType: 'blob'});
}



