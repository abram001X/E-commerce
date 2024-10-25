import axios from './axios.js';
export async function fetchProducts(id, searchValue, maxPrice) {
  let fetching;
  if (id && maxPrice) {
    fetching = `https://api.escuelajs.co/api/v1/products/?price_min=1&price_max=${maxPrice}&categoryId=${id}&offset=0&limit=80`;
  } else if (searchValue !== '') {
    fetching = `https://api.escuelajs.co/api/v1/products/?title=${searchValue}`;
  } else if (id && !maxPrice) {
    fetching = `https://api.escuelajs.co/api/v1/products/?categoryId=${id}&offset=0&limit=80`;
  } else if (maxPrice && !id) {
    fetching = `https://api.escuelajs.co/api/v1/products/?price_min=1&price_max=${maxPrice}&offset=0&limit=80`;
  } else {
    fetching = 'http://localhost:3000/api/get-products/all';
  }

  const response = await fetch(fetching);
  const data = await response.json();
  return data.map((items) => ({
    id: items.id,
    title: items.title,
    price: items.price,
    description: items.description,
    category: {
      id: items.category.id,
      name: items.category.name,
      image: items.category.image
    },
    images: items.images
  }));
}

export async function singleProducts(id){
  return axios
    .get(`/api/get-products/${id}`)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error.response.data)
      return error.response.data;
    });
}
