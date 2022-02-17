import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { isLogin, isLoading } = useAuthStatus();

  if (isLoading) return <Spinner />;

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
