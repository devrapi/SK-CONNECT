import React, { useContext } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Avatar
} from "@material-tailwind/react";

import { AppContext } from '../../../Context/AppContext';
import CommentLike from './CommentLike';
import moment from 'moment';
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid'; // Assuming you're using Heroicons
import { PhoneIcon, FireIcon, BuildingOfficeIcon, VideoCameraIcon, BoltIcon ,StarIcon ,GiftIcon  , CheckCircleIcon ,UserGroupIcon ,CalendarIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';


const rules = [
    {
        icon: <StarIcon className="w-6 h-6 text-yellow-500" />,
        title: "Monthly Points Reset",
        description: "Points reset at the end of each month. Users on the leaderboard will retain their points."
    },
    {
        icon: <GiftIcon className="w-6 h-6 text-yellow-500" />,
        title: "Reward Limitations",
        description: "Claim up to 3 rewards per month to prevent spamming. Plan your claims wisely!"
    },
    {
        icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
        title: "Complete Tasks",
        description: "Earn points by completing assigned tasks daily."
    },
    {
        icon: <UserGroupIcon className="w-6 h-6 text-blue-500" />,
        title: "Refer Friends",
        description: "Invite friends to Participate in an event and earn bonus points when they register."
    },
    {
        icon: <CalendarIcon className="w-6 h-6 text-yellow-500" />,
        title: "Participate in Events",
        description: "Attend events and activities to earn additional rewards."
    },
];



const Home = () => {
    const { announcement } = useContext(AppContext);

    return (
        <div className="flex gap-6">
            {/* Left Section */}

                        <aside className="hidden w-1/4 p-4 bg-gray-100 border rounded-lg shadow-md lg:block h-fit">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            Rules for Point System
                        </Typography>
                        <div className="space-y-4">
                            {rules.map((rule, index) => (
                                <div key={index} className="flex flex-col items-start p-4 space-x-4 bg-white rounded-lg shadow-md">


                                    <div>
                                        <Typography variant="subtitle2" color="blue-gray" className="font-semibold">
                                            {rule.title}
                                        </Typography>
                                        <Typography variant="body2" color="gray">
                                            {rule.description}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>



            {/* Announcements Section (Middle) */}
            <div className="flex-1 space-y-6">
                {announcement.map((item) => (
                    <Card key={item.id} className="max-w-lg mx-auto">
                        <div className="flex items-center mb-4">
                            <Avatar
                                src="/img/uno.png" // Add your avatar path here
                                alt="Sangguniang Kabataan ng Uno"
                                size="sm"
                                className="m-3"
                            />
                            <div className="flex flex-col">
                                <Typography variant="h6" color="blue-gray">
                                    KABATAAN NG UNO
                                </Typography>

                                <Typography variant="small" className="text-xs text-gray-500">
                                    <div className="flex">
                                        {moment(item.created_at).fromNow()}
                                        <GlobeAsiaAustraliaIcon className="w-4 h-4 ml-1" />
                                    </div>
                                </Typography>
                            </div>
                        </div>
                        <div className="px-6 text-left">
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {item.title}
                            </Typography>
                            <Typography color="gray" className="mb-4">
                                {item.content}
                            </Typography>
                            {item.image_path && (
                                <CardBody className="p-0">
                                    <img
                                        src={`/storage/${item.image_path}`}
                                        alt={item.title}
                                        className="object-cover w-full h-64 rounded-t-lg md:h-72 lg:h-80"
                                    />
                                </CardBody>
                            )}

                            <hr />
                            <CommentLike AnnounceId={item.id} />
                        </div>
                        <CardFooter>
                            <Typography variant="small" className="text-gray-500">
                                Posted by Admin
                            </Typography>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Right Section */}
            <aside className="hidden w-1/4 p-4 bg-gray-100 border rounded-lg shadow-md lg:block h-fit">
    <Typography variant="h6" color="red" className="mb-4">
        Emergency Hotlines
    </Typography>
    <div className="space-y-4">
        {/* City Disaster Risk Reduction and Management Council */}
        <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
            <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    City Disaster Risk Reduction
                </Typography>
                <Typography variant="body2" color="gray">
                    0917-721-8825 / 0998-843-5477
                </Typography>
            </div>
        </div>

        {/* Dasma PNP */}
        <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
            <PhoneIcon className="w-6 h-6 text-blue-600" />
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    Dasma PNP
                </Typography>
                <Typography variant="body2" color="gray">
                    416-29-24 • 0956-800-3329 / 0998-598-5598
                </Typography>
            </div>
        </div>

        {/* Pagamutan ng Dasma */}
        <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
            <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    Pagamutan ng Dasma
                </Typography>
                <Typography variant="body2" color="gray">
                    481-44-00 • 435-01-80
                </Typography>
            </div>
        </div>

        {/* Dasma Fire Department */}
        <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
            <FireIcon className="w-6 h-6 text-red-600" />
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    Dasma Fire Department
                </Typography>
                <Typography variant="body2" color="gray">
                    416-08-75 • 0995-336-9534
                </Typography>
            </div>
        </div>

        {/* Dasma CCTV Rescue Center */}
        <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
            <VideoCameraIcon className="w-6 h-6 text-green-600" />
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    Dasma CCTV Rescue Center
                </Typography>
                <Typography variant="body2" color="gray">
                    (046) 435-0183 • (046) 481-0555
                </Typography>
            </div>
        </div>

        {/* Meralco Hotline */}
        <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
            <BoltIcon className="w-6 h-6 text-yellow-600" />
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    Meralco Hotline
                </Typography>
                <Typography variant="body2" color="gray">
                    16211 • 416-17-03
                </Typography>
            </div>
        </div>
    </div>
</aside>

        </div>
    );
};

export default Home;
