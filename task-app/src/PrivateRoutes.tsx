import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Loader } from './components/Loader';

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader />;
  if (!loading && !isAuthenticated) return <Navigate to='/' />;

  return <Outlet />;
};

export default PrivateRoutes;
