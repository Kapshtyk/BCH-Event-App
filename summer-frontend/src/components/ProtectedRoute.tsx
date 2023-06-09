import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../context/context';
import { ProtectedRouteType } from '../types/protecredRoute';
import { set } from 'date-fns';
import { Dna } from 'react-loader-spinner';

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
        console.log(userData)
        setCurrentUser(userData)
      }
    }
    checkLocalStorage()
    setIsLoading(false);
  }, [setCurrentUser]);

  if (isLoading) {
    return <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />;
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
