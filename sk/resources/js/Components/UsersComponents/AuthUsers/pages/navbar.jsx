import React, { useContext } from 'react';
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { useLocation, Link } from "react-router-dom";
import {
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
    GiftTopIcon,
    QrCodeIcon,
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
    color="green"
    className="p-0.5 cursor-pointer border-2 border-blue-700 "
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
    <Link to="/index/QrCodeScanner" className="flex items-center gap-2">
      <QrCodeIcon className="w-5 h-5 text-gray-500" />
      <Typography variant="small" className="font-medium">
        Event Scanner
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

  {/* <MenuItem className="flex items-center gap-2">
    <Link to="/index/referral" className="flex items-center gap-2">
      <MegaphoneIcon className="w-5 h-5 text-gray-500" />
      <Typography variant="small" className="font-medium">
        Refer a Friend
      </Typography>
    </Link>
  </MenuItem> */}

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
    { label: "Home", icon: HomeIcon, path: "/index" },
    { label: "Events", icon: CalendarIcon, path: "/index/events" },
    { label: "Earn", icon: ClipboardDocumentCheckIcon, path: "/index/tasks" },
    { label: "Rewards", icon: GiftIcon, path: "/index/rewards" },
    { label: "Leaderboards", icon: ChartBarIcon, path: "/index/leaderboards" },
  ];

  function NavList() {
    const location = useLocation();

    return (
      <ul className="flex gap-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ label, icon, path }) => (
          <Typography
            key={label}
            as="div"
            variant="small"
            className="font-medium"
          >
            <Link to={path} className="flex flex-col items-center gap-0 lg:rounded-full">
              {React.createElement(icon, {
                className: `h-[28px] w-[28px] ${
                  location.pathname === path ? "text-green-700" : "text-gray-500"
                } transition-transform transform hover:scale-125`,
              })}
              <span
                className={`text-xs ${
                  location.pathname === path ? "text-green-700" : "text-gray-900"
                }`}
              >
                {label}
              </span>
            </Link>
          </Typography>
        ))}
      </ul>
    );
  }

  function MobileNav() {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 shadow-md lg:hidden rounded-t-3xl">
        <ul className="flex items-center justify-between px-6 py-4 ">
          {navListItems.map(({ label, icon, path }) => (
            <Link
              key={label}
              to={path}
              className="flex flex-col items-center justify-center transition-transform transform hover:scale-110"
            >
              {React.createElement(icon, {
                className: `h-8 w-8 ${
                  location.pathname === path ? "text-green-700" : "text-gray-500"
                }`,
              })}
            </Link>
          ))}
        </ul>
      </div>
    );
  }

  const Navbar = () => {
    const { user } = useContext(AppContext);

    return (
        <>
        {/* Top Navbar for large screens */}
        <div className="max-w-screen-xl p-2 mx-auto shadow-sm lg:pl-6 rounded-b-xl">
          <div className="relative flex items-center justify-between mx-auto text-blue-gray-900">
            {/* Star Icon with Points */}
            <div className='flex'>


            <Typography
              as="a"
              href="#"
              className="flex items-center mr-6 ml-2 cursor-pointer py-1.5 font-medium uppercase"
              color="green"
            >
              <div className="flex items-center">
                <img src="/img/star.png" alt="Star Icon" className="w-7 h-7" />
                <span className="ml-2 text-green-700">{user.points}</span>
              </div>
            </Typography>

            {/* Gift Icon with Claimed Rewards */}
            <Typography
              as="a"
              href="#"
              className="flex items-center mr-6 ml-4 cursor-pointer py-1.5 font-medium uppercase"
              color="green"
            >
              <div className="flex items-center">
                <img src="/img/gifticon.png" alt="Gift Icon" className="w-6 h-6" />
                <span className="ml-2 text-green-700">{user.reward_claimed_count} / 3</span>
              </div>
            </Typography>
            </div>
            {/* Navigation and Profile */}
            <div className="hidden lg:block">
              <NavList />
            </div>
            <div className="flex items-center">
              <Inbox />
              <ProfileMenu />
            </div>
          </div>
        </div>

        {/* Sticky Bottom Navbar for mobile view */}
        <div className='mt-4'>
        <MobileNav />
        </div>

      </>

    );
  };


  export default Navbar;


