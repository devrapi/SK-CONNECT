import React, { useContext, useState } from 'react';
import moment from 'moment'; // Import Moment.js
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { HeartIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid'; // Assuming you're using Heroicons
import AttendButton from './AttendButton';

const Eventusers = () => {
    const { event } = useContext(AppContext);
    const [expandedEventId, setExpandedEventId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedEventId(expandedEventId === id ? null : id); // Toggle the expand/collapse
    };

    return (
        <div className="space-y-6 ">
            {/* <div className="mb-6">
                <Typography variant="h4" color="blue-gray" className="font-semibold text-center uppercase">
                    Upcoming Events
                </Typography>
            </div> */}
            <div className="max-w-lg mx-auto">
                {event.map((ev) => {
                    const isExpanded = expandedEventId === ev.id;
                    return (
                        <Card key={ev.id} className="p-1 mb-2 rounded-lg shadow-lg">
                            <div className='p-2 md:p-2 lg:p-3'>
                                <div className="flex items-center mb-4">
                                    <Avatar
                                        src="/img/uno.png" // Add your avatar path here
                                        alt="Sangguniang Kabataan ng Uno"
                                        size="sm"
                                        className="mr-3"
                                    />
                                    <div className='flex flex-col'>
                                        <Typography variant="h6" color="blue-gray">
                                            KABATAAN NG UNO
                                        </Typography>

                                        <Typography variant="small" className="text-xs text-gray-500">
                                            <div className='flex'>
                                                {moment(ev.created_at).fromNow()}
                                                <GlobeAsiaAustraliaIcon className='w-4 h-4 ml-1' />
                                            </div>
                                        </Typography>
                                    </div>
                                </div>

                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {ev.title}
                                </Typography>
                                <Typography color="gray" className="mb-4">
                                    {isExpanded ? ev.description : `${ev.description.slice(0, 100)}...`} {/* Truncate and show more */}
                                    <Button
                                        color="blue-gray"
                                        variant="text"
                                        size="sm"
                                        onClick={() => toggleExpand(ev.id)}
                                    >
                                        {isExpanded ? "See Less" : "See More"}
                                    </Button>
                                </Typography>

                                <Typography className="font-medium">
                                    Points: {ev.points}
                                </Typography>
                            </div>

                            {/* Event Image */}
                            <CardBody className='p-2 md:p-4 lg:p-6'>
                                <img
                                    src={`/storage/${ev.image_path}`}
                                    alt={ev.title}
                                    className="object-cover w-full h-64 rounded-t-lg md:h-72 lg:h-80" // Adjusted height for responsive views
                                />
                            </CardBody>

                            {/* Card Footer */}
                            <CardFooter className="flex items-center justify-between pt-4">
                               <AttendButton eventId = {ev.id}/>

                                {/* Heart Button for likes */}
                                <Button variant="text" color="red" size="sm">
                                    <HeartIcon className="w-6 h-6 text-red-500" />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Eventusers;
