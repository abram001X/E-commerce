import 'tailwindcss/tailwind.css';
import Main from './components/app/Main';
import Header from './components/app/Header';
import { Route, Routes } from 'react-router-dom';
import Category from './components/Category';
import Acces from './components/register/Acces';
import Product from './components/app/Product';
import ProductsGlobal from './provider/ProductsProvider';
import AuthProvider from './provider/authProvider';
import ProtectedRoute from './components/app/routes/ProtectedRoute';
import Profile from './components/app/routes/Profile';
import AddProduct from './components/app/routes/AddProduct';
function App() {
  return (
    <>
      <AuthProvider>
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
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-products" element={<AddProduct />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
