import React, { useContext } from 'react'
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
               <div className="flex h-screen bg-slate-100">
                     <Sidebar className="sticky top-0 h-screen" />
                    <div className="flex flex-col flex-1">
                        <Navbar />
                        <main className="flex-1 p-6 overflow-y-auto">
                            <Outlet />
                        </main>

                    </div>
                </div>


                </>
            ) : null}

    </>
  )
}

export default AdminIndex
