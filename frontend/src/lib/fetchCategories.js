import axios from './axios.js';

export async function fetchCategories() {
  return axios
    .get('/api/get-categories')
    .then((res) => {
      return res.data.map((category) => {
        return {
          id: category.categoryID,
          name: category.name,
          image: category.image
        };
      });
    })
    .catch((error) => {
      return error.response.data;
    });
}
