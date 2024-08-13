import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import Logout from './logout';
const index = () => {
    const{user} = useContext(AppContext);
  return (
    <>{
        user ?(
            <>
            <div>hello {user.name}</div>
            <div>
               <Logout/>
            </div>
            </>
        ) : (<>u r not login</>)
    }

    </>
  )
}

export default index
