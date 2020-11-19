const axios = require('axios');
 
// Make a request for a user with a given ID
export const insertUniversity = () => {
    axios.get('university/LALALAL')
  .then(function (response: any) {
    // handle success
    console.log(response);
  })
  .catch(function (error: any) {
    // handle error
    console.log(error); 
  })
  .then(function () {
    // always executed
  });
}

export const postUniversity = () => {
  axios.post('university', {name: 'MEMORY'})
.then(function (response: any) {
  // handle success
  console.log(response);
})
.catch(function (error: any) {
  // handle error
  console.log(error); 
})
.then(function () {
  // always executed
});
}