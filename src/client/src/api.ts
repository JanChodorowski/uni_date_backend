import {AxiosResponse} from "axios";

const axios = require("axios");

// Make a request for a user with a given ID
// export const insertUniversity = (university) => {
//     axios.get(`university/${university}`)
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error: Error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
// }
//
// export const insertUniversityWithRoute = (university) => {
//   axios.get(`api/universities/${university}`)
// .then(function (response) {
//   // handle success
//   console.log(response);
// })
// .catch(function (error) {
//   // handle error
//   console.log(error);
// })
// .then(function () {
//   // always executed
// });
// }

// export const insertUniversityWithRoutePOST = (university) => {
//   axios.post(`api/universities/add`, {
//     name: university,
//   })
// .then(function (response) {
//   // handle success
//   console.log(response);
// })
// .catch(function (error) {
//   // handle error
//   console.log(error);
// })
// .then(function () {
//   // always executed
// });
// }

export const signIn = (user: any) => {
    console.log(user)
    axios
        .post(`api/auth/signin`, {
            email: user.email,
            password: user.password,
        })
        .then(function (response: AxiosResponse) {
            // handle success
            console.log(response);
        })
        .catch(function (error: Error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
};

export const secret = () => {
    axios
        .post(`api/auth/secret`)
        .then(function (response: AxiosResponse) {
            // handle success
            console.log(response);
        })
        .catch(function (error: Error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
};

export const refresh = () => {
    axios
        .post(`api/auth/refresh`)
        .then(function (response: AxiosResponse) {
            // handle success
            console.log(response);
        })
        .catch(function (error: Error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
};

export const register = (user:any) => {
    axios
        .post(`api/auth/register`, {
            email: user.email,
            password: user.password,
            passwordConfirmation: user.passwordConfirmation
        })
        .then(function (response: AxiosResponse) {
            // handle success
            console.log(response);
        })
        .catch(function (error: Error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
};

