import React, { useContext, useState } from 'react';
import { AppContext } from '../../../Context/AppContext';
import VerifyTicket from './VerifyTicket';
import { Card, Typography, Button } from "@material-tailwind/react";
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const TicketInbox = () => {
    const { ticket, history } = useContext(AppContext);
    const [filter, setFilter] = useState('All'); // State to track the selected filter

    const pendingTickets = ticket.filter(ticketItem => ticketItem.status === 'Pending');
    const claimedTickets = history.filter(ticketItem => ticketItem.status === 'Claimed');

    let filteredTickets = [];
    if (filter === 'Pending') {
        filteredTickets = pendingTickets;
    } else if (filter === 'Claimed') {
        filteredTickets = claimedTickets;
    } else {
        // For 'all', combine both pending and claimed tickets
        filteredTickets = [...pendingTickets, ...claimedTickets];
    }

    const TABLE_HEAD = ["Name", "Reward", "Ticket Number", "Status", "Action"];

    const TABLE_ROWS = filteredTickets.map(ticks => ({
        id: `${ticks.id}`,
        name: `${ticks.user.name}`,
        reward: `${ticks.reward.name}`,
        ticket_number: `${ticks.ticket_number}`,
        status: `${ticks.status}`,
    }));

    return (
        <div className="space-y-5">
            <Typography variant="h4" className="font-semibold">
                TICKET INBOX
            </Typography>

            <div className='flex justify-end space-x-2'>
                {/* Filter Buttons */}
                {/* <Button color="green"  onClick={() => setFilter('All')}>All</Button> */}
                <Button color="red" onClick={() => setFilter('Pending')}>Pending</Button>
                <Button color="blue" onClick={() => setFilter('Claimed')}>Claimed</Button>
            </div>

            <Card className="w-full h-full rounded-lg shadow-lg">
                <div className="overflow-x-auto">
                    {filteredTickets.length === 0 ? (
                        <div className="p-4 text-center">
                            <Typography variant="small" color="gray" className="font-normal">
                                No tickets available
                            </Typography>
                        </div>
                    ) : (
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="p-4 text-green-600 bg-green-100 border-b border-green-200">
                                            <Typography variant="small" className="font-semibold">
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map(({ id, name, reward, ticket_number, status }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-green-100";

                                    return (
                                        <tr key={id}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {reward}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {ticket_number}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                                    {status}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                {status === 'Claimed' ? (
                                                    <div className='flex'>
                                                        <CheckCircleIcon className="w-6 h-6 mr-1 text-blue-600" />
                                                        <Typography variant="small" color="blue" className="font-semibold">
                                                            Verified
                                                        </Typography>
                                                    </div>
                                                ) : (
                                                    <VerifyTicket id={id} />
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default TicketInbox;
