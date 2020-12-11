const axios = require("axios");

// Make a request for a user with a given ID
export const insertUniversity = (university) => {
  axios
    .get(`university/${university}`)
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
};

export const insertUniversityWithRoute = (university) => {
  axios
    .get(`api/universities/${university}`)
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
};

export const insertUniversityWithRoutePOST = (university) => {
  axios
    .post("api/universities/add", {
      name: university,
    })
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
};

export const login = ({ email, password }) => {
  return axios.post("api/auth/login", {
    email,
    password,
  });
  // .then((response) => {
  //   // handle success
  //   console.log(response);
  // })
  // .catch((error) => {
  //   // handle error
  //   console.log(error);
  // })
  // .then(() => {
  //   // always executed
  // });
};

export const secret = () => {
  axios
    .post("api/auth/secret")
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
};

export const refresh = () => {
  axios
    .post("api/auth/refresh")
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
};

export const register = ({ email, password, passwordConfirmation }) => {
  return axios.post("api/auth/register", {
    email,
    password,
    passwordConfirmation,
  });
};

export const getUserData = () => {
  return axios.get("api/users/data");
};

export const deleteUser = () => {
  return axios.delete("api/users");
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
  console.log("uploadPictures", pictures);
  return axios.post("api/pictures", formData, config);
};
