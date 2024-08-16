import React from 'react'

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
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>

        </div>
      </div>
    </section>
  )
}

export default NotAuthorized
