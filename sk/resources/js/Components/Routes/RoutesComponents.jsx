import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Main from '../UsersComponents/Main';
import Register from '../UsersComponents/AuthUsers/register';
import Login from '../UsersComponents/AuthUsers/login';
import Index from '../UsersComponents/AuthUsers/index';
import NotFound from './NotFound';
const RoutesComponents = () => {
  return (

   <Routes>

        <Route path='/' element={<Main/>}>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Route>

        <Route path='/index' element={<Index/>}/>

        <Route path="*" element={<NotFound />}/>


   </Routes>
  )
}

export default RoutesComponents
