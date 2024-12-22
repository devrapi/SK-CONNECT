import React, { useContext } from 'react'
import FetchTask from './fetchTask';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import { ClipboardDocumentCheckIcon , PlusIcon } from '@heroicons/react/24/solid';

const Task = () => {

  return (
    <>
  <div>
  <div className="space-y-5">
                <Typography variant="h4" color="blue-gray" className="font-semibold">
                    Task Management
                </Typography>
                <div className="flex justify-end space-x-4">
                <Link
                    to="/admin/dashboard/gamification"
                    className="flex items-center gap-2 px-4 py-2 text-white transition duration-300 bg-red-500 rounded-lg shadow-md hover:bg-red-600"
                    aria-label="Go to Gamification"
                >
                    <ClipboardDocumentCheckIcon className="w-6 h-6 text-white transition duration-300 group-hover:scale-110" />
                    <PlusIcon className="w-5 h-5 text-white transition duration-300 group-hover:scale-110" />
                    <span className="hidden md:inline-block">Task</span>
                </Link>
                </div>
            </div>
    <FetchTask />
  </div>
    </>
  )
}

export default Task
