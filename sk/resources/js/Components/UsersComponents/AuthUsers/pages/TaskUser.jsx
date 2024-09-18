import React, { useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Typography } from "@material-tailwind/react";
import ReferralBonus from '../Profile/ReferralBonus';

const TaskUser = () => {
    const { task } = useContext(AppContext);
    const {user} = useContext(AppContext);
    const TABLE_HEAD = ["Task Name", "Description", "Points"];
    const TABLE_ROWS = task.map(task => ({
        id: `${task.id}`,
        task_name: task.task_name,
        description: task.description,
        points: task.points,
    }));

    return (
        <div className="p-3 space-y-5">
        <Typography variant="h4" className="mb-2 font-semibold text-center">
            AVAILABLE TASKS
        </Typography>
            <div>
            <ReferralBonus user_id={user.id}/>
            </div>
        <div className="h-auto overflow-x-auto shadow-md">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm table-auto">
                <thead className="bg-blue-100">
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="px-4 py-3 text-xs font-medium tracking-wider text-left text-blue-500 uppercase sm:px-6 sm:py-4"
                            >
                                <Typography variant="small" className="font-semibold">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {TABLE_ROWS.map(({ id, task_name, description, points }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "px-4 py-4" : "px-4 py-4 border-b border-blue-200";
                        return (
                            <tr key={id}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {task_name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {description}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {points}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>

    );
};

export default TaskUser;
