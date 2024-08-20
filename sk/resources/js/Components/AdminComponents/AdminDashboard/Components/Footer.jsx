import React from 'react'
import { Typography } from "@material-tailwind/react";
const Footer = () => {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-center w-full py-6 mt-10 text-center border-t gap-y-6 gap-x-12 border-blue-gray-50 md:justify-between">
    <Typography color="blue-gray" className="font-normal text-gray-600 ">
      &copy; 2024 Sk Connect
    </Typography>
    <ul className="flex flex-wrap items-center text-gray-600 gap-y-2 gap-x-8">
      <li>
        <Typography
          as="a"
          href="#"
          color="blue-gray"
          className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
        >
          About Us
        </Typography>
      </li>
      <li>
        <Typography
          as="a"
          href="#"
          color="blue-gray"
          className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
        >
          License
        </Typography>
      </li>
      <li>
        <Typography
          as="a"
          href="#"
          color="blue-gray"
          className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
        >
          Contribute
        </Typography>
      </li>
      <li>
        <Typography
          as="a"
          href="#"
          color="blue-gray"
          className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
        >
          Contact Us
        </Typography>
      </li>
    </ul>
  </footer>
  )
}

export default Footer
