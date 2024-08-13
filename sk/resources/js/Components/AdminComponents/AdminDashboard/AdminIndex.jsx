import React, { useContext } from 'react'
import Logout from '../AuthAdmin/logout'
import { AppContext } from '../../Context/AppContext'
const AdminIndex = () => {
    const{admin} = useContext(AppContext);
  return (
    <>
        {admin ? (<>
            <h1>admin {admin.name}</h1>
        <div>
            <Logout/>
        </div>
        </>): (
            <div>

                u r not log in
            </div>
        )}

    </>
  )
}

export default AdminIndex
