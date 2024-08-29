import React from 'react';
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

const NavBar = () => {
  return (
    <nav className="max-w-screen-xl px-4 py-3 mt-5">
    <div className="flex items-center justify-between text-black">
      {/* Left: Admin Dashboard */}
      <Typography
        as="a"
        href="#"
        variant="h6"
        className="cursor-pointer py-1.5 text-black"
      >
       SK CONNECT DASHBOARD
      </Typography>

      {/* Right: Icons and Search */}
      {/* <div className="flex items-center space-x-4">
        <IconButton variant="text" color="black">
          <Cog6ToothIcon className="w-4 h-4" />
        </IconButton>
        <IconButton variant="text" color="black">
          <BellIcon className="w-4 h-4" />
        </IconButton>
        <div className="relative flex items-center">
          <Input
            type="search"
            // color="black"
            label="Search..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="green"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
      </div> */}
    </div>
  </nav>
  );
}

export default NavBar;
