import axios from './axios.js';
export const loginRequest = async (data) => {
  return axios
    .post('/login', data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
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

export const submitImages = async (images) => {
  return axios
    .post('/api/form-images', images,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
}

export const myCart = async (data) => {
  return axios
    .post('/api/my-cart', data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
export const findProducts = async ()=>{
  return axios
    .get('/api/my-products')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
}
export const verifyTokenRequest = async () => {
  return axios
    .get('/api/verify')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
