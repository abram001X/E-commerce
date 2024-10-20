import 'tailwindcss/tailwind.css';
import Main from './components/app/Main';
import Header from './components/app/Header';
import { Route, Routes } from 'react-router-dom';
import Category from './components/Category';
import Acces from './components/app/Register/Acces';
import Product from './components/app/Product';
import ProductsGlobal from './provider/ProductsProvider';
function App() {
  
  return (
    <>
      <Header />
      <div className="flex">
          <Routes>
            <Route
              path="/"
              element={
                <ProductsGlobal>
                  <Main />
                </ProductsGlobal>
              }
            />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/:acces" element={<Acces />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
