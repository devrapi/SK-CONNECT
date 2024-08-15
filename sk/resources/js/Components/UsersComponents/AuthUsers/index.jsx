import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import Logout from './logout';
const index = () => {
    const{user} = useContext(AppContext);
  return (
    <>
    {
        user ?(<><div>
            hello {user.role}
        </div>

        <div>
            <Logout/>
        </div> </>):(null)
    }


    </>
  )
}

export default index
