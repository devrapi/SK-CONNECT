import React, { useContext, useState } from 'react';
import moment from 'moment'; // Import Moment.js
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { HeartIcon ,GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid'; // Assuming you're using Heroicons

const Eventusers = () => {
    const { event } = useContext(AppContext);
    const [expandedEventId, setExpandedEventId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedEventId(expandedEventId === id ? null : id); // Toggle the expand/collapse
    };

    return (
        <div className="container pb-6 mx-auto">
            <div className="mb-6">
                <Typography variant="h4" color="blue-gray" className="font-semibold text-center uppercase">
                    Upcoming Events
                </Typography>
            </div>
            <div className="grid grid-rows-1 gap-8 md:grid-rows-2 lg:grid-rows-3">
                {event.map((ev) => {
                    const isExpanded = expandedEventId === ev.id;
                    return (
                        <Card key={ev.id} className="p-4 rounded-lg shadow-lg">
                     <div className='p-2 md:p-4 lg:p-6'>
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
                                    <GlobeAsiaAustraliaIcon className='w-4 h-4 ml-1'/>
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
                            {/* Event Details */}
                            <CardBody className='p-2 md:p-4 lg:p-6'>

                            <img
                                    src={`/storage/${ev.image_path}`}
                                    alt={ev.title}
                                    className="object-cover w-full h-full rounded-t-lg"
                                />

                            </CardBody>

                            {/* Card Footer */}
                            <CardFooter className="flex items-center justify-between pt-4">
                                <Button color="blue" size="sm" className="rounded-full">
                                    Attend Event
                                </Button>

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
