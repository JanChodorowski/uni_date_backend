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

export const getProfiles = (
  {
    cityFilter,
    universityFilter,
    ageFromFilter,
    ageToFilter,
    maxSearchDistanceFilter,
    genderFilters,
    interestFilter,
  },
  latitude,
  longitude
) => {
  return axios.post("/api/users/profiles", {
    cityFilter,
    universityFilter,
    ageFromFilter,
    ageToFilter,
    maxSearchDistanceFilter,
    genderFilters,
    interestFilter,
    latitude,
    longitude,
  });
};

export const deleteUser = () => {
  return axios.delete("/api/users");
};

export const deleteMatch = (passiveSideUserId) => {
  return axios.post("/api/users/deletematch", { passiveSideUserId });
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
  return axios.put("api/users", { user });
};

export const updateAvatar = (fileName) => {
  return axios.put("api/pictures/avatar", { fileName });
};

export const createRelation = (passiveSideUserId, isLiking) => {
  return axios.post("/api/relation", {
    passiveSideUserId,
    isLiking,
  });
};

export const createMessage = (userId_2, content) => {
  return axios.post("/api/message", {
    userId_2,
    content,
  });
};

export const getMatches = (latitude, longitude) => {
  return axios.post("/api/users/matches", { latitude, longitude });
};

export const getMessages = (passiveSideUserId) => {
  return axios.post("/api/message/getmessage", { passiveSideUserId });
};

export const deletePicture = (fileName) => {
  return axios.post("/api/pictures/delete", { fileName });
};

export const changeEmail = (newPassword, password) => {
  return axios.put("/api/auth/email", { newEmail: newPassword, password });
};

export const changePassword = (newPassword, password) => {
  return axios.put("/api/auth/password", { newPassword, password });
};

export const sendLocation = (coords) => {
  const { latitude, longitude } = coords;
  return axios.put("/api/users/location", { latitude, longitude });
};
