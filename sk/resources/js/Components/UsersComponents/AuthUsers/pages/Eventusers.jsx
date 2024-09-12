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
const Eventusers = () => {

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
    <div className="mb-6">
<Typography variant="h4" color="blue-gray" className="font-semibold uppercase">
    Upcoming Events
</Typography>
</div>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {event.map(ev => (
            <Card key={ev.id} className="pt-12 mt-6 w-72">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                        src={`/storage/${ev.image_path}`}
                        alt={ev.title}
                        className="object-cover w-full h-full"
                    />
                </CardHeader>
                <CardBody className="">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                        {ev.title}
                    </Typography>
                    <Typography className="truncate">
                        {ev.description}
                    </Typography>
                    <Typography className="mt-2 mb-2">
                      <span className='font-normal'> Event Date:</span>  {ev.date}
                    </Typography>
                    <Typography>
                       <span className='font-normal'>Points:</span>  {ev.points}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 ">
                    <Button onClick={() => openModal(ev)} color='green' size='sm'>
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
        <Button color="blue">
        Attend Event


            </Button>

        </DialogFooter>
    </Dialog>
    )}


</div>
  )
}

export default Eventusers
