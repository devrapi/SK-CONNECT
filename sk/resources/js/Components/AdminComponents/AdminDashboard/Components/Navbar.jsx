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
    <div className="p-4 bg-slate-100">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <Typography variant="h6" className="text-gray-900">
          SK CONNECT
        </Typography>

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <IconButton color="gray">
            <BellIcon className="w-6 h-6" />
          </IconButton>

          {/* User Menu */}
          <Menu placement="bottom-end">
            <MenuHandler>
              <IconButton color="gray">
                <UserCircleIcon className="w-6 h-6" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem className="flex items-center gap-2">
                <Logout/>
              </MenuItem>

            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
