import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { singleProducts } from '../../lib/fetchProducts';
import { IconCartPlus } from '../Icons';

export default function Product() {
  const [img, setImg] = useState(0);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    singleProducts(id).then((product) => setProduct(product));
  }, [id]);
  console.log(product);
  if (product.category)
    return (
      <article className="flex-1 flex h-screen justify-center items-center">
        <section className="flex  justify-around  h-4/6">
          <div className="h-full  flex flex-col justify-around">
            <img
              onClick={() => setImg(0)}
              src={product.images[0]}
              alt=""
              className="w-20 rounded-md hover:cursor-pointer  hover:opacity-70"
            />
            <img
              onClick={() => setImg(1)}
              src={product.images[1]}
              alt=""
              className="w-20 rounded-md hover:cursor-pointer  hover:opacity-70"
            />
            <img
              onClick={() => setImg(2)}
              src={product.images[2]}
              alt=""
              className="w-20 rounded-md hover:cursor-pointer  hover:opacity-70"
            />
          </div>
          <div className="flex w-2/6 h-full">
            <img
              src={product.images[img]}
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
          <div className="text-white flex flex-col h-full ">
            <h2 className="text-3xl">{product.title}</h2>
            <b className="mt-4">Category</b>
            <div className=" border-l">
              <div className="p-1 mt-2 ml-2 bg-slate-700 flex rounded-xl max-w-52">
                <img
                  src={product.category.image}
                  alt=""
                  className="w-8 h-5 rounded-lg mr-1"
                />
                <b className="text-sm "> {product.category.name}</b>
              </div>
            </div>
            <h2 className="mt-7 text-2xl min-w-12 max-w-14 text-center rounded-2xl p-1 bg-green-600">
              {product.price}$
            </h2>
            <div className="max-w-lg mt-12">
              <h3 className="text-xl text-slate-300 mb-3">
                About this producto
              </h3>
              <p>{product.description}</p>
            </div>
            <button className=" mt-6 w-32 p-1 items-center rounded-lg justify-around bg-blue-700 outline-none hover:opacity-65 active:bg-blue-600 flex">
              <IconCartPlus fontSize="20px" /> Add to cart
            </button>
          </div>
        </section>
      </article>
    );
}
