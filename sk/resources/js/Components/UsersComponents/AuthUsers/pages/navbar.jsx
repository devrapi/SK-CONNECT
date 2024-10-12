import React, { useContext } from 'react';
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import {
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
    GiftTopIcon,
    BellAlertIcon,
  HomeIcon ,
  CalendarIcon,
  ChartBarIcon,
  GiftIcon,
    MegaphoneIcon,
    StarIcon

} from "@heroicons/react/24/solid";
import Logout from '../logout';
import { AppContext } from '../../../Context/AppContext';
import Inbox from '../Profile/Inbox';

export function ProfileMenu() {

    const{user}= useContext(AppContext);

  return (
    <Menu>
    <MenuHandler>
  <Avatar
    variant="circular"
    size="md"
    withBorder={true}
    color="blue"
    className="p-0.5 cursor-pointer"
    alt="User Profile"
    // Use default image if user.image_path is undefined or empty
    src={user.image_path ? `/storage/${user.image_path}` : '/img/default_user.jpg'}
  />
</MenuHandler>

      <MenuList>
  <MenuItem className="flex items-center gap-2">
    <Link to="/index/profile" className="flex items-center gap-2">
      <UserCircleIcon className="w-5 h-5 text-gray-500" />
      <Typography variant="small" className="font-medium">
        My Profile
      </Typography>
    </Link>
  </MenuItem>

  <MenuItem className="flex items-center gap-2">
    <Link to="/index/rewards-ticket" className="flex items-center gap-2">
      <GiftTopIcon className="w-5 h-5 text-gray-500" />
      <Typography variant="small" className="font-medium">
        Rewards Ticket
      </Typography>
    </Link>
  </MenuItem>

  <MenuItem className="flex items-center gap-2">
    <Link to="/index/referral" className="flex items-center gap-2">
      <MegaphoneIcon className="w-5 h-5 text-gray-500" />
      <Typography variant="small" className="font-medium">
        Refer a Friend
      </Typography>
    </Link>
  </MenuItem>

  <hr className="my-2 border-blue-gray-50" />

  <MenuItem className="flex items-center gap-2">
    <Link to="/logout" className="flex items-center gap-2">
      <Logout />
    </Link>
  </MenuItem>
</MenuList>
    </Menu>
  );
}

const navListItems = [
    { label: "Home", icon: HomeIcon, color: "text-green-500", path: "/index" },
    { label: "Events", icon: CalendarIcon, color: "text-blue-500", path: "/index/events" },
    { label: "Earn", icon: ClipboardDocumentCheckIcon, color: "text-purple-500", path: "/index/tasks" },
    { label: "Rewards", icon: GiftIcon, color: "text-red-500", path: "/index/rewards" },
    { label: "Leaderboards", icon: ChartBarIcon, color: "text-yellow-400", path: "/index/leaderboards" },
  ];

  function NavList() {
    return (
      <ul className="flex gap-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ label, icon, color, path }, key) => (
          <Typography
            key={label}
            as="div"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <Link to={path} className="flex flex-col items-center gap-0 lg:rounded-full">
              {React.createElement(icon, {
                className: `h-[28px] w-[28px] ${color} transition-transform transform hover:scale-125`,
              })}
              <span className="text-xs text-gray-900">{label}</span>
            </Link>
          </Typography>
        ))}
      </ul>
    );
  }

  function MobileNav() {
    return (
      <ul className="flex flex-row justify-between gap-0">
        {navListItems.map(({ label, icon, color, path }, key) => (
          <Typography
            key={label}
            as="div"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <Link to={path} className="flex flex-col items-center justify-center">
              <MenuItem className="flex flex-col items-center gap-0">
                {React.createElement(icon, {
                  className: `h-[28px] w-[28px] ${color} transition-transform transform hover:scale-125`,
                })}
                {/* <span className="text-xs text-gray-500">{label}</span> */}
              </MenuItem>
            </Link>
          </Typography>
        ))}
      </ul>
    );
  }

  const Navbar = () => {
    const{user}= useContext(AppContext);
    return (
      <>
        {/* Top Navbar with NavList on large screens */}
        <div className="max-w-screen-xl p-2 mx-auto shadow-md lg:rounded-full lg:pl-6">
  <div className="relative flex items-center justify-between mx-auto text-blue-gray-900">
    <Typography
      as="a"
      href="#"
      className="mr-4 ml-2 cursor-pointer py-1.5 font-medium uppercase"
      color="green"
    >
      <div className="flex items-center">
        <StarIcon className="w-8 h-8 mr-2 text-yellow-400" /> {/* Icon */}
        {user.points}
      </div>
    </Typography>

    <div className="hidden lg:block">
      <NavList />
    </div>
    <div className="flex items-center">
    <Inbox/>
    <ProfileMenu />
    </div>

  </div>
</div>


        {/* Sticky bottom navbar, hidden on large screens */}
        <div className="fixed bottom-0 left-0 right-0 w-full py-2 lg:hidden bg-sky-100">
          <MobileNav />
        </div>
      </>
    );
  };

  export default Navbar;


