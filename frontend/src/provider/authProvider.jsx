/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { loginRequest, verifyTokenRequest } from '../lib/api';
import Profile from '../components/app/Profile';
import Header from '../components/app/Header';
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(false);
  const logout = () => {
    Cookies.remove('accessToken');
    setUser(null);
    setIsAuthenticated(false);
  };
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
        console.log('bad');
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
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
    <AuthContext.Provider
      value={{
        logout,
        signin,
        user,
        isAuthenticated,
        isLoading,
        setProfile,
        profile
      }}
    >
      <Header />
      <div className="flex">
        {children}
        {isAuthenticated && profile && <Profile />}
      </div>
    </AuthContext.Provider>
  );
}
