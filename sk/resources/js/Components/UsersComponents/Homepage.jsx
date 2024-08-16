import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
<div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="mb-4 font-sans text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          We invest in the world’s potential
        </h1>
        <p className="mb-6 font-sans text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
          Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-green-500 rounded-lg hover:bg-green-400 focus:ring-4 focus:ring-green-300"
        >
          Let's connect
        </Link>
      </div>
    </div>




    </>
  )
}

export default Homepage
