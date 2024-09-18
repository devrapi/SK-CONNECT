import React from 'react';
import { XCircleIcon , CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';

const SuccessMessage = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-green-100 border border-green-300 text-green-700 rounded-lg shadow-lg p-6 max-w-sm mx-4 w-full animate-pop-up relative">
                <XCircleIcon
                    onClick={onClose}
                    className="w-8 h-8 text-green-700 cursor-pointer absolute top-2 right-2"
                />
                <div className="text-center flex">
                <CheckBadgeIcon className='h-10 w-10'/>
                    <Typography variant="h6" color="green-700">
                      {message}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
