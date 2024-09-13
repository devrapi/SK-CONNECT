import React, { useContext, useState, useEffect } from 'react';
import ApiService from '../Services/ApiService';
import { Outlet, Navigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { Spinner } from "@material-tailwind/react";
const ProtectedRoutes = ({requiredRole}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { token , role  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

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


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1.5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (isLoading || isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="green" className='w-10 h-10' />
      </div>
    );
  }



 if (isAuthenticated && requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <>
      {isAuthenticated ? <Outlet />  :  <Navigate to="/unauthorized" />}


    </>
  );
};

export default ProtectedRoutes;
