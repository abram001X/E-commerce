import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { registerRequest } from '../../lib/api';
import { AuthContext } from '../../provider/authProvider';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const {isAuthenticated} = useContext(AuthContext)
  const registerUser = async (e) => {
    e.preventDefault();
    if (password === confirm && email.includes('@')) {
      const data = {
        username,
        email,
        password
      };
      const res = await registerRequest(data);
      setMsg(res.message);
      if (res.message == 'Register succesfull!!') {
        navigate('/login');
      }
    } else {
      setError(true);
    }
  };
  if(isAuthenticated) return <Navigate to={'/'}/>
  return (
    <div className="text-black">
      <h1 className="text-black text-3xl mb-3 font-semibold">Create account</h1>
      <p className="w-80 mt-4 p-register font-semibold">
        Create a strong password with combined letters, numbers and symbols.
      </p>
      <form
        id='register'
        action="POST"
        className="flex flex-col text-black justify-around min-h-96"
        onSubmit={registerUser}
      >
        {' '}
        <div className="flex flex-col">
          <input
          name='register'
            onChange={(e) => {
              setUsername(e.target.value);
              setError(false);
              setMsg('');
            }}
            type="text"
            placeholder="Username"
            className="p-2 w-96 text-black border-b border-b-blue-700 outline-none focus:bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <input
          
          name='register'
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            type="email"
            placeholder="Email"
            className="p-2 w-96 text-black border-b border-b-blue-700 outline-none focus:bg-gray-200"
          />
        </div>
        <div className="flex flex-col pb-3">
          <input
          
          name='register'
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            type="password"
            placeholder="Password"
            className=" p-2 mb-5 mt-2 border-b border-b-blue-700 outline-none focus:bg-gray-200"
          />
          <input
          
          name='register'
            onChange={(e) => {
              setConfirm(e.target.value);
              setError(false);
            }}
            type="password"
            placeholder="Confirm"
            className="border-b p-2  border-b-blue-700 outline-none focus:bg-gray-200"
          />
          <button className="hover:bg-blue-700 active:bg-blue-800 bg-blue-500 border self-end text-white border-blac rounded-md w-16  mt-4 p-1 outline-none">
            Send
          </button>

          {msg !== 'register succesfull!!' ? (
            <p className="text-red-700">{msg}</p>
          ) : (
            <p className="text-green-700">{msg}</p>
          )}
          {error && (
            <p className="text-red-700">Password or email is incorrect</p>
          )}
        </div>
      </form>
      <div className="flex w-full justify-between">
        <Link to={'/login'}>
          <p className="text-blue-800 font-medium">Login</p>
        </Link>
        <Link to={'/register'}>
          <p className="text-blue-800 font-medium">Sign in</p>
        </Link>
      </div>
    </div>
  );
}
