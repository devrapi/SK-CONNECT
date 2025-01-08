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
  CardFooter,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import DeleteEvents from './deleteEvents';
import {
  CalendarIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  QrCodeIcon,
} from '@heroicons/react/24/solid';

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

  const calendarEvents = event.map((ev) => ({
    id: ev.id,
    title: ev.title,
    start: ev.date,
    backgroundColor: '#2B7C40',
    borderColor: '#4B5563',
    textColor: '#fff',
    extendedProps: {
      description: ev.description,
      points: ev.points,
      imagePath: ev.image_path,
    },
  }));

  const handleEventClick = (clickInfo) => {
    const selected = event.find((ev) => ev.id === clickInfo.event.id);
    openModal(selected);
  };

  return (
    <div>
      <div className="space-y-5">
  {/* Title */}
  <Typography
    variant="h4"
    color="blue-gray"
    className="font-semibold text-center md:text-left font-custom text-green-700"
  >
    UPCOMING EVENTS
  </Typography>

  {/* Actions */}
  <div className="flex flex-wrap items-center justify-between gap-4">
    {/* Toggle View Button */}
    <Button
      color="green"
      onClick={() => setIsCalendarView(!isCalendarView)}
      className="flex items-center w-full gap-2 px-4 py-2 text-white transition duration-300 bg-green-500 rounded-lg shadow-md md:w-auto hover:bg-green-600"
      aria-label={`Switch to ${isCalendarView ? 'List' : 'Calendar'} View`}
    >
      <span>{isCalendarView ? "View List" : "View Calendar"}</span>
    </Button>

    {/* Add Event Button */}
    <Link
      to="/admin/dashboard/event"
      className="flex items-center gap-2 px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
      aria-label="Add New Event"
    >
      <CalendarIcon className="w-6 h-6 text-white transition duration-300 group-hover:scale-110" />
      <PlusIcon className="w-5 h-5 text-white transition duration-300 group-hover:scale-110" />
      <span className="hidden md:inline-block">Add Event</span>
    </Link>
  </div>
</div>


      {isCalendarView ? (
        <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
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
        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {event.map((ev) => (
            <Card key={ev.id} className="relative w-full pt-8 sm:w-80 lg:w-full">
              <Menu>
                <MenuHandler>
                  <div className="absolute z-10 p-2 bg-white rounded-full shadow-lg cursor-pointer top-2 right-2">
                    <EllipsisHorizontalIcon className="w-5 h-5" />
                  </div>
                </MenuHandler>
                <MenuList className="z-20">
                  <MenuItem>
                    <Link to={`/admin/dashboard/calendars/update/${ev.id}`}>
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

              <CardHeader color="blue-gray" className="relative h-48">
                <img
                  src={`/storage/${ev.image_path}`}
                  alt={ev.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </CardHeader>
              <CardBody className='font-custom'>
                <Typography variant="h6" color="blue-gray" className="mb-2 truncate font-custom">
                  {ev.title}
                </Typography>
                <Typography color="gray" className="truncate font-custom">
                  {ev.description}
                </Typography>
                <Typography className="mt-2">
                  <span className="font-semibold">Event Date:</span> {ev.date}
                </Typography>
                <Typography>
                  <span className="font-semibold">Points:</span> {ev.points}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between pt-4 font-custom">
                <Button
                  onClick={() => openModal(ev)}
                  color="green"
                  className="text-white bg-green-500 hover:bg-green-600"
                >
                  Read More
                </Button>
                <Link to={`QrCode/${ev.id}`}>
                  <QrCodeIcon className="w-10 h-10 text-blue-500 transition-transform cursor-pointer hover:text-blue-700 hover:scale-110" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} handler={closeModal}>
          <DialogHeader className="flex items-center justify-between">
            <Typography variant="h5">{selectedEvent.title}</Typography>
            <Button
              color="gray"
              variant="text"
              onClick={closeModal}
              className="text-xl hover:text-red-500"
            >
              X
            </Button>
          </DialogHeader>
          <DialogBody>
            <img
              src={`/storage/${selectedEvent.image_path}`}
              alt={selectedEvent.title}
              className="object-cover w-full h-64 mb-4 rounded-lg"
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              {selectedEvent.title}
            </Typography>
            <Typography color="gray" className="mb-4">
              {selectedEvent.description}
            </Typography>
            <Typography>Date: {selectedEvent.date}</Typography>
            <Typography className="mb-4">Points: {selectedEvent.points}</Typography>
          </DialogBody>
        </Dialog>
      )}
    </div>
  );
};

export default Calendars;
