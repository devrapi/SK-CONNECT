import React from 'react';
import {
  Navbar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  CogIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

import Logout from '../../AuthAdmin/logout';

const NavBar = () => {
  return (
    <nav className="p-4 bg-gray-100 ">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <Typography variant="h6" className="font-bold text-green-700">
          SANGGUNIANG KABATAAN NG UNO
        </Typography>

        {/* Right-side icons */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <IconButton
            color="gray"
            className="transition-colors duration-200 hover:bg-gray-200"
          >
            <BellIcon className="w-6 h-6" />
          </IconButton>

          {/* User Menu */}
          <Menu placement="bottom-end">
            <MenuHandler>
              <IconButton
                color="gray"
                className="transition-colors duration-200 hover:bg-gray-200"
              >
                <UserCircleIcon className="w-6 h-6" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem className="flex items-center gap-2 hover:bg-gray-100">
                <CogIcon className="w-5 h-5 text-gray-600" />
                <span>Settings</span>
              </MenuItem>
              <MenuItem className="flex items-center gap-2 hover:bg-gray-100">
                <Logout />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
