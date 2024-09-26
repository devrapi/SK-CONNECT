import React, { useContext } from 'react'
import { useState } from "react";
import Logout from '../../AuthAdmin/logout'
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,

  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
   CalendarIcon,
   GiftIcon,
   ArchiveBoxIcon,
   ClipboardDocumentCheckIcon
  } from "@heroicons/react/24/solid";
  import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';

const Sidebar = () => {

    const{ticket} = useContext(AppContext);

    const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  return (
    <>
        <Card className="h-[calc(100vh] w-full max-w-[20rem] p-6   rounded-xl">

        <div className="flex items-center p-4 mb-2">
        <img src="/img/sklogo.png" alt="Logo" className='w-auto h-12 mr-2'/>
        <img src="/img/uno.png" alt="Logo" className='w-auto h-12'/>
        <img src="/img/sk.png" alt="Logo" className='w-auto h-12'/>
      </div>
      <List>
              <ListItem>
                <ListItemPrefix>
                <PresentationChartBarIcon className="w-6 h-6" />
                </ListItemPrefix>
                <Link to="/admin/dashboard/analytics">
                Analytics
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="w-6 h-6" />
                </ListItemPrefix>
                <Link to="/admin/dashboard/user-tables">
                Youth Profiles
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <CalendarIcon  className="w-6 h-6" />
                </ListItemPrefix>
                <Link to="/admin/dashboard/calendars">
                Events
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <GiftIcon  className="w-6 h-6" />
                </ListItemPrefix>
                <Link to="/admin/dashboard/avail-rewards">
                Rewards
                </Link>
              </ListItem>

              <ListItem>
                <ListItemPrefix>
                <ClipboardDocumentCheckIcon className="w-6 h-6" />
                </ListItemPrefix>
                <Link to="/admin/dashboard/task">
                Task Management
                </Link>

              </ListItem>

              {/* <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                </ListItemPrefix>
                <Link to="/admin/dashboard/profilling">
                User Profiling Management
                </Link>
              </ListItem> */}


        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="w-6 h-6" />
          </ListItemPrefix>
          <Link to="/admin/dashboard/inbox">
          Inbox
          </Link>
          <ListItemSuffix>
            <Chip value={ticket?.length}  size="sm" variant="ghost" color="red" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ArchiveBoxIcon className="w-6 h-6" />
          </ListItemPrefix>
          <Link to="/admin/dashboard/archived">
          Archived Youth
          </Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="w-6 h-6" />
          </ListItemPrefix>
          Settings
        </ListItem>

      </List>


    </Card>

    </>

  )
}

export default Sidebar
