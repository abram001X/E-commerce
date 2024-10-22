/* eslint-disable react/prop-types */
import { createContext,useState } from 'react';

export const ProductsContext = createContext({});

export default function ProductsProvider({children}){
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
        <ProductsContext.Provider value={valueProvider}>
            {children}
        </ProductsContext.Provider>
    )
}
