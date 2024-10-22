import { useContext, useRef, useState } from 'react';
import { IconFileImage } from '../../Icons';
import { AuthContext } from '../../../provider/authProvider';
import { Navigate } from 'react-router-dom';

export default function AddProduct() {
  const [img, setImg] = useState(
    'https://ideogram.ai/assets/progressive-image/balanced/response/NaCVFthrR3S1thqTV9fEuw'
  );
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const { isAuthenticated } = useContext(AuthContext);
  const extensionesImagenes = ['.jpg', '.jpeg', '.png', '.webp'];
  const openFiles = () => {
    inputRef.current.click();
  };
  const handleFile = (e) => {
    let isImg;
    for (let index = 0; index < extensionesImagenes.length; index++) {
      isImg = e.target.files[0].name.endsWith(extensionesImagenes[index]);
      if (isImg) break;
    }

    if (isImg) {
      return setImg(e.target.files[0].name);
    }
    return setError('File invalid');
  };

  if (!isAuthenticated) return <Navigate to={'/'} />;
  return (
    <article className="flex-1 flex h-screen justify-center items-center">
      <section className="flex justify-center w-full h-4/6">
        <div className="flex h-full border rounded-xl mr-20">
          <input
            onChange={handleFile}
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
          />
          <div
            onClick={openFiles}
            className="absolute z-30 m-3 hover:cursor-pointer hover:opacity-80 flex justify-end"
          >
            <IconFileImage fontSize="35px" color="black" />
            {error && <h1 className="text-red-800">{error}</h1>}
          </div>
          <img src={img} className="object-cover rounded-xl " />
        </div>
        <div className="text-white flex flex-col h-full p-3 pt-0">
          <h1 className="text-2xl mb-7">Publish new product</h1>
          <form action="POST" className="flex flex-col text-base">
            <label className="mb-2 text-slate-400">
              Enter the name of the product
            </label>
            <input
              type="text"
              placeholder="Title product"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />
            <label className="mt-3 text-slate-400">Choose a category</label>
            <select
              name="category"
              id="category"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            >
              <option value="category">categoory...</option>
            </select>
            <label className="mt-3 text-slate-400">Enter the price</label>
            <input
              type="text"
              placeholder="Price"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />

            <label className="mt-3 text-slate-400">
              Enter description of the products
            </label>
            <textarea
              type="text"
              className="text-black   outline-none p-1 focus:bg-gray-200 "
            />
            <button className="bg-blue-500 mt-7">Post</button>
          </form>
        </div>
      </section>
    </article>
  );
}
