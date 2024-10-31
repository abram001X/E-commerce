import { useContext, useRef, useState } from 'react';
import { IconFileImage } from '../../Icons';
import { AuthContext } from '../../../provider/authProvider';
import { Link, Navigate } from 'react-router-dom';
import { addProducts, submitImages } from '../../../lib/api';

export default function AddProduct() {
  const [img, setImg] = useState(null);
  const [indexImg, setIndexImg] = useState(0);
  const [erorrMsg, setErorrMsg] = useState(null);
  const [errorInput, setErorrInput] = useState('');
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setMsg] = useState(null);
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const categoriesArray = [
    'Clothes',
    'Electronics',
    'Furniture',
    'Shoes',
    'Miscellaneous'
  ];

  const openFiles = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrice(parseInt(price));

    if (!price) {
      return setErorrInput('Price invalid');
    }
    if (title.length < 5) {
      return setErorrInput('Name invalid');
    }
    if (description.length < 50) {
      return setErorrInput('The description must have at least 50 characters.');
    }
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    try {
      const resImages = await submitImages(formData);
      console.log(resImages)
      if (resImages.data.response) {
        const product = {
          title,
          categoryId,
          price,
          description,
          img: JSON.stringify(resImages.data.response)
        };
        const res = await addProducts(product);
        setMsg(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
    /*const product = {
      title,
      categoryId,
      price,
      description,
      img: JSON.stringify(images)
    };*/
    /*const res = await addProducts(product);
     */
  };
  const handleFile = (e) => {
    let isImg = true;

    if (e.target.files.length < 3) {
      return setErorrMsg('Enter three images');
    }
    if (e.target.files) {
      for (let j = 0; j < 3; j++) {
        if (!e.target.files[j].type.includes('image')) {
          setErorrMsg('File invalid');
          isImg = false;
          break;
        }
      }
      if (isImg) {
        setErorrMsg('');
        setImages(e.target.files);
        return setImg([...e.target.files]);
      }
    }
  };
  if (isLoading) return <h1 className="text-white">...Loading</h1>;
  if (!isLoading && !isAuthenticated) return <Navigate to={'/'} replace />;
  return (
    <article className="flex-1 flex h-screen justify-center items-center">
      <section className="flex justify-around w-4/6 h-4/6">
        <div className="h-full flex flex-col justify-around">
          {img &&
            img.map((obj, j) => {
              return (
                <img
                  key={j}
                  onClick={() => setIndexImg(j)}
                  src={URL.createObjectURL(obj)}
                  alt=""
                  className=" border  w-20 h-20 rounded-md hover:cursor-pointer  hover:opacity-70"
                />
              );
            })}
        </div>
        <div className="flex h-full border rounded-xl mr-20 min-w-64 max-w-80 ">
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
            src={
              img
                ? URL.createObjectURL(img[indexImg])
                : 'https://ideogram.ai/assets/progressive-image/balanced/response/NaCVFthrR3S1thqTV9fEuw'
            }
            className="object-cover rounded-xl "
          />
        </div>
        <div className="text-white flex flex-col h-full p-3 pt-0">
          <h1 className="text-2xl mb-7">Publish new product</h1>
          <form
            id="addProducts"
            action="POST"
            className="flex flex-col text-base"
            onSubmit={handleSubmit}
          >
            <label htmlFor="Product" className="mb-2 text-slate-400">
              Enter the name of the product
            </label>
            <input
              name="addProducts"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="Product"
              placeholder="Title product"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />
            <label htmlFor="Category" className="mt-3 text-slate-400">
              Choose a category
            </label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              name="category"
              id="Category"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            >
              {categoriesArray.map((name, j) => {
                return (
                  <option key={j} value={j + 1}>
                    {name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="Price" className="mt-3 text-slate-400">
              Enter the price
            </label>
            <input
              id="Price"
              name="addProducts"
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Price"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />

            <label htmlFor="Description" className="mt-3 text-slate-400">
              Enter description of the products
            </label>
            <textarea
              name="addProducts"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              id="Description"
              className="text-black resize-none h-32 outline-none p-1 focus:bg-gray-200 "
            />
            {errorInput && <h1 className="text-red-700">{errorInput}</h1>}
            {!msg ? (
              <button className="bg-blue-500 mt-7">Post</button>
            ) : (
              <p className="mt-7 text-green-600">
                {msg}
                <Link to={'/'}>
                  {' '}
                  <p className="text-white">go to home</p>
                </Link>
              </p>
            )}
          </form>
        </div>
      </section>
    </article>
  );
}
