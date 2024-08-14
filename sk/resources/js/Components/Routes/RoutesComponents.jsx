import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Main from '../UsersComponents/Main';
import Register from '../UsersComponents/AuthUsers/register';
import Login from '../UsersComponents/AuthUsers/login';
import Index from '../UsersComponents/AuthUsers/index';
import NotFound from './NotFound';
import AdminRegister from '../AdminComponents/AuthAdmin/register'
import AdminLogin from '../AdminComponents/AuthAdmin/login'
import Dashboard from '../AdminComponents/AdminDashboard/AdminIndex'
import ProtectedRoutes from './ProtectedRoutes';

const RoutesComponents = () => {
  return (

   <Routes>

        <Route path='/' element={<Main/>}>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Route>

        <Route path="*" element={<NotFound />}/>

        <Route path='/admin/register' element={<AdminRegister/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>


        <Route element={<ProtectedRoutes requiredRole="admin" />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<ProtectedRoutes requiredRole="user" />}>
        <Route path="/index" element={<Index />} />
      </Route>

   </Routes>
  )
}

export default RoutesComponents
