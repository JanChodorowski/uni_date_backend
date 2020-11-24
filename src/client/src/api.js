const axios = require('axios');
 
// Make a request for a user with a given ID
export const insertUniversity = (university) => {
    axios.get(`api/universities/${university}`)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error); 
  })
  .then(function () {
    // always executed
  });
}