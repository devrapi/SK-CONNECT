import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import Logout from './logout'
import Navbar from './pages/navbar'

const index = () => {
    const{user} = useContext(AppContext);
  return (
    <>
    {
        user ?(<>

        <div>
            <Navbar/>
        </div>

        <div>
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
