import axios from './axios.js';
export const loginRequest = async (data) => {
  return axios
    .post('/login', data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};
export const registerRequest = async (data) => {
  return axios
    .post('/signup', data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const verifyTokenRequest = async () => {
  return axios.get('/verify').then((res) => {
    return res;
  }).catch((error)=>{
    return error
  });
};
