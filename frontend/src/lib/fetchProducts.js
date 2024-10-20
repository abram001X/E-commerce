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
    fetching = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=80';
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
    images: [items.images]
  }));
}

export async function singleProducts(id){
  const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  return await response.json()
}
