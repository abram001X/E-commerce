import { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '../Icons';
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
export default function Gallery({ product }) {
  const [indexImages, setIndexImages] = useState(0);
  const handleImage = (isBack) => {
    if (isBack) {
      setIndexImages(indexImages == 2 ? 0 : indexImages + 1);
    } else setIndexImages(indexImages == 0 ? 2 : indexImages - 1);
  };

  if (!product.images[0].includes('"'))
    return (
      <article className="w-full flex flex-col p-2 hover:bg-slate-800 rounded-sm transition-all ">
        <div className="pb-0 flex w-full justify-between items-center cont_img">
          <div
            onClick={() => handleImage(true)}
            className="img_svg absolute z-30 bg-black rounded-3xl translate-x-3 p-1  opacity-45 hover:cursor-pointer hover:opacity-35"
          >
            <IconChevronLeft color="white" />
          </div>
          <div>
            <img
              src={product.images[indexImages]}
              className="rounded-md object-cover"
            />
          </div>
          <div
            onClick={() => handleImage(false)}
            className="img_svg absolute z-30 translate-x-56 p-1  bg-black rounded-3xl opacity-45 hover:cursor-pointer hover:opacity-35"
          >
            <IconChevronRight color="white" />
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h5 className="text-white hover:text-gray-300">{product.title}</h5>
        </Link>
        <h2 className=" text-green-700 mb-1 mt-5">
          <span className="text-slate-300">Price:</span> {product.price}$
        </h2>
        <div className="flex items-end mb-3">
          <b className="text-white mr-3 text-xs ">Category: </b>
          <div className="flex">
            <img
              className="w-4 object-cover rounded-xl"
              src={product.category.image}
            />
            <a className="ml-1 text-gray-300 text-xs">
              {product.category.name}
            </a>
          </div>
        </div>
        <div className="text-white flex-row ">
          <p className="text-sm text-slate-500">
            {product.description.slice(0, 200)} . . .
          </p>
        </div>
      </article>
    );
}
