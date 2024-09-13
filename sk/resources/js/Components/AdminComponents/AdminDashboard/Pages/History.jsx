import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext'
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import {    ArrowLeftCircleIcon  } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
const History = () => {
    const{history} = useContext(AppContext);

    const TABLE_HEAD = ["Name", "Reward", "Ticket Number", "Status"];
    const TABLE_ROWS = history.map(ticks => ({
        id: `${ticks.id}`,
        name: `${ticks.user.name}`,
        reward: `${ticks.reward.name}`,
        ticket_number: `${ticks.ticket_number}`,
        status: `${ticks.status}`,

    }));

  return (
    <div className="space-y-5">
    <Typography variant="h4"className="font-semibold">
         TICKET HISTORY
    </Typography>
    <div className='flex justify-end'>
    <Link to="/admin/dashboard/inbox">
            <ArrowLeftCircleIcon className='w-12 text-blue-500 h-14 hover hover:text-blue-400'/>
        </Link>
    </div>

    <Card className="w-full h-full rounded-lg shadow-lg">
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="p-4 text-yellow-600 bg-yellow-100 border-b border-yellow-200">
                                <Typography variant="small"  className="font-semibold">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ id, name, reward, ticket_number, status,  }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-yellow-100";

                        return (
                            <tr key={id} className="">
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {name}
                                    </Typography>
                                </td>
                                <td className={`${classes} `}>
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


                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </Card>
            </div>
  )
}

export default History
