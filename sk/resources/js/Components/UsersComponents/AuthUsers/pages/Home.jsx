import React, { useContext } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import CommentLike from './CommentLike';
import moment from 'moment';
import {
    GlobeAsiaAustraliaIcon,
    PhoneIcon,
    FireIcon,
    BuildingOfficeIcon,
    VideoCameraIcon,
    BoltIcon,
    StarIcon,
    GiftIcon,
    CheckCircleIcon,
    UserGroupIcon,
    CalendarIcon
} from '@heroicons/react/24/solid';

const rules = [
    {
        icon: <StarIcon className="w-6 h-6 text-yellow-500" />,
        title: "Monthly Points Reset",
        description: "Points reset at the end of each month. Users on the leaderboard will retain their points.",
    },
    {
        icon: <GiftIcon className="w-6 h-6 text-yellow-500" />,
        title: "Reward Limitations",
        description: "Claim up to 3 rewards per month to prevent spamming. Plan your claims wisely!",
    },
    {
        icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
        title: "Complete Tasks",
        description: "Earn points by completing assigned tasks daily.",
    },
    {
        icon: <UserGroupIcon className="w-6 h-6 text-blue-500" />,
        title: "Refer Friends",
        description: "Invite friends to participate in an event and earn bonus points when they register.",
    },
    {
        icon: <CalendarIcon className="w-6 h-6 text-yellow-500" />,
        title: "Participate in Events",
        description: "Attend events and activities to earn additional rewards.",
    },
];

const Home = () => {
    const { announcement } = useContext(AppContext);

    return (
        <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left Section */}
            <aside className="order-2 p-4 bg-gray-100 border rounded-lg shadow-md lg:w-1/4 h-fit lg:order-1">
                <Typography variant="h6" className="mb-4 font-custom">
                    Rules for Point System
                </Typography>
                <div className="space-y-4">
                    {rules.map((rule, index) => (
                        <div key={index} className="flex flex-col items-start p-4 space-x-4 bg-white rounded-lg shadow-md">
                            <div>
                                <Typography variant="subtitle2" className="font-semibold font-custom">
                                    {rule.title}
                                </Typography>
                                <Typography variant="body2" className="font-custom">
                                    {rule.description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Announcements Section (Middle) */}
            <div className="flex-1 order-1 space-y-6 lg:order-2">
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
                                <Typography variant="h6" className="font-custom">
                                    KABATAAN NG UNO
                                </Typography>
                                <Typography variant="small" className="text-xs text-gray-500 font-custom">
                                    <div className="flex">
                                        {moment(item.created_at).fromNow()}
                                        <GlobeAsiaAustraliaIcon className="w-4 h-4 ml-1" />
                                    </div>
                                </Typography>
                            </div>
                        </div>
                        <div className="px-6 text-left">
                            <Typography variant="h5" className="mb-2 font-custom">
                                {item.title}
                            </Typography>
                            <Typography className="mb-4 font-custom">
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
                            <Typography variant="small" className="text-gray-500 font-custom">
                                Posted by Admin
                            </Typography>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Right Section */}
            <aside className="order-3 p-4 bg-gray-100 border rounded-lg shadow-md lg:w-1/4 h-fit">
                <Typography variant="h6" className="mb-4 font-custom">
                    Emergency Hotlines
                </Typography>
                <div className="space-y-4">
                    {/* Each Hotline */}
                    {[
                        {
                            icon: <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />,
                            title: "City Disaster Risk Reduction",
                            numbers: "0917-721-8825 / 0998-843-5477",
                        },
                        {
                            icon: <PhoneIcon className="w-6 h-6 text-blue-600" />,
                            title: "Dasma PNP",
                            numbers: "416-29-24 • 0956-800-3329 / 0998-598-5598",
                        },
                        {
                            icon: <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />,
                            title: "Pagamutan ng Dasma",
                            numbers: "481-44-00 • 435-01-80",
                        },
                        {
                            icon: <FireIcon className="w-6 h-6 text-red-600" />,
                            title: "Dasma Fire Department",
                            numbers: "416-08-75 • 0995-336-9534",
                        },
                        {
                            icon: <VideoCameraIcon className="w-6 h-6 text-green-600" />,
                            title: "Dasma CCTV Rescue Center",
                            numbers: "(046) 435-0183 • (046) 481-0555",
                        },
                        {
                            icon: <BoltIcon className="w-6 h-6 text-yellow-600" />,
                            title: "Meralco Hotline",
                            numbers: "16211 • 416-17-03",
                        },
                    ].map((hotline, index) => (
                        <div key={index} className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
                            {hotline.icon}
                            <div>
                                <Typography variant="h6" className="mb-1 font-custom">
                                    {hotline.title}
                                </Typography>
                                <Typography variant="body2" className="font-custom">
                                    {hotline.numbers}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default Home;
