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

export const getUser = (localization) => {
  return axios.post("/api/users", { localization });
};

export const getProfiles = ({
  cityFilter,
  universityFilter,
  ageFromFilter,
  ageToFilter,
  maxSearchDistanceFilter,
  genderFilters,
  interestFilter,
}) => {
  return axios.post("/api/users/profiles", {
    cityFilter,
    universityFilter,
    ageFromFilter,
    ageToFilter,
    maxSearchDistanceFilter,
    genderFilters,
    interestFilter,
  });
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

export const getMatches = () => {
  return axios.get("/api/users/matches");
};
