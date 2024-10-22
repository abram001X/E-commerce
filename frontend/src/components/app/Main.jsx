/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { fetchProducts } from '../../lib/fetchProducts';
import Gallery from '../Main-components/Gallery';
import Menu from './Menu';
import { ProductsContext } from '../../provider/ProductsProvider.jsx';
const orderByLowPrice = (a, b) => {
  if (a.price > b.price) {
    return 1;
  }
  if (a.price < b.price) {
    return -1;
  }
  return 0;
};
const orderByHighPrice = (a, b) => {
  if (b.price > a.price) {
    return 1;
  }
  if (b.price < a.price) {
    return -1;
  }
  return 0;
};
export default function Main({ id }) {
  const [products, setProducts] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const { searchValue, setMax, price, max, highPrice } =
    useContext(ProductsContext);
  useEffect(() => {
    setIsLoad(true);
    fetchProducts(id, searchValue, parseInt(price)).then((items) => {
      setProducts(items);
      const number = [];
      items.map((obj) => {
        if (!obj.images[0][0].includes('"')) {
          number.push(obj.price);
        }
      });
      if (!max) {
        setMax(Math.max(...number));
      }
      setIsLoad(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, searchValue, price, highPrice]);

  return (
    <>
      <Menu />
      <main className="border-slate-500 min-h-screen w-4/5 border-t-0 mt-5">
        {isLoad && (
          <div className="border border-white w-56 fixed z-50 load"></div>
        )}
        <section className="grid place-content-center w-full p-0">
          {highPrice
            ? products
                .sort(orderByHighPrice)
                .map((product) => (
                  <Gallery key={product.id} product={product} />
                ))
            : products
                .sort(orderByLowPrice)
                .map((product) => (
                  <Gallery key={product.id} product={product} />
                ))}
        </section>
      </main>
    </>
  );
}
