import React, { useContext, useState } from 'react';
import Logout from '../../AuthAdmin/logout';
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  CalendarIcon,
  GiftIcon,
  ArchiveBoxIcon,
  ClipboardDocumentCheckIcon,
  MegaphoneIcon
} from '@heroicons/react/24/solid';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';

const Sidebar = () => {
  const { ticket } = useContext(AppContext);

//   // State to track the active ListItem
//   const [activeItem, setActiveItem] = useState('');

//   const handleActiveItem = (item) => {
//     setActiveItem(item);
//   };

  return (
    <>
      <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-6 rounded-xl">
        <div className="flex items-center p-4 mb-2">
          <img src="/img/sklogo.png" alt="Logo" className="w-auto h-12 mr-2" />
        </div>
        <List>
          <ListItem
            // onClick={() => handleActiveItem('analytics')}
            // className={`${
            //   activeItem === 'analytics' ? 'bg-green-700 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/analytics">Analytics</Link>
          </ListItem>

          <ListItem
            // onClick={() => handleActiveItem('profiles')}
            // className={`${
            //   activeItem === 'profiles' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <UserCircleIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/user-tables">Youth Profiles</Link>
          </ListItem>

          <ListItem
            // onClick={() => handleActiveItem('events')}
            // className={`${
            //   activeItem === 'events' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <MegaphoneIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/announcement">Announcement</Link>
          </ListItem>

          <ListItem
            // onClick={() => handleActiveItem('events')}
            // className={`${
            //   activeItem === 'events' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <CalendarIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/calendars">Calendar</Link>
          </ListItem>

          <ListItem
            // onClick={() => handleActiveItem('rewards')}
            // className={`${
            //   activeItem === 'rewards' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <GiftIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/avail-rewards">Rewards</Link>
          </ListItem>

          <ListItem
            // onClick={() => handleActiveItem('tasks')}
            // className={`${
            //   activeItem === 'tasks' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/task">Task Management</Link>
          </ListItem>

          <hr className="my-2 border-blue-gray-50" />

          <ListItem
            // onClick={() => handleActiveItem('inbox')}
            // className={`${
            //   activeItem === 'inbox' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <InboxIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/inbox">Inbox</Link>
            <ListItemSuffix>
              <Chip
                value={ticket?.length}
                size="sm"
                variant="ghost"
                color="red"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>

          <ListItem
            // onClick={() => handleActiveItem('archived')}
            // className={`${
            //   activeItem === 'archived' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <ArchiveBoxIcon className="w-6 h-6" />
            </ListItemPrefix>
            <Link to="/admin/dashboard/archived">Archived Youth</Link>
          </ListItem>

          <ListItem
            // onClick={() => handleActiveItem('settings')}
            // className={`${
            //   activeItem === 'settings' ? 'bg-green-800 text-white' : ''
            // }`}
          >
            <ListItemPrefix>
              <Cog6ToothIcon className="w-6 h-6" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default Sidebar;
