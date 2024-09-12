import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import Logout from './logout'
import Navbar from './pages/navbar'
import { Outlet } from 'react-router-dom'

const index = () => {
    const{user} = useContext(AppContext);
  return (
    <>
    {
        user ?(<>

        <div>
            <Navbar/>
        <div>
        <main className='lg:mt-10 lg:mx-52 '>
                    <Outlet/>
          </main>
        </div>
        <Logout/>
        </div>
        </>)

        :

        (null)
    }


    </>
  )
}

export default index
