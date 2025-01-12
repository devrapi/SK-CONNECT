import React, { useState, useEffect, useRef } from "react";
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

function NavItem({ children, onClick }) {
  return (
    <li>
      <Typography
        variant="paragraph"
        color="blue-gray"
        className="flex items-center gap-2 font-medium cursor-pointer text-blue-gray-700 font-custom"
        onClick={onClick}
      >
        {children}
      </Typography>
    </li>
  );
}

const Main = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Section refs
  const features = useRef(null);
  const how = useRef(null);
  const teams = useRef(null);
  const faqsRef = useRef(null);
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed z-50 w-full py-2 border-0 transition-colors duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between mx-auto">
          <img src="/img/sklogo.png" alt="Logo" className="w-auto h-14" />

          <ul
            className={`items-center hidden gap-6 ${
              isScrolled ? "text-black" : "text-white"
            } lg:flex`}
          >

            <NavItem onClick={() => scrollToSection(features)}>Features</NavItem>
            <NavItem onClick={() => scrollToSection(how)} >How it Works</NavItem>
            <NavItem onClick={() => scrollToSection(faqsRef)}>Rules</NavItem>
            <NavItem onClick={() => scrollToSection(teams)}>Teams</NavItem>
          </ul>

          <div className="items-center hidden gap-4 lg:flex">
            <NewLogin />
            <NewRegister />
          </div>

          <IconButton
            variant="text"
            color={isScrolled ? "black" : "white"}
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
            <ul
              className={`flex flex-col gap-4 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              <NavItem onClick={() => scrollToSection(features)}>Features</NavItem>
            <NavItem onClick={() => scrollToSection(how)} >How it Works</NavItem>
            <NavItem onClick={() => scrollToSection(faqsRef)}>Rules</NavItem>
            <NavItem onClick={() => scrollToSection(teams)}>Teams</NavItem>
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
  style={{ backgroundImage: "url('/img/bg1.jpg')" }}
>
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-80"></div>

  {/* Content Section */}
  <div className="relative z-10 px-6 py-12 text-center font-custom">
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Main Heading */}
      <Typography
        variant="h1"
        className="text-4xl font-semibold text-white md:text-5xl lg:text-6xl font-custom "
      >
        Empowering Youth And Building Communities
      </Typography>

      {/* Subheading */}


      {/* Supporting Text */}
      <Typography
        variant="lead"
        className="text-lg text-gray-400 md:text-xl font-custom"
      >
       Join SK Connect and discover exciting opportunities to make a difference. Participate in events and earn rewards while creating lasting impact in your community.
      </Typography>

      {/* Call to Action */}
      <div className="mt-14">
        <Button
          size="lg"
          color="green"
          className="px-8 py-4 font-semibold text-white transition-transform transform bg-green-700 rounded-full shadow-lg hover:bg-green-600 hover:scale-105"
          onClick={() => scrollToSection(features)}
        >
          Get Involved Today
        </Button>
      </div>
    </div>
  </div>
</div>

      {/* Other Components */}
      <div>
        <Outlet />
      </div>
      <div ref={features}>
      <Benefits />
      </div>
   <div ref={how}>
   <Features />
   </div>

      {/* FAQs Section */}
      <div ref={faqsRef}>
        <FAQs />
      </div>
      <Map />
      <div ref={teams}>
      <Officials />
      </div>


      <Footer />
    </>
  );
};

export default Main;
