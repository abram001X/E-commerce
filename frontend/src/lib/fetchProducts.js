import axios from './axios.js';
export async function fetchProducts(id,searchValue, maxPrice) {
  let fetching;
  if (id && maxPrice) {
    fetching = `/api/get-products/?price_max=${maxPrice}&category_id=${id}`;
  }else if (id && !maxPrice) {
    fetching = `/api/get-products/?category_id=${id}`;
  } else if (maxPrice && !id) {
    fetching = `/api/get-products?price_max=${maxPrice}`;
  } else if(searchValue){
    fetching = `/api/get-products?title=${searchValue}`
  } else {
    fetching = '/api/get-products';
  }

  return axios
    .get(fetching)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function singleProducts(id) {
  return axios
    .get(`/api/get-products/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
}
