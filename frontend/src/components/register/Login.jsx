import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/authProvider'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { signin, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password
    };
    const res = await signin(data);
    setMsg(res.message);
    if (res.message == 'Login succesfull!!') {
      navigate('/');
    }
  };
  if(isAuthenticated) return <Navigate to={'/'}/>
  return (
    <form
      action="POST"
      className="flex flex-col text-black justify-around min-h-96"
      onSubmit={loginUser}
    >
      <h1 className="text-3xl  font-semibold">Acces account</h1>
      <p>Enter your username, password & email </p>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          className="p-2 w-96 text-black border-b border-b-blue-700 outline-none focus:bg-gray-200"
          onChange={(e) => {
            setUsername(e.target.value);
            setMsg('');
          }}
        />
      </div>
      <div className="flex flex-col  pb-3">
        <input
          type="password"
          placeholder="Password"
          className="p-2 border-b border-b-blue-700  outline-none focus:bg-gray-200"
          onChange={(e) => {
            setPassword(e.target.value);
            setMsg('');
          }}
        />

        <button className="hover:bg-blue-700 active:bg-blue-800 bg-blue-500 border  self-end text-white border-blac rounded-md w-16  mt-4 p-1">
          Send
        </button>
        {msg !== 'Login succesfull!!' ? (
          <p className="text-red-700">{msg}</p>
        ) : (
          <p className="text-green-700">{msg}</p>
        )}
      </div>
      <div className="flex w-full justify-between">
        <Link to={'/login'}>
          <p className="text-blue-800 font-medium">Login</p>
        </Link>
        <Link to={'/register'}>
          <p className="text-blue-800 font-medium">Sign in</p>
        </Link>
      </div>
    </form>
  );
}
