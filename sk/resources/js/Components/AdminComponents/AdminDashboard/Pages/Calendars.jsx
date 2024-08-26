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
const Calendars = () => {

    const{event} = useContext(AppContext);

    const [selectedEvent, setSelectedEvent] = useState(null);




    const openModal = (ev) => {
        setSelectedEvent(ev);

    };

    const closeModal = () => {
        setSelectedEvent(null);
    };



  return (
    <div>
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
                        <CardBody className="h-32">
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {ev.title}
                            </Typography>
                            <Typography className="truncate">
                                {`${ev.description.slice(0, 40)}...`}
                            </Typography>
                            <Typography className="mt-2 mb-2">
                                Date: {ev.date}
                            </Typography>
                            <Typography>
                                Points: {ev.points}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button onClick={() => openModal(ev)}>
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
                    <Button color="gray" variant="text" onClick={closeModal}>
                        Close
                    </Button>
                </DialogHeader>
                <DialogBody divider>
                    <img
                        src={`/storage/${selectedEvent.image_path}`}
                        alt={selectedEvent.title}
                        className="object-cover w-full h-full mb-4"
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
                    <Button color="red" onClick={closeModal}>
                        Delete
                    </Button>
                </DialogFooter>
            </Dialog>
            )}


        </div>
  )
}

export default Calendars
