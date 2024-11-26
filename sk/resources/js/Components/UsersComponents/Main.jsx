import React from 'react'
import { Link, Outlet , NavLink } from 'react-router-dom'
import Homepage from './Homepage';
import Footer from './Footer.jsx';
import Officials from './Officials.jsx';
import Features from './Features.jsx';
import FAQs from './FAQs.jsx';
import NewLogin from './AuthUsers/NewLogin.jsx';
import NewRegister from './AuthUsers/NewRegister.jsx';
import Map from './Map.jsx';
import {
    Navbar,
    Collapse,
    Button,
    IconButton,
    Typography,
    Input,
  } from "@material-tailwind/react";
  import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    Squares2X2Icon,
  } from "@heroicons/react/24/solid";
  import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Benefits from './Benefits.jsx';


  function NavItem({ children }) {
    return (
      <li>
        <Typography

          href="#"
          variant="paragraph"
          color="blue-gray"
          className="flex items-center gap-2 font-medium text-blue-gray-700"
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
        () => window.innerWidth >= 960 && setOpen(false),
      );
    }, []);



  return (
   <>

<div shadow={false} fullWidth className="py-2 border-0">
        <div className="container flex items-center justify-between mx-auto">
        <img src="/img/sklogo.png" alt="Logo" className='w-auto h-14'/>

          <ul className="items-center hidden gap-6 text-black lg:flex">
            <NavItem>
              {/* <RectangleStackIcon className="w-5 h-5" /> */}
              <Link to="/">
              Home
              </Link>
            </NavItem>
            <NavItem>
              {/* <UserCircleIcon className="w-5 h-5" /> */}
              Teams
            </NavItem>
            <NavItem>
              {/* <Squares2X2Icon className="w-5 h-5" /> */}
              Feautures
            </NavItem>
            <NavItem>
              {/* <CommandLineIcon className="w-5 h-5" /> */}
              FAQs
            </NavItem>
          </ul>
          <div className="items-center hidden gap-4 lg:flex">
         <NewLogin />
        <NewRegister/>
          </div>
          <IconButton
            variant="text"
            color="gray"
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
          <div className="container px-2 pt-4 mx-auto mt-3 border-t border-blue-gray-50">
            <ul className="flex flex-col gap-4 text-black">
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
            <NewRegister/>

            </div>
          </div>
        </Collapse>

      </div>


    <div>
        <Outlet/>
    </div>

        <Homepage/>

        <Benefits/>

        <Features/>



        <Officials/>



        <FAQs/>

        <Map/>

        <Footer/>


   </>
  )
}

export default Main
