import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Main from '../UsersComponents/Main';
import Index from '../UsersComponents/AuthUsers/index';
import NotFound from './NotFound';
import AdminRegister from '../AdminComponents/AuthAdmin/register'
import AdminLogin from '../AdminComponents/AuthAdmin/login'
import Dashboard from '../AdminComponents/AdminDashboard/AdminIndex'
import ProtectedRoutes from './ProtectedRoutes';
import NotAuthorized from './NotAuthorized';
import Analytics from '../AdminComponents/AdminDashboard/Pages/Analytics';
import Users from '../AdminComponents/AdminDashboard/Pages/User_tables';
import Calendars from '../AdminComponents/AdminDashboard/Pages/Calendars';
import Profiling from '../AdminComponents/AdminDashboard/Pages/Profiling';
import Event from '../AdminComponents/AdminDashboard/Pages/Event';
import Gamification from '../AdminComponents/AdminDashboard/Pages/Gamification';
import EventUpdate from '../AdminComponents/AdminDashboard/Pages/EventUpdate';
import UsersUpdate from '../AdminComponents/AdminDashboard/Pages/UsersUpdate';
import Archive from '../AdminComponents/AdminDashboard/Pages/Archive';
import Rewards from '../AdminComponents/AdminDashboard/Pages/Rewards';
import Eventusers from '../UsersComponents/AuthUsers/pages/Eventusers';
import RewardsFetch from '../AdminComponents/AdminDashboard/Pages/RewardsFetch';
import RewardUpdate from '../AdminComponents/AdminDashboard/Pages/RewardUpdate';
import RewardUser from '../UsersComponents/AuthUsers/pages/RewardUser';
import TicketInbox from '../AdminComponents/AdminDashboard/Pages/TicketInbox';
import History from '../AdminComponents/AdminDashboard/Pages/History';
import Task from '../AdminComponents/AdminDashboard/Pages/Task';
import TaskUser from '../UsersComponents/AuthUsers/pages/TaskUser';
import LeaderBoards from '../UsersComponents/AuthUsers/pages/LeaderBoards';
import Home from '../UsersComponents/AuthUsers/pages/Home';
import MyProfile from '../UsersComponents/AuthUsers/Profile/MyProfile';
import Referral from '../UsersComponents/AuthUsers/Profile/Referral';
import EditProfile from '../UsersComponents/AuthUsers/Profile/EditProfile';
import RewardsTicket from '../UsersComponents/AuthUsers/Profile/RewardsTicket';
import TaskUpdate from '../AdminComponents/AdminDashboard/Pages/TaskUpdate';
import Announcement from '../AdminComponents/AdminDashboard/Pages/Announcement';
import AnnouncementCreate from '../AdminComponents/AdminDashboard/Pages/AnnouncementCreate';
import AnnouncementUpdate from '../AdminComponents/AdminDashboard/Pages/AnnouncementUpdate';
import QrCode from '../AdminComponents/AdminDashboard/Pages/QrCode';
import QrCodeScanner from '../UsersComponents/AuthUsers/pages/QrCodeScanner';
import VerifyEmail from '../UsersComponents/AuthUsers/VerifyEmail';
import VerifiedEmail from '../UsersComponents/AuthUsers/VerifiedEmail';

const RoutesComponents = () => {
  return (

   <Routes>

        <Route path='/' element={<Main/>}>

        </Route>

        <Route path="*" element={<NotFound />}/>
        <Route path="/unauthorized" element={<NotAuthorized />}/>

        <Route path='/admin/register' element={<AdminRegister/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>



        <Route element={<ProtectedRoutes requiredRole="admin" />}>
        <Route path="/admin/dashboard" element={<Dashboard />} >
        <Route path='/admin/dashboard' element={<Analytics/>}/>
            <Route path='/admin/dashboard/analytics' element={<Analytics/>}/>
            <Route path='/admin/dashboard/user-tables' element={<Users/>}/>
            <Route path='/admin/dashboard/calendars' element={<Calendars/>}/>
            <Route path='/admin/dashboard/avail-rewards' element={<RewardsFetch/>}/>
            <Route path='/admin/dashboard/avail-rewards/:id' element={<RewardUpdate/>}/>
            <Route path='/admin/dashboard/profilling' element={<Profiling/>}/>
            <Route path='/admin/dashboard/archived' element={<Archive/>}/>
            <Route path='/admin/dashboard/profilling/update/:id' element={<UsersUpdate/>}/>
            <Route path='/admin/dashboard/event' element={<Event/>}/>
            <Route path='/admin/dashboard/calendars/update/:id' element={<EventUpdate/>}/>
            <Route path='/admin/dashboard/gamification' element={<Gamification/>}/>
            <Route path='/admin/dashboard/task' element={<Task/>}/>
            <Route path='/admin/dashboard/calendars/QrCode/:id' element={<QrCode/>}/>
            <Route path='/admin/dashboard/task/update/:id' element={<TaskUpdate/>}/>
            <Route path='/admin/dashboard/rewards' element={<Rewards/>}/>
            <Route path='/admin/dashboard/inbox' element={<TicketInbox/>}/>
            <Route path='/admin/dashboard/history' element={<History/>}/>
            <Route path='/admin/dashboard/announcement' element={<Announcement/>}/>
            <Route path='/admin/dashboard/announcement-create' element={<AnnouncementCreate/>}/>
            <Route path='/admin/dashboard/announcement/update/:id' element={<AnnouncementUpdate/>}/>
        </Route>
      </Route>


      {/* <Route path='/admin/dashboard' element={<Dashboard/>}>

        </Route> */}


        <Route element={<ProtectedRoutes/>}>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/verify-email/:id/:token' element={<VerifiedEmail/>}/>
        </Route>

        <Route element={<ProtectedRoutes requiredRole="user" />}>
        <Route path="/index" element={<Index />} >
        <Route path="/index" element={<Home/>} ></Route>
        <Route path="/index/events" element={<Eventusers/>} />
        <Route path="/index/rewards" element={<RewardUser/>} />
        <Route path="/index/tasks" element={<TaskUser/>} />
        <Route path="/index/profile" element={<MyProfile/>} />
        <Route path="/index/editProfile/:id" element={<EditProfile/>} />
        <Route path="/index/referral" element={<Referral/>} />
        <Route path="/index/leaderboards" element={<LeaderBoards/>} />
        <Route path="/index/rewards-ticket" element={<RewardsTicket/>} />
        <Route path="/index/QrCodeScanner" element={<QrCodeScanner/>} />

      </Route>
      </Route>
   </Routes>
  )
}

export default RoutesComponents
