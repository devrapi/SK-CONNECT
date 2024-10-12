import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card ,
    CardHeader,
    CardFooter,
    CardBody
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Import FullCalendar CSS files
// import '@fullcalendar/core/main.css';  // Core styles
// import '@fullcalendar/daygrid/main.css'; // dayGrid styles
// import '@fullcalendar/timegrid/main.css'; // timeGrid styles

import DeleteEvents from './deleteEvents';
import { CalendarIcon, PlusIcon } from '@heroicons/react/24/solid';

const Calendars = () => {
    const { event } = useContext(AppContext);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);
    const [isCalendarView, setIsCalendarView] = useState(false); // State to toggle between views

    const handleOpen = () => setOpen(!open);

    const openModal = (ev) => {
        setSelectedEvent(ev);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    // Convert events from your context to FullCalendar format and apply colors
    const calendarEvents = event.map(ev => ({
        id: ev.id,
        title: ev.title,
        start: ev.date, // Make sure this is in a valid date format (e.g., YYYY-MM-DD or ISO 8601)
        backgroundColor:'#2B7C40', // Green for points > 50, Blue otherwise
        borderColor: '#4B5563',
        textColor: '#fff',
        extendedProps: {
            description: ev.description,
            points: ev.points,
            imagePath: ev.image_path,
        },
    }));

    // Handle event click to open the modal
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
                // FullCalendar view with custom colors and header styles
                <div className="p-6 mt-5 bg-white rounded-lg shadow-lg">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={calendarEvents}
                        eventClick={handleEventClick} // Handle event click
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,'
                        }}
                        height="auto"
                        eventDisplay="block"
                    />
                </div>
            ) : (
                // List view
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {event.map(ev => (
                        <Card key={ev.id} className="pt-12 mt-6 w-96">
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
                                    <span className='font-semibold'> Event Date:</span>  {ev.date}
                                </Typography>
                                <Typography>
                                    <span className='font-semibold'>Points:</span>  {ev.points}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button onClick={() => openModal(ev)} color='green'>
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
                    <DialogFooter className="flex justify-between">
                        <Button color="green">
                            <Link to={`/admin/dashboard/calanders/update/${selectedEvent.id}`}>
                                Update
                            </Link>
                        </Button>
                        <div onClick={closeModal}>
                            <DeleteEvents event_id={selectedEvent.id} />
                        </div>
                    </DialogFooter>
                </Dialog>
            )}
        </div>
    );
}

export default Calendars;
