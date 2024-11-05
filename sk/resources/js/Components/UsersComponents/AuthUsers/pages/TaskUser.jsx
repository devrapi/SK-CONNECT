import React, { useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { CheckCircleIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/solid';
import ReferralBonus from '../Profile/ReferralBonus';

const TaskUser = () => {
    const { task } = useContext(AppContext);
    const { user } = useContext(AppContext);
    const TABLE_HEAD = ["Task Name", "Description", "Points"];
    const TABLE_ROWS = task.map(task => ({
        id: `${task.id}`,
        task_name: task.task_name,
        description: task.description,
        points: task.points,
    }));

    return (
        <div className="space-y-6 ">

            {/* Instruction Section */}
            <Typography variant="h4" className="mb-4 font-semibold text-center">
                How to Earn Points
            </Typography>
            <div className="flex justify-end mb-2">
                <ReferralBonus user_id={user.id} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
                {/* Instruction Cards with Icons */}
                <Card className="flex items-center shadow-md">
                    <CheckCircleIcon className="w-10 h-10 mr-4 text-green-400" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold ">
                            Complete Daily Tasks
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600">
                            Earn points by completing tasks assigned daily.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="flex items-center shadow-md">
                    <UserGroupIcon className="w-10 h-10 mr-4 text-blue-400" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold ">
                            Refer Friends
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600">
                            Invite friends to join and earn bonus points when they register.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="flex items-center shadow-md">
                    <CalendarIcon className="w-10 h-10 mr-4 text-yellow-400"  />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold ">
                            Participate in Events
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600">
                            Attend events and activities to earn additional rewards.
                        </Typography>
                    </CardBody>
                </Card>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-purple-200">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="px-5 py-3 text-xs font-medium tracking-wider text-left text-purple-600 uppercase"
                                >
                                    <Typography variant="small" className="font-semibold">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {TABLE_ROWS.map(({ id, task_name, description, points }) => (
                            <tr key={id} className="transition duration-150 ease-in-out hover:bg-blue-50">
                                <td className="px-5 py-4 text-sm font-normal text-blue-gray-700">
                                    {task_name}
                                </td>
                                <td className="px-5 py-4 text-sm font-normal text-blue-gray-700">
                                    {description}
                                </td>
                                <td className="px-5 py-4 text-sm font-semibold text-purple-500">
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
