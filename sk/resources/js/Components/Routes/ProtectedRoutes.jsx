import React, { useContext, useState, useEffect } from 'react';
import ApiService from '../Services/ApiService';
import { Outlet, Navigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

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
    }, 1200); // 1.5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (isLoading || isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
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
