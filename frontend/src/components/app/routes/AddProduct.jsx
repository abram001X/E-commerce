import { useContext, useRef, useState } from 'react';
import { IconFileImage } from '../../Icons';
import { AuthContext } from '../../../provider/authProvider';
import { Navigate } from 'react-router-dom';
import { addProducts } from '../../../lib/api';

export default function AddProduct() {
  const [img, setImg] = useState(
    'https://ideogram.ai/assets/progressive-image/balanced/response/NaCVFthrR3S1thqTV9fEuw'
  );
  const [indexImg, setIndexImg] = useState(0);
  const [erorrMsg, setErorrMsg] = useState(null);
  const [errorInput, setErorrInput] = useState('');
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const inputRef = useRef(null);
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const extensionesImagenes = ['.jpg', '.jpeg', '.png', '.webp'];
  const categoriesArray = [
    'Furniture',
    'Electronics',
    'Clothes',
    'Shoes',
    'Miscellaneous',
    'Baby clothes'
  ];
  const openFiles = () => {
    inputRef.current.click();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrice(parseInt(price));

    if (!price) {
      setErorrInput('Price  invalid');
    }
    if (title.length < 5) {
      setErorrInput('Name invalid');
    }
    if (description.length < 50) {
      return setErorrInput('The description must have at least 50 characters.');
    }
    const product = {
      title,
      categoryId,
      price,
      description,
      img: JSON.stringify(img)
    };
    addProducts(product);
  };

  const handleFile = (e) => {
    let isImg = false;
    if (e.target.files) {
      for (let index = 0; index < extensionesImagenes.length; index++) {
        const image1 = e.target.files[0].name.endsWith(
          extensionesImagenes[index]
        );
        const image2 = e.target.files[1].name.endsWith(
          extensionesImagenes[index]
        );
        const image3 = e.target.files[2].name.endsWith(
          extensionesImagenes[index]
        );
        if (image1 && image2 && image3) {
          isImg = true;
          break;
        }
      }

      if (isImg) {
        if (e.target.files.length < 3) {
          return setErorrMsg('Enter three images');
        }
        setErorrMsg('');
        return setImg([
          e.target.files[0].name,
          e.target.files[1].name,
          e.target.files[2].name
        ]);
      }
      return setErorrMsg('File invalid');
    }
  };
  if (isLoading) return <h1 className="text-white">...Loading</h1>;
  if (!isLoading && !isAuthenticated) return <Navigate to={'/'} replace />;
  return (
    <article className="flex-1 flex h-screen justify-center items-center">
      <section className="flex justify-around w-4/6 h-4/6">
        <div className="h-full  flex flex-col justify-around">
          <img
            onClick={() => setIndexImg(0)}
            src={img[0].name ? img[0].name : img}
            alt=""
            className="w-20 rounded-md hover:cursor-pointer  hover:opacity-70"
          />
          <img
            onClick={() => setIndexImg(1)}
            src={img[1].name ? img[1].name : img}
            alt=""
            className="w-20 rounded-md hover:cursor-pointer  hover:opacity-70"
          />
          <img
            onClick={() => setIndexImg(2)}
            src={img[2].name ? img[2].name : img}
            alt=""
            className="w-20 rounded-md hover:cursor-pointer  hover:opacity-70"
          />
        </div>
        <div className="flex h-full border rounded-xl mr-20">
          <input
            onChange={handleFile}
            ref={inputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
          />
          <div
            onClick={openFiles}
            className="absolute z-30 m-3 hover:cursor-pointer hover:opacity-80 flex justify-end"
          >
            <IconFileImage fontSize="35px" color="black" />
            {erorrMsg && <h1 className="text-red-800">{erorrMsg}</h1>}
          </div>
          <img
            src={img[indexImg].name ? img[indexImg].name : img}
            className="object-cover rounded-xl "
          />
        </div>
        <div className="text-white flex flex-col h-full p-3 pt-0">
          <h1 className="text-2xl mb-7">Publish new product</h1>
          <form
            id='addProducts'
            action="POST"
            className="flex flex-col text-base"
            onSubmit={handleSubmit}
          >
            <label htmlFor='Product' className="mb-2 text-slate-400">
              Enter the name of the product
            </label>
            <input
              name='addProducts'
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id='Product'
              placeholder="Title product"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />
            <label htmlFor='Category'  className="mt-3 text-slate-400">Choose a category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              name="category"
              id="Category"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            >
              {categoriesArray.map((name, j) => {
                return (
                  <option key={j} value={j}>
                    {name}
                  </option>
                );
              })}
            </select>
            <label htmlFor='Price'  className="mt-3 text-slate-400">Enter the price</label>
            <input
              id='Price'
              name='addProducts'
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Price"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />

            <label htmlFor='Description'  className="mt-3 text-slate-400">
              Enter description of the products
            </label>
            <textarea
              name='addProducts'
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              id='Description'
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />
            {errorInput && <h1 className="text-red-700">{errorInput}</h1>}
            <button className="bg-blue-500 mt-7">Post</button>
          </form>
        </div>
      </section>
    </article>
  );
}
