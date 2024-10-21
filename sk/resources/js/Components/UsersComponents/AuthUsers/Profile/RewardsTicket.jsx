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
        <div className="flex flex-col space-y-4 justify-center items-center">
            {/* Filter Buttons */}
            <div className="flex space-x-4 mb-6">
    <Button
        onClick={() => setFilter('all')}
        color={filter === 'all' ? 'green' : 'green'} // Green when active, gray when not
        variant={filter === 'all' ? 'filled' : 'outlined'}
    >
        All
    </Button>
    <Button
        onClick={() => setFilter('Pending')}
        color={filter === 'Pending' ? 'blue' : 'blue'} // Blue when active, gray when not
        variant={filter === 'Pending' ? 'filled' : 'outlined'}
    >
        Pending
    </Button>
    <Button
        onClick={() => setFilter('Claimed')}
        color={filter === 'Claimed' ? 'orange' : 'orange'} // Orange when active, gray when not
        variant={filter === 'Claimed' ? 'filled' : 'outlined'}
    >
        Claimed
    </Button>
</div>


            {/* Display tickets based on the selected filter */}
            {filteredTickets.length > 0 ? (
                filteredTickets.map((ticketItem) => (
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
                            <Typography color="gray" className="mb-8 font-normal">
                                {ticketItem.status === 'Claimed' ? (
                                    <>Claimed at: {new Date(ticketItem.claimed_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</>
                                ) : (
                                    <>Pending at: {new Date(ticketItem.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</>
                                )}
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
