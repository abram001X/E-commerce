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

export const addProducts = async (data) => {
  return axios
    .post('/add-products', data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const myCart = async (data) => {
  return axios
    .post('/my-cart', data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
export const findProducts = async ()=>{
  return axios
    .get('/my-products')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
}
export const verifyTokenRequest = async () => {
  return axios
    .get('/verify')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
