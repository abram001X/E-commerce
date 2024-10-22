import { Link } from 'react-router-dom';
import { IconBxStore, IconProfile } from '../Icons';
import { useContext } from 'react';
import { AuthContext } from '../../provider/authProvider';

export default function Header() {
  const { isAuthenticated, setProfile, profile } = useContext(AuthContext);

  return (
    <header className="bg-slate-900 bg-opacity-90 p-2 flex-1 sticky top-0 z-40 flex justify-between">
      <Link to={'/'}>
        <div className="flex">
          <IconBxStore color="#fff" fontSize="30" />
          <h1 className="text-white text-2xl ml-1">React Store</h1>
        </div>
      </Link>
      {!isAuthenticated ? (
        <div className="flex text-white justify-around">
          <Link to={'/login'}>
            <button className="p-1  rounded-sm mr-3 bg-white text-black hover:bg-gray-100 active:bg-gray-200">
              Login
            </button>
          </Link>
          <Link to={'/register'}>
            <button className="p-1  rounded-sm mr-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800">
              Sign up
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex">
          <button className="p-1 text-black rounded-sm mr-3 bg-white hover:bg-slate-300 active:bg-blue-400">
            Logout
          </button>
          <div className="hover:cursor-pointer hover:opacity-70" onClick={()=>setProfile(profile ? false : true)}>
              <IconProfile color="#fff" fontSize="32" />
          </div>
        </div>
      )}
    </header>
  );
}
