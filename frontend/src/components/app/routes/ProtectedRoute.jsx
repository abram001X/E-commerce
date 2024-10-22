import { useContext } from 'react';
import { AuthContext } from '../../../provider/authProvider';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useContext(AuthContext)

  if (isLoading) return <h1 className='text-white'>...Loading</h1>;
  if (!isLoading && !isAuthenticated) return <Navigate to={'/'} replace />;
  return <Outlet />;
}
