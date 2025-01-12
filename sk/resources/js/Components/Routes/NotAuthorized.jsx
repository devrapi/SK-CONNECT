import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 font-extrabold tracking-tight text-blue-600 text-7xl lg:text-7xl dark:text-green-500">
            NOT AUTHORIZED
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, you don't have access to this page. Click the button below to navigate back to the home page.
          </p>
          <Link to="/">
            <button className="px-6 py-2 mt-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotAuthorized;
