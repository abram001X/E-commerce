import { useContext, useState } from 'react';
import { ProductsContext } from '../../provider/ProductsProvider.jsx';

export default function Filter() {
  const { setSearchValue, setPrice, price, max, setHighPrice } =
    useContext(ProductsContext);
  const [data, setData] = useState('');
  const [viewPrice, setViewPrice] = useState(false);
  const handleSearch = (e) => {
    setData(e.target.value);
  };
  const sendValue = (e) => {
    e.preventDefault();
    setPrice(0);
    setSearchValue(data);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
    setViewPrice(true);
  };
  return (
    <section className="mb-7 mt-3 flex flex-col p-3 pt-0 min-h-32 justify-between">
      <form onSubmit={sendValue}>
        <input
          onChange={handleSearch}
          type="search"
          className="bg-black mt-2  p-1 border-b border-b-blue-700 outline-none focus:bg-slate-900"
          placeholder="Search..."
        />
      </form>
      <h1 className="font-semibold mt-5">Filter by price</h1>
      <div className="pl-3 border-l border-l-slate-700">
        <div className="flex mt-5 ">
          <div>
            <h3 className="text-gray-500 text-sm ">Max price</h3>

            <input
              type="range"
              min={0}
              value={price}
              className="mt-2 float-end -translate-y-0.5 w-36 "
              max={max}
              onChange={handlePrice}
            />
          </div>
          <label htmlFor="order by" className="ml-1 self-end  text-end">
            {viewPrice && price + '$'}
          </label>
        </div>
        <div className=" mt-7 w-36  text-white">
          
        <h3 className="text-gray-500 text-sm ">Order by</h3>
          <select
            name="order by"
            id="order by"
            className="w-full bg-black outline-none p-1  rounded-lg hover:bg-gray-900 text-gray-500 text-sm "
            onChange={(e) =>
              setHighPrice(e.target.value == 'true' ? true : false)
            }
          >
            <option value={false}>Low price</option>
            <option value={true}>High price</option>
          </select>
        </div>
      </div>
    </section>
  );
}
