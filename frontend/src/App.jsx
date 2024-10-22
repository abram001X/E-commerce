import 'tailwindcss/tailwind.css';
import Main from './components/app/Main';
import { Route, Routes } from 'react-router-dom';
import Category from './components/Category';
import Acces from './components/register/Acces';
import Product from './components/app/Product';
import AuthProvider from './provider/authProvider';
import ProtectedRoute from './components/app/routes/ProtectedRoute';
import AddProduct from './components/app/routes/AddProduct';
import ProductsProvider from './provider/ProductsProvider';
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProductsProvider>
                <Main />
              </ProductsProvider>
            }
          />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/:acces" element={<Acces />} />
          <Route path="/product/:id" element={<Product />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/add-products" element={<AddProduct />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
