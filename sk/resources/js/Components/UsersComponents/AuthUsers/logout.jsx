import React from 'react'
import ApiService from '../../Services/ApiService';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const logout = () => {

    const{  token , setToken , setUser}  = useContext(AppContext);
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();

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
            navigate('/login');
          }

        } catch (error) {
          console.error('Error during logout:', error);
        }
      }

  return (
    <div>
         <button className='p-2 text-white bg-red-500' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default logout
