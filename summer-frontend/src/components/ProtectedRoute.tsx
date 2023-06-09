import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../context/context';
import { ProtectedRouteType } from '../types/protecredRoute';
import { set } from 'date-fns';

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const location = useLocation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      const storedRoles = localStorage.getItem('roles')
      const storedEmail = localStorage.getItem('email')
      if (storedUser && storedToken && storedRoles && storedEmail) {
        const userData = {
          user: Number(storedUser),
          token: storedToken,
          roles: JSON.parse(storedRoles),
          email: storedEmail
        }
        setCurrentUser(userData)
      }
    }
    checkLocalStorage()
    setIsLoading(false);
  }, [setCurrentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    localStorage.setItem('redirectPath', JSON.stringify(location));
    return (
      <Navigate
        to={{
          pathname: '/login'
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
