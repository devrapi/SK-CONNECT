import React from 'react'

const Footer = () => {
  return (
    <footer className="p-4 bg-white sm:p-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-gray-900">Company Name</h2>
            <p className="mt-2 text-sm text-gray-500">
              Building a better world through technology and innovation.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-gray-600">
              <li><a href="#" className="hover:text-blue-700">About Us</a></li>
              <li><a href="#" className="hover:text-blue-700">Services</a></li>
              <li><a href="#" className="hover:text-blue-700">Contact</a></li>
              <li><a href="#" className="hover:text-blue-700">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-sm text-center text-gray-500">
          © 2024 Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
