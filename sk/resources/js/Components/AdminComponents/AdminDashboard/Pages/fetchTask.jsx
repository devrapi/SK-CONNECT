import React, { useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { PencilIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import DeleteTask from './DeleteTask';

const FetchTask = () => {
    const { task } = useContext(AppContext);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {task.map((item, index) => (
                <Card key={index} className="mt-6 w-full">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {item.task_name}
                        </Typography>
                        <Typography>
                            {item.description}
                        </Typography>
                        <Typography>
                            {item.points}
                        </Typography>
                    </CardBody>
                    <CardFooter className="flex justify-between pt-0 ">

                        <Link to={`/admin/dashboard/task/update/${item.id}`}>
                            <PencilIcon className="w-6 h-6 text-green-500 cursor-pointer" />
                        </Link>


                        <DeleteTask id={item.id} />

                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default FetchTask;
