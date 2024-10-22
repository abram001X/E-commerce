import { useParams } from 'react-router-dom';
import Main from './app/Main';
import ProductsProvider from '../provider/ProductsProvider';

export default function Category() {
  const { id } = useParams();
  return (
    <ProductsProvider>
      <Main id={id} />
    </ProductsProvider>
  );
}
