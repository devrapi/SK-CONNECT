import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import ApiService from '../../Services/ApiService';

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
            navigate('/admin/login');
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
