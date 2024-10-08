import React, { useContext , useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import DeleteEvents from './deleteEvents';
import { CalendarIcon , PlusIcon } from '@heroicons/react/24/solid';
const Calendars = () => {

    const{event} = useContext(AppContext);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);


    const openModal = (ev) => {
        setSelectedEvent(ev);

    };

    const closeModal = () => {
        setSelectedEvent(null);
    };



  return (


    <div>
           <div className="space-y-5">
    <Typography variant="h4" color="blue-gray" className="font-semibold">
        UPCOMING EVENTS
    </Typography>

    <div className='flex justify-end'>
    <Link to="/admin/dashboard/event">
            <div className='flex items-center'>
                <CalendarIcon className='w-12 h-10 text-green-500'/>
                <PlusIcon className='w-6 h-6 text-green-500'/>
            </div>


        </Link>
    </div>
    </div>
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
                        <CardBody className="">
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
                        <CardFooter className="pt-0 ">
                            <Button onClick={() => openModal(ev)} color='green'>
                                Read More
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {selectedEvent && (
                <Dialog open={Boolean(selectedEvent)} handler={closeModal}>
                <DialogHeader className="flex items-center justify-between">
                    <Typography variant="h5">{selectedEvent.title}</Typography>
                    <Button color="gray" variant="text" onClick={closeModal} className="text-xl">
                   X
                    </Button>
                </DialogHeader>
                <DialogBody >
                    <img
                        src={`/storage/${selectedEvent.image_path}`}
                        alt={selectedEvent.title}
                        className="w-full mb-4 h-80 object-fit"
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
                <Button color="green"><Link to={`/admin/dashboard/calanders/update/${selectedEvent.id}`}>
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
  )
}

export default Calendars
