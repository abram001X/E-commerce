import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postUser } from '../../../lib/postUser';

const URL =
  import.meta.env.VITE_BACKEND_URL_LOGIN_ACCOUNT ||
  'http://localhost:3000/login';
export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const loginUser = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      const data = {
        username,
        email,
        password
      };
      postUser(URL, data).then((user) => {
        console.log(user);
        setMsg(typeof user.response == 'string' ? user.response : 'Login succesfull!!');
      });
      
    } else {
      setError(true);
    }
  };
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
          onClick={() => setError(false)}
          type="text"
          placeholder="Username"
          className="p-2 w-96 text-black border-b border-b-blue-700 outline-none focus:bg-gray-200"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col">
        <input
          onClick={() => setError(false)}
          type="email"
          placeholder="Email"
          className="p-2 w-96 text-black border-b border-b-blue-700 outline-none focus:bg-gray-200"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col  pb-3">
        <input
          onClick={() => setError(false)}
          type="password"
          placeholder="Password"
          className="p-2 border-b border-b-blue-700  outline-none focus:bg-gray-200"
          onChange={(e) => {
            setPassword(e.target.value);
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
        {error && (
          <p className="text-red-700">Password or email is incorrect</p>
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
