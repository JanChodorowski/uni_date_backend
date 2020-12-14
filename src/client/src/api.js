const axios = require("axios");

export const login = ({ email, password }) => {
  return axios.post("/api/auth/login", {
    email,
    password,
  });
};

export const refresh = () => {
  axios.post("/api/auth/refresh");
};

export const register = ({ email, password, passwordConfirmation }) => {
  return axios.post("/api/auth/register", {
    email,
    password,
    passwordConfirmation,
  });
};

export const getUser = () => {
  return axios.get("/api/users");
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
  return axios.post(
    "/api/pictures/getone",
    { fileName },
    { responseType: "blob" }
  );
};

export const updateUser = (user) => {
  console.log("updateUser",user)
  return axios.put(
      "api/users",
      {user}
  )
}

export const updatePictures = (pictures) => {
  console.log("updatePictures",pictures)
  return axios.put(
      "api/pictures",
      {pictures}
  )
}
