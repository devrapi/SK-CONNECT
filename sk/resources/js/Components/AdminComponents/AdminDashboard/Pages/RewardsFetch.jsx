import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { EllipsisHorizontalIcon, PencilIcon, GiftIcon, PlusIcon } from '@heroicons/react/24/solid';
import DeleteRewards from './DeleteRewards';

const RewardsFetch = () => {
    const { rewards } = useContext(AppContext);

    return (
        <>
            <div className="space-y-5">
                <Typography variant="h4" color="blue-gray" className="font-semibold">
                    Available Rewards
                </Typography>

                <div className='flex justify-end'>
                    <Link to="/admin/dashboard/rewards/">
                        <div className='flex items-center'>
                            <GiftIcon className='w-10 h-10 text-purple-500' />
                            <PlusIcon className='w-6 h-6 text-purple-500' />
                        </div>
                    </Link>
                </div>

                {/* Responsive grid layout for cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {rewards.map(ev => (
                        <Card key={ev.id} className="relative w-full pt-6 mx-auto mt-4 sm:w-60 md:w-64 lg:w-72">
                            <Menu>
                                <MenuHandler>
                                    <div className="absolute p-2 cursor-pointer top-2 right-2">
                                        <EllipsisHorizontalIcon className="w-5 h-5" />
                                    </div>
                                </MenuHandler>
                                <MenuList className="z-10">
                                    <MenuItem>
                                        <Link to={`/admin/dashboard/avail-rewards/${ev.id}`}>
                                            <div className='flex'>
                                                <PencilIcon className="w-4 h-4 mr-2" /> Edit Rewards
                                            </div>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <DeleteRewards id={ev.id} />
                                    </MenuItem>
                                </MenuList>
                            </Menu>

                            {/* Adjusted image container for responsiveness */}
                            <div className="w-full overflow-hidden rounded-md h-60">
                                <img
                                    src={`/storage/${ev.image_path}`}
                                    alt={ev.name}
                                    className="object-cover w-full h-full p-2 rounded-md"
                                />
                            </div>

                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-1">
                                    {ev.name}
                                </Typography>
                                <Typography className="truncate">
                                    {ev.description}
                                </Typography>
                                <Typography>
                                    <span className='font-semibold'>Points:</span> {ev.points}
                                </Typography>
                                <Typography>
                                    <span className='font-semibold'>Stocks:</span> {ev.stocks}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RewardsFetch;
