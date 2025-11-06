
import { Navigate } from 'react-router-dom';
import { JSX, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((state) => state.auth.token) || localStorage.getItem("access-token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate hydration wait
    const timeout = setTimeout(() => setIsLoading(false), 50);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  return token ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
