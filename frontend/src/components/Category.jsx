import { useParams } from 'react-router-dom';
import Main from './app/Main';

export default function Category() {
  const { id } = useParams()
  return <Main id={id} />;
}
