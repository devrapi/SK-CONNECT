import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'

const index = () => {
    const{user} = useContext(AppContext);
  return (
    <>{
        user ?(
            <div>hello {user.name}</div>
        ) : (<>u r not login</>)
    }

    </>
  )
}

export default index
