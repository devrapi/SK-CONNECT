import React, { useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import {
    Card,
    CardBody,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";
import { PencilIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import DeleteTask from './DeleteTask';

const FetchTask = () => {
    const { task } = useContext(AppContext);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 font-custom">
            {task.map((item) => (
                <Card key={item.id} className="mt-6 w-full relative transition-transform duration-300 hover:scale-105 font-custom">

                    {/* Top-right menu */}
                    <Menu>
                        <MenuHandler>
                            <div className="absolute top-2 right-2 p-2 cursor-pointer">
                                <EllipsisHorizontalIcon className="w-5 h-5" />
                            </div>
                        </MenuHandler>
                        <MenuList className="z-10">
                            <MenuItem>
                                <Link to={`/admin/dashboard/task/update/${item.id}`}>
                                    <div className="flex items-center space-x-2">
                                        <PencilIcon className="w-4 h-4" />
                                        <span>Edit Task</span>
                                    </div>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <DeleteTask id={item.id} />
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2 truncate font-custom">
                            {item.task_name}
                        </Typography>
                        <Typography className="text-sm text-gray-600 truncate font-custom">
                            {item.description}
                        </Typography>
                        <Typography>
                            <span className="font-semibold font-custom">Points:</span> {item.points}
                        </Typography>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default FetchTask;
