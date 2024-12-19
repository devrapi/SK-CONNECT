import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import ApiService from '../../Services/ApiService';
import { PowerIcon } from '@heroicons/react/24/outline';

const logout = () => {

    const{  token , setToken , setUser}  = useContext(AppContext);
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();

        try {
          const res = await ApiService.post('/admin/logout', {}, {
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
    <div className="flex items-center">
    <PowerIcon className="w-5 h-5" color='red' onClick={handleLogout} />
    <span className="ml-2 text-red-500 cursor-pointer" onClick={handleLogout}>Logout</span>
</div>
  )
}

export default logout
