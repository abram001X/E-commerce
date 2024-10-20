/* eslint-disable react/prop-types */
import { createContext,useState } from 'react';

export const ProductsProvider = createContext('');
export default function ProductsGlobal({children}){
  const [searchValue, setSearchValue] = useState('');
  const [price, setPrice] = useState(0);
  const [max, setMax] = useState(null);
  const [highPrice, setHighPrice] = useState(false);
  const valueProvider = { 
    searchValue,
    setSearchValue,
    price,
    setPrice,
    max,
    setMax,
    highPrice,
    setHighPrice
  };
    return (
        <ProductsProvider.Provider value={valueProvider}>
            {children}
        </ProductsProvider.Provider>
    )
}
