import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/authProvider';
import {
  Icon036Profile,
  IconCartPlus,
  IconStoreEdit,
  IconStorePlus
} from '../Icons';
import { Link } from 'react-router-dom';
import { findProducts } from '../../lib/api';

export default function Profile() {
  const [products, setProducts] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const myProducts = async () => {
    const res = await findProducts();
    if (res.data.message == 'error') {
      return;
    }
    setProducts(res.data);
  };
  useEffect(() => {
    myProducts();
  }, []);
  return (
    <article className="text-white fixed z-40 h-screen right-10 rounded-md bg-black w-72 p-4 border border-slate-900">
      <section className="flex items-center">
        <Icon036Profile fontSize="45px" />
        <div className="ml-2">
          <h1 className="text-lg">{user.username.toUpperCase()}</h1>
          <h2 className="text-slate-500">{user.email}</h2>
        </div>
      </section>
      <section className="mt-4">
        <div className="flex  items-center">
          <IconCartPlus fontSize="25px" />
          <h1 className="ml-2">Shopping cart</h1>
        </div>
        <div className="border-l pl-2 pt-4">
          {!user.cart ? (
            <h1 className="text-slate-600">No products in your cart</h1>
          ) : (
            <ul>
              {user.cart.map((product, j) => {
                return (
                  <li
                    key={j}
                    className="mt-2 text-slate-400 p-1 text-sm hover:text-slate-200 hover:cursor-pointer"
                  >
                    {product}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
      <section className="mt-4">
        <div className="flex  items-center">
          <IconStoreEdit fontSize="25px" />
          <h1 className="ml-2">My products</h1>
        </div>
        <div className="border-l pl-2 pt-4">
          {!products.length > 0 ? (
            <h1 className="text-slate-600">No published products</h1>
          ) : (
            <ul className="text-white">
              {products.map((product, j) => {
                return (
                  <Link key={j} to={`product/${product.productId}`}>
                    <li className="text-slate-300 p-1 text-sm hover:text-slate-200">
                      {product.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          )}
          <Link to={'/add-products'}>
            <div className="flex mt-4 items-center">
              <IconStorePlus fontSize="18px" />
              <h3 className="text-slate-300 text-sm ml-1">New product</h3>
            </div>
          </Link>
        </div>
      </section>
      <button
        onClick={logout}
        className="p-1  mt-7 text-black rounded-sm mr-3 bg-white hover:bg-slate-300 active:bg-blue-400"
      >
        Logout
      </button>
    </article>
  );
}
