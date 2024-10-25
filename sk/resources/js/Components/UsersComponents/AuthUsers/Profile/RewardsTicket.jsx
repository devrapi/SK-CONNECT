import React, { useContext, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';

const RewardsTicket = () => {
    const { ticket, user, history } = useContext(AppContext); // Assuming you have the current user's ID in context
    const [filter, setFilter] = useState('all'); // State to manage the filter

    // Filter tickets that belong to the current user
    const userTickets = ticket.filter(ticketItem => ticketItem.user_id === user.id);
    const userHistory = history.filter(ticketItem => ticketItem.user_id === user.id);

    // Separate tickets based on status
    const pendingTickets = userTickets.filter(ticketItem => ticketItem.status === 'Pending');
    const claimedTickets = userHistory.filter(ticketItem => ticketItem.status === 'Claimed');

    // Determine which tickets to display based on the selected filter
    let filteredTickets = [];
    if (filter === 'Pending') {
        filteredTickets = pendingTickets;
    } else if (filter === 'Claimed') {
        filteredTickets = claimedTickets;
    } else {
        // For 'all', combine both pending and claimed tickets
        filteredTickets = [...pendingTickets, ...claimedTickets];
    }

    return (
        <div className="flex flex-col items-center space-y-6">
        {/* Filter Buttons */}
        <div className="flex mb-4 space-x-4">
            {["all", "Pending", "Claimed"].map((status) => (
                <Button
                    key={status}
                    onClick={() => setFilter(status)}
                    color={filter === status ? (status === 'Pending' ? 'blue' : status === 'Claimed' ? 'orange' : 'green') : 'gray'}
                    variant={filter === status ? 'filled' : 'outlined'}
                    className="px-4 py-2 text-sm rounded-full"
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
            ))}
        </div>

        {/* Display tickets based on the selected filter */}
        {filteredTickets.length > 0 ? (
            filteredTickets.map((ticketItem) => (
                <Card key={ticketItem.id} className="flex flex-row w-full max-w-lg p-4 rounded-lg shadow-md">
                    {/* Ticket Image */}
                    <CardHeader shadow={false} floated={false} className="w-1/3 overflow-hidden rounded-l-lg">
                        <img
                            src={`/storage/${ticketItem.reward.image_path}`}
                            alt={`Image for ${ticketItem.reward.name}`}
                            className="object-cover w-full h-28"
                        />
                    </CardHeader>

                    {/* Ticket Details */}
                    <CardBody className="flex flex-col justify-between w-2/3 p-4">
                        <Typography variant="h6" color="blue-gray" className="mb-1 font-bold uppercase">
                            {ticketItem.reward.name}
                        </Typography>
                        <Typography variant="h5" color="blue-gray" className="mb-1">
                            Ticket #{ticketItem.ticket_number}
                        </Typography>
                        <Typography color="gray" className="mb-2 text-sm font-medium">
                            Status: <span className={`font-semibold ${ticketItem.status === 'Claimed' ? 'text-orange-500' : 'text-blue-500'}`}>{ticketItem.status}</span>
                        </Typography>
                        <Typography color="gray" className="text-xs">
                            {ticketItem.status === 'Claimed'
                                ? `Claimed at: ${new Date(ticketItem.claimed_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`
                                : `Pending since: ${new Date(ticketItem.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`}
                        </Typography>
                    </CardBody>
                </Card>
            ))
        ) : (
            <Typography color="gray" className="text-sm text-center">
                No tickets available for this user.
            </Typography>
        )}
    </div>

    );
};

export default RewardsTicket;
