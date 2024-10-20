export async function fetchCategories() {
  const response = await fetch('https://api.escuelajs.co/api/v1/categories');
  const data = await response.json();
  return data.map((obj) => ({
    id: obj.id,
    name: obj.name,
    image: obj.image
  }));
}
