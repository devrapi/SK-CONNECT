import React, { useContext, useState } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Typography, Card, CardBody, Button, Dialog, DialogHeader, DialogBody, IconButton } from "@material-tailwind/react";
import { CheckCircleIcon, UserGroupIcon, CalendarIcon, GiftIcon,ExclamationCircleIcon  ,StarIcon } from '@heroicons/react/24/solid';

const TaskUser = () => {
    const { task } = useContext(AppContext);
    const { user } = useContext(AppContext);

    const [isOpen, setIsOpen] = useState(false);

    const TABLE_HEAD = ["Task Name", "Description", "Points"];
    const TABLE_ROWS = task.map(task => ({
        id: `${task.id}`,
        task_name: task.task_name,
        description: task.description,
        points: task.points,
    }));

    const rules = [
        {
            icon: <StarIcon className="w-6 h-6 text-yellow-500" />,
            title: "Monthly Points Reset",
            description: "Points reset at the end of each month. Users on the leaderboard will retain their points."
        },
        {
            icon: <GiftIcon className="w-6 h-6 text-yellow-500" />,
            title: "Reward Limitations",
            description: "Claim up to 3 rewards per month to prevent spamming. Plan your claims wisely!"
        },
        {
            icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
            title: "Complete Tasks",
            description: "Earn points by completing assigned tasks daily."
        },
        {
            icon: <UserGroupIcon className="w-6 h-6 text-blue-500" />,
            title: "Refer Friends",
            description: "Invite friends to Participate in an event and earn bonus points when they register."
        },
        {
            icon: <CalendarIcon className="w-6 h-6 text-yellow-500" />,
            title: "Participate in Events",
            description: "Attend events and activities to earn additional rewards."
        },
    ];

    return (
        <div className="space-y-8 font-custom">
    {/* Title and Button Section */}
    <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" className="font-semibold text-gray-800 font-custom">

        </Typography>
        <IconButton
            className="flex items-center gap-2 p-3 text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform"
            onClick={() => setIsOpen(true)}
        >
            <ExclamationCircleIcon className="w-6 h-6" />
            <span className="sr-only">View Points Rules</span>
        </IconButton>
    </div>




            {/* Rules Modal */}
            <Dialog
                open={isOpen}
                handler={() => setIsOpen(!isOpen)}
                size="lg"
            >
                <DialogHeader>Points Rules System</DialogHeader>
                <DialogBody divider className="space-y-4">
                    {rules.map((rule, index) => (
                        <div key={index} className="flex items-start gap-4">
                            {rule.icon}
                            <div>
                                <Typography variant="h6" className="font-semibold">
                                    {rule.title}
                                </Typography>
                                <Typography variant="small" className="text-gray-600">
                                    {rule.description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </DialogBody>
            </Dialog>

            {/* Instruction Cards with Icons */}
            <div className="grid gap-6 sm:grid-cols-3">
                <Card className="flex items-center p-4 transition-shadow rounded-lg shadow-lg bg-gray-50 hover:shadow-xl font-custom">
                    <CheckCircleIcon className="w-12 h-12 mr-4 text-green-500" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold text-gray-800 font-custom">
                            Complete Tasks
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600 font-custom">
                            Earn points by completing tasks assigned daily.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="flex items-center p-4 transition-shadow rounded-lg shadow-lg bg-gray-50 hover:shadow-xl font-custom">
                    <UserGroupIcon className="w-12 h-12 mr-4 text-blue-500" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold text-gray-800 font-custom">
                            Refer Friends
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600 font-custom">
                            Invite friends to Participate in an event and earn bonus points when they register.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="flex items-center p-4 transition-shadow rounded-lg shadow-lg bg-gray-50 hover:shadow-xl font-custom">
                    <CalendarIcon className="w-12 h-12 mr-4 text-yellow-500" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold text-gray-800 font-custom">
                            Participate in Events
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600 font-custom">
                            Attend events and activities to earn additional rewards.
                        </Typography>
                    </CardBody>
                </Card>
            </div>

            {/* Task Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg font-custom">
                <table className="min-w-full divide-y divide-gray-200 bg-gray-50 font-custom">
                    <thead className="bg-gray-100">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border-b font-custom"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 font-custom">
                        {TABLE_ROWS.map(({ id, task_name, description, points }) => (
                            <tr key={id} className="transition-colors hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 font-custom">
                                    {task_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-custom">
                                    {description}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-green-600 font-custom">
                                    {points}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskUser;
