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
        <div className="space-y-8">
            {/* Instruction Section */}
            <Typography variant="h4" className="mb-6 font-semibold text-center text-gray-800">
                How to Earn Points
            </Typography>
            <div className="flex justify-end mb-4">
                <ReferralBonus user_id={user.id} />
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
                {/* Instruction Cards with Icons */}
                <Card className="flex items-center p-4 transition-shadow rounded-lg shadow-lg bg-gray-50 hover:shadow-xl">
                    <CheckCircleIcon className="w-12 h-12 mr-4 text-green-500" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold text-gray-800">
                            Complete Daily Tasks
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600">
                            Earn points by completing tasks assigned daily.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="flex items-center p-4 transition-shadow rounded-lg shadow-lg bg-gray-50 hover:shadow-xl">
                    <UserGroupIcon className="w-12 h-12 mr-4 text-blue-500" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold text-gray-800">
                            Refer Friends
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600">
                            Invite friends to join and earn bonus points when they register.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="flex items-center p-4 transition-shadow rounded-lg shadow-lg bg-gray-50 hover:shadow-xl">
                    <CalendarIcon className="w-12 h-12 mr-4 text-yellow-500" />
                    <CardBody>
                        <Typography variant="h5" className="font-semibold text-gray-800">
                            Participate in Events
                        </Typography>
                        <Typography variant="small" className="mt-2 text-gray-600">
                            Attend events and activities to earn additional rewards.
                        </Typography>
                    </CardBody>
                </Card>
            </div>

            {/* Task Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-200 bg-gray-50">
                    <thead className="bg-gray-100">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border-b"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {TABLE_ROWS.map(({ id, task_name, description, points }) => (
                            <tr key={id} className="transition-colors hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                    {task_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {description}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-green-600">
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
