import React, { useContext } from 'react'
import Logout from '../AuthAdmin/logout'
import { AppContext } from '../../Context/AppContext'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
const AdminIndex = () => {
    const{admin} = useContext(AppContext);
  return (
    <>
        {admin ? (

            <>

<div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet/>
        </main>
      </div>
    </div>

        </>

    ): (
            null
        )}

    </>
  )
}

export default AdminIndex
