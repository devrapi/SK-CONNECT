import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
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

                <div className="flex justify-end">
                    <Link to="/admin/dashboard/rewards/">
                        <div className="flex items-center space-x-2">
                            <GiftIcon className="w-10 h-10 text-purple-500" />
                            <PlusIcon className="w-6 h-6 text-purple-500" />
                        </div>
                    </Link>
                </div>

                {/* Responsive grid layout */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {rewards.map((reward) => (
                        <Card
                            key={reward.id}
                            className="relative w-full mx-auto mt-4 transition-transform duration-300 hover:scale-105"
                        >
                            {/* Options menu */}
                            <Menu>
                                <MenuHandler>
                                    <div className="absolute p-2 cursor-pointer top-2 right-2">
                                        <EllipsisHorizontalIcon className="w-5 h-5" />
                                    </div>
                                </MenuHandler>
                                <MenuList className="z-10">
                                    <MenuItem>
                                        <Link to={`/admin/dashboard/avail-rewards/${reward.id}`}>
                                            <div className="flex items-center space-x-2">
                                                <PencilIcon className="w-4 h-4" />
                                                <span>Edit Rewards</span>
                                            </div>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <DeleteRewards id={reward.id} />
                                    </MenuItem>
                                </MenuList>
                            </Menu>

                            {/* Image Section */}
                            <div className="w-full overflow-hidden rounded-md h-60">
                                <img
                                    src={`/storage/${reward.image_path}`}
                                    alt={reward.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Card Body */}
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2 truncate">
                                    {reward.name}
                                </Typography>
                                <Typography className="truncate mb-2 text-sm text-gray-600">
                                    {reward.description}
                                </Typography>
                                <Typography>
                                    <span className="font-semibold">Points:</span> {reward.points}
                                </Typography>
                                <Typography>
                                    <span className="font-semibold">Stocks:</span> {reward.stocks}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RewardsFetch;
