import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Card,
    CardHeader,
    CardBody,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    CardFooter
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import DeleteEvents from './deleteEvents';
import { CalendarIcon, PlusIcon, EllipsisHorizontalIcon ,PencilIcon } from '@heroicons/react/24/solid';

const Calendars = () => {
    const { event } = useContext(AppContext);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);
    const [isCalendarView, setIsCalendarView] = useState(true);

    const handleOpen = () => setOpen(!open);

    const openModal = (ev) => {
        setSelectedEvent(ev);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const calendarEvents = event.map(ev => ({
        id: ev.id,
        title: ev.title,
        start: ev.date,
        backgroundColor:'#2B7C40',
        borderColor: '#4B5563',
        textColor: '#fff',
        extendedProps: {
            description: ev.description,
            points: ev.points,
            imagePath: ev.image_path,
        },
    }));

    const handleEventClick = (clickInfo) => {
        const selected = event.find(ev => ev.id === clickInfo.event.id);
        openModal(selected);
    };

    return (
        <div>
            <div className="space-y-5">
                <Typography variant="h4" color="blue-gray" className="font-semibold">
                    UPCOMING EVENTS
                </Typography>

                <div className='flex justify-end'>
                <Link to="/admin/dashboard/QrCode">
                        <div className='flex items-center ml-4'>
                            <CalendarIcon className='w-12 h-10 text-green-500' />
                            <PlusIcon className='w-6 h-6 text-green-500' />
                        </div>
                    </Link>
                    <Button color="green" onClick={() => setIsCalendarView(!isCalendarView)}>
                        {isCalendarView ? "View List" : "View Calendar"}
                    </Button>
                    <Link to="/admin/dashboard/event">
                        <div className='flex items-center ml-4'>
                            <CalendarIcon className='w-12 h-10 text-green-500' />
                            <PlusIcon className='w-6 h-6 text-green-500' />
                        </div>
                    </Link>
                </div>
            </div>

            {isCalendarView ? (
                <div className="p-6 mt-5 bg-white rounded-lg shadow-lg">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={calendarEvents}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth',
                        }}
                        height="auto"
                        eventDisplay="block"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
                {event.map(ev => (
                    <Card key={ev.id} className="relative w-full pt-12 mt-6 sm:w-96">
                        {/* Top-right menu */}
                        <Menu>
                            <MenuHandler>
                                <div className="absolute z-20 p-2 bg-white rounded-full shadow-lg cursor-pointer top-2 right-2">
                                    <EllipsisHorizontalIcon className="w-5 h-5" />
                                </div>
                            </MenuHandler>
                            <MenuList className="z-30">
                                <MenuItem>
                                    <Link to={`/admin/dashboard/calanders/update/${ev.id}`}>
                                    <div className="flex items-center space-x-2">
                                        <PencilIcon className="w-4 h-4" />
                                        <span>Edit Event</span>
                                    </div>
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <DeleteEvents event_id={ev.id} />
                                </MenuItem>
                            </MenuList>
                        </Menu>

                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src={`/storage/${ev.image_path}`}
                                alt={ev.title}
                                className="object-cover w-full h-full"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {ev.title}
                            </Typography>
                            <Typography className="truncate">
                                {ev.description}
                            </Typography>
                            <Typography className="mt-2 mb-2">
                                <span className="font-semibold"> Event Date:</span> {ev.date}
                            </Typography>
                            <Typography>
                                <span className="font-semibold">Points:</span> {ev.points}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button onClick={() => openModal(ev)} color="green">
                                Read More
                            </Button>
                        </CardFooter>
                    </Card>


                ))}
            </div>


            )}

            {selectedEvent && (
                <Dialog open={Boolean(selectedEvent)} handler={closeModal}>
                    <DialogHeader className="flex items-center justify-between">
                        <Typography variant="h5">{selectedEvent.title}</Typography>
                        <Button color="gray" variant="text" onClick={closeModal} className="text-xl">
                            X
                        </Button>
                    </DialogHeader>
                    <DialogBody>
                        <img
                            src={`/storage/${selectedEvent.image_path}`}
                            alt={selectedEvent.title}
                            className="object-cover w-full mb-4 h-80"
                        />
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            {selectedEvent.title}
                        </Typography>
                        <Typography color="gray" className="mb-4">
                            {selectedEvent.description}
                        </Typography>
                        <Typography>
                            Date: {selectedEvent.date}
                        </Typography>
                        <Typography className="mb-4">
                            Points: {selectedEvent.points}
                        </Typography>
                    </DialogBody>
                </Dialog>
            )}
        </div>
    );
};

export default Calendars;
