/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { loginRequest, verifyTokenRequest } from '../lib/api';
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
      return res.data;
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.accessToken) {
        console.log('bad')
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
        setIsLoading(false);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider value={{ signin, user, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
