import React from 'react'
import { Link, Outlet , NavLink } from 'react-router-dom'
import { useState } from 'react'
const Main = () => {

        // State to manage the menu visibility
        const [isMenuOpen, setIsMenuOpen] = useState(false);


        // Function to toggle the menu
        const toggleMenu = () => {
          setIsMenuOpen(prevState => !prevState);
        }
  return (
   <>

<nav className="fixed top-0 z-20 w-full bg-white border-b border-gray-200 start-0">
  <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/img/sklogo.png" alt="logo" className="w-auto mx-auto my-2 rounded-full shadow-md h-14" />
    </NavLink>
    <div className="flex md:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleMenu}
        aria-controls="navbar-sticky"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
    </div>
    <div className="hidden md:flex md:space-x-8 rtl:space-x-reverse md:order-2">
      <NavLink
        to="/register"
        className="block px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
      >
        Let's connect
      </NavLink>
    </div>
    <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
      <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `
              block px-3 py-2 rounded
              ${isActive && isMenuOpen ? 'bg-green-500 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500'}
            `}
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `
              block px-3 py-2 rounded
              ${isActive && isMenuOpen ? 'bg-green-500 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500'}
            `}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `
              block px-3 py-2 rounded
              ${isActive && isMenuOpen ? 'bg-green-500 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500'}
            `}
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `
              block px-3 py-2 rounded
              ${isActive && isMenuOpen ? 'bg-green-500 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500'}
            `}
          >
            Contact
          </NavLink>
        </li>
        <li className="block md:hidden">
          <NavLink
            to="/register"
            className="block px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Let's connect
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <div>
        <Outlet/>
    </div>

   </>
  )
}

export default Main
