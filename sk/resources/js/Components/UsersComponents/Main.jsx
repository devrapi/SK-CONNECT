import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Collapse,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Footer from "./Footer.jsx";
import Officials from "./Officials.jsx";
import Features from "./Features.jsx";
import FAQs from "./FAQs.jsx";
import NewLogin from "./AuthUsers/NewLogin.jsx";
import NewRegister from "./AuthUsers/NewRegister.jsx";
import Map from "./Map.jsx";
import Benefits from "./Benefits.jsx";

function NavItem({ children }) {
  return (
    <li>
      <Typography
        variant="paragraph"
        color="blue-gray"
        className="flex items-center gap-2 font-medium text-blue-gray-700 font-custom"
      >
        {children}
      </Typography>
    </li>
  );
}

const Main = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="fixed z-50 w-full py-2 bg-transparent border-0">
        <div className="container flex items-center justify-between mx-auto">
          <img src="/img/sklogo.png" alt="Logo" className="w-auto h-14" />

          <ul className="items-center hidden gap-6 text-white lg:flex">
            <NavItem>
              {/* <RectangleStackIcon className="w-5 h-5" /> */}
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              {/* <UserCircleIcon className="w-5 h-5" /> */}
              Teams
            </NavItem>
            <NavItem>
              {/* <Squares2X2Icon className="w-5 h-5" /> */}
              Features
            </NavItem>
            <NavItem>
              {/* <CommandLineIcon className="w-5 h-5" /> */}
              FAQs
            </NavItem>
          </ul>

          <div className="items-center hidden gap-4 lg:flex">
            <NewLogin />
            <NewRegister />
          </div>

          <IconButton
            variant="text"
            color="white"
            onClick={handleOpen}
            className="inline-block ml-auto lg:hidden"
          >
            {open ? (
              <XMarkIcon strokeWidth={2} className="w-6 h-6" />
            ) : (
              <Bars3Icon strokeWidth={2} className="w-6 h-6" />
            )}
          </IconButton>
        </div>

        <Collapse open={open}>
          <div className="container px-2 pt-4 mx-auto mt-3 border-t border-gray-100">
            <ul className="flex flex-col gap-4 text-white">
              <NavItem>
                <RectangleStackIcon className="w-5 h-5" />
                Pages
              </NavItem>
              <NavItem>
                <UserCircleIcon className="w-5 h-5" />
                Account
              </NavItem>
              <NavItem>
                <Squares2X2Icon className="w-5 h-5" />
                Blocks
              </NavItem>
              <NavItem>
                <CommandLineIcon className="w-5 h-5" />
                Docs
              </NavItem>
            </ul>
            <div className="flex items-center gap-4 mt-6 mb-4">
              <NewLogin />
              <NewRegister />
            </div>
          </div>
        </Collapse>
      </div>

      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/img/placeholder.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 px-6 py-12 text-center font-custom">
          <div className="max-w-3xl mx-auto">
            {/* Welcome Badge */}
            {/* <Typography className="inline-flex px-4 py-1 text-sm font-medium text-blue-700 border border-blue-500 rounded-full bg-blue-50">
              Welcome to SK Connect
            </Typography> */}

            {/* Main Heading */}
            <Typography
              variant="h1"
              color="blue-gray"
              className="mt-6 text-4xl leading-tight tracking-tight text-gray-100 md:text-5xl lg:text-6xl font-custom"
            >
              Connect, Participate, Reward{" "}
              <span className="text-green-600 font-custom">
                Your Youth Journey Starts Here
              </span>
            </Typography>

            {/* Subheading */}
            <Typography
              variant="paragraph"
              className="mt-4 text-lg text-gray-200"
            >
              Join a vibrant community where your contributions lead to real
              rewards and unforgettable experiences.
            </Typography>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">

              <Button className="w-full max-w-xs px-6 py-3 text-lg font-semibold tracking-wide text-white bg-gray-800 rounded-full shadow-lg hover:bg-gray-900 md:w-auto">
                <Link to="/learn-more">Learn More</Link>
              </Button>
              <Button className="w-full max-w-xs px-6 py-3 text-lg font-semibold tracking-wide text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 md:w-auto">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Other Components */}
      <div>
        <Outlet />
      </div>

      <Benefits />
      <Features />
      <FAQs />
      <Map />
      <Officials />

      <Footer />
    </>
  );
};

export default Main;
