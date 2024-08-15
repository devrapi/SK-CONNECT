import React, { useContext, useState, useEffect } from 'react';
import ApiService from '../Services/ApiService';
import { Outlet, Navigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const ProtectedRoutes = ({requiredRole}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { token , role  } = useContext(AppContext);

  useEffect(() => {
    ApiService.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    })
    .catch(() => {
      setIsAuthenticated(false);
    });
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }


 //Check if the user's role matches the required role for this route
 if (isAuthenticated && requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <>
      {isAuthenticated ? <Outlet />  :  <Navigate to="/login" />}


    </>
  );
};

export default ProtectedRoutes;
