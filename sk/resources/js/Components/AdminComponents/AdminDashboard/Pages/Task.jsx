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

                <div className='flex justify-end'>
                    <Link to="/admin/dashboard/gamification">
                        <div className='flex items-center ml-4'>
                            <ClipboardDocumentCheckIcon className='w-12 h-10 text-red-500' />
                            <PlusIcon className='w-6 h-6 text-red-500' />
                        </div>
                    </Link>
                </div>
            </div>
    <FetchTask />
  </div>
    </>
  )
}

export default Task
