import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { fetchCategories } from '../../lib/fetchCategories';
import Filter from '../Main-components/Filter';
import { Link } from 'react-router-dom';
import {ProductsContext} from '../../provider/ProductsProvider.jsx';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const { setPrice, setSearchValue } = useContext(ProductsContext);
  useEffect(() => {
    fetchCategories().then((item) => setCategories(item));
  }, []);
  const categoriesArray = [
    'Furniture',
    'Electronics',
    'Shoes',
    'Miscellaneous',
    'Baby clothes',
  ];

  return (
      <aside id="aside" className=" bg-black w-1/5  flex flex-col text-white">
        <nav className="flex flex-col fixed">
          <ul>
            <Filter />
            <h1 className="ml-3 font-semibold">Categories</h1>
            <li className="flex p-2 h-12 items-end ml-3 pl-3 border-l border-slate-700 text-gray-500 ">
              <Link
                to={`/`}
                className="text-sm  hover:text-white w-full hover:bg-gray-900 p-1 rounded-md"
                onClick={() => {
                  setPrice(0);
                  setSearchValue('');
                }}
              >
                All
              </Link>
            </li>
            {categories.map((obj) => {
              if (categoriesArray.includes(obj.name)) {
                return (
                  <li
                    key={obj.id}
                    className="flex p-2 h-12 items-end ml-3 pl-3 border-l border-slate-700 text-gray-500"
                  >
                    <Link
                      to={`/category/${obj.id}`}
                      className="text-sm w-full flex hover:text-white hover:bg-gray-900 p-1 rounded-md "
                      onClick={() => {
                        setPrice(0);
                        setSearchValue('');
                      }}
                    >
                      <img
                        src={obj.image}
                        className="w-8 h-5 rounded-lg mr-1"
                      />
                      <b>{obj.name}</b>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </aside>
  );
}
