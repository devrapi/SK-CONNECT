import React from 'react';
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {

  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  HomeIcon ,
  CalendarIcon,
  ClipboardIcon,
  ChartBarIcon,
  GiftIcon
} from "@heroicons/react/24/solid";


// Profile menu component
const profileMenuItems = [
  { label: "My Profile", icon: UserCircleIcon },
  { label: "Edit Profile", icon: Cog6ToothIcon  },
  { label: "Sign Out", icon: PowerIcon },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// Nav list component
const navListItems = [
  { label: "Home", icon: HomeIcon , color: "text-green-500" , path : "index" },
  { label: "Events", icon: CalendarIcon , color: "text-blue-500" , path: "index/events" },
  { label: "Task", icon: ClipboardDocumentCheckIcon , color: "text-red-500" },
  { label: "Leaderboards", icon: ChartBarIcon , color: "text-yellow-400" },
  { label: "Rewards", icon: GiftIcon ,color: "text-purple-500" , path: "index/rewards" },
];



function NavList() {
    return (
      <ul className="flex lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ label, icon ,color, path }, key) => (
          <Typography
            key={label}
            as="a"
            href={path}
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: `h-[28px] w-[28px] ${color} transition-transform transform hover:scale-125` })}{" "}
              <span className="text-gray-900"> {label}</span>
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }

  function MobileNav() {
    return (
      <ul className="flex flex-row justify-between gap-2">
        {navListItems.map(({ label, icon, color }, key) => (
          <Typography
            key={label}
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: `h-[28px] w-[28px] ${color} transition-transform transform hover:scale-125` })}{" "}
            </MenuItem>

          </Typography>
        ))}
      </ul>
    );
  }

// Navbar component
const navbar = () => {



  return (
    <>
      {/* Top Navbar with NavList on large screens */}
      <div className="max-w-screen-xl p-2 mx-auto shadow-lg lg:rounded-full lg:pl-6">
        <div className="relative flex items-center justify-between mx-auto text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium uppercase"
            color="green"
          >
            Sk Connect
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <ProfileMenu />
        </div>
      </div>

      {/* Sticky bottom navbar, hidden on large screens */}
      <div className="fixed bottom-0 left-0 right-0 w-full py-2 lg:hidden bg-sky-100">
        <MobileNav />
      </div>
    </>
  );
};

export default navbar;
