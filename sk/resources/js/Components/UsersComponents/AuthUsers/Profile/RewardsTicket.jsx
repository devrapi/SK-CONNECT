import React, { useContext } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';

const RewardsTicket = () => {
    const { ticket, user } = useContext(AppContext); // Assuming you have the current user's ID in context

    // Filter tickets that belong to the current user
    const userTickets = ticket.filter(ticketItem => ticketItem.user_id === user.id); // Adjust the property names as needed

    return (
        <div className="flex flex-col space-y-4 justify-center items-center">

            {userTickets.length > 0 ? (
                userTickets.map((ticketItem) => (
                    <Card key={ticketItem.id} className="w-full max-w-[48rem] flex-row">
                        <CardHeader
                            shadow={false}
                            floated={false}
                            className="m-0 w-2/5 shrink-0 rounded-r-none"
                        >
                            <img
                                src={`/storage/${ticketItem.reward.image_path}`}
                                className="h-full w-full object-cover"
                                alt={`Image for ${ticketItem.reward.name}`} // Added alt text for accessibility
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6" color="gray" className="mb-4 uppercase">
                                {ticketItem.reward.name}
                            </Typography>
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                {ticketItem.ticket_number}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                {ticketItem.status}
                            </Typography>
                        </CardBody>
                    </Card>
                ))
            ) : (
                <Typography color="gray" className="mb-4">
                    No tickets available for this user.
                </Typography>
            )}
        </div>
    );
};

export default RewardsTicket;
