
import { Navigate } from 'react-router-dom';
import { JSX, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check both Redux state and localStorage
    const hasToken = token || localStorage.getItem("access-token");
    setIsAuthenticated(!!hasToken);
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
