import React from 'react'
import ApiService from '../../Services/ApiService';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { PowerIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

const logout = () => {

    const{  token , setToken , setUser}  = useContext(AppContext);
    const navigate = useNavigate();


   const handleLogout = async(event) => {
    event.preventDefault()

        try {
          const res = await ApiService.post('/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = res.data;
          console.log(data);

          if (res.status === 200) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate('/');
          }

        } catch (error) {
          console.error('Error during logout:', error);
        }
      }

  return (
    <>

    <div className='flex'onClick={handleLogout}>
         <PowerIcon className="w-5 h-5 mr-2 text-red-500" />
         <Typography variant="small" className="font-medium text-red-500">
            Sign Out
          </Typography>
    </div>


    </>
  )
}

export default logout
