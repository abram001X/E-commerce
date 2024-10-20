import { Link } from 'react-router-dom';
import { IconBxStore } from '../Icons';

export default function Header() {
  return (
    <header className="bg-slate-900 bg-opacity-90 p-2 flex-1 sticky top-0 z-40 flex justify-between">
      <Link to={'/'}>
        <div className="flex">
          <IconBxStore color="#fff" fontSize="30" />
          <h1 className="text-white text-2xl ml-1">React Store</h1>
        </div>
      </Link>
      <div className="flex text-white justify-around">
        <Link to={'/login'}>
          <button className="p-1  rounded-sm mr-3 bg-white text-black hover:bg-gray-100 active:bg-gray-200">
            Login
          </button>
        </Link>
        <Link to={'/register'}>
          <button className="p-1  rounded-sm mr-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800">
            Sign in
          </button>
        </Link>
      </div>
    </header>
  );
}
