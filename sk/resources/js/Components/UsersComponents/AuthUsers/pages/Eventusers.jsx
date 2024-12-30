import React, { useContext, useState } from 'react';
import moment from 'moment';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { TrophyIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid';
import AttendButton from './AttendButton';
import { StarIcon } from '@heroicons/react/24/solid';

const Eventusers = () => {
    const { event } = useContext(AppContext);
    const [expandedEventId, setExpandedEventId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedEventId(expandedEventId === id ? null : id);
    };

    return (
        <div className="py-6">
            <Typography variant="h4" color="blue-gray" className="mb-6 font-semibold text-center uppercase font-custom">
                Choose Your Event
            </Typography>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {event.map((ev) => {
                    const isExpanded = expandedEventId === ev.id;
                    return (
                        <Card
                            key={ev.id}
                            className="p-3 transition-transform rounded-lg shadow-lg hover:scale-105 hover:shadow-xl font-custom"
                        >
                            <div className="flex items-center mb-4">
                                <Avatar
                                    src="/img/uno.png"
                                    alt="Sangguniang Kabataan ng Uno"
                                    size="sm"
                                    className="mr-3"
                                />
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="font-bold font-custom">
                                        KABATAAN NG UNO
                                    </Typography>
                                    <Typography variant="small" className="text-xs text-gray-500 font-custom">
                                        <div className="flex items-center">
                                            {moment(ev.created_at).fromNow()}
                                            <GlobeAsiaAustraliaIcon className="w-4 h-4 ml-1" />
                                        </div>
                                    </Typography>
                                </div>
                            </div>
                            <Typography variant="h5" color="blue-gray" className="mb-2 font-semibold font-custom">
                                {ev.title}
                            </Typography>
                            <Typography color="gray" className="mb-4 text-justify font-custom">
                                {isExpanded ? ev.description : `${ev.description.slice(0, 100)}...`}
                                <Button
                                    color="blue-gray"
                                    variant="text"
                                    size="sm"
                                    onClick={() => toggleExpand(ev.id)}
                                    className="ml-2 font-semibold font-custom"
                                >
                                    {isExpanded ? "See Less" : "See More"}
                                </Button>
                            </Typography>
                            <CardBody className="p-0 font-custom">
                                <img
                                    src={`/storage/${ev.image_path}`}
                                    alt={ev.title}
                                    className="object-cover w-full h-48 border border-gray-300 rounded-lg"
                                />
                            </CardBody>
                            <CardFooter className="flex items-center justify-between pt-4 font-custom">
                                <AttendButton eventId={ev.id} />
                                <div className="flex items-center">
                                    <StarIcon className="w-8 h-8 mr-2 text-yellow-500" />
                                    <Typography className="font-medium text-gray-800 font-custom">
                                        {ev.points} Points
                                    </Typography>
                                </div>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Eventusers;
