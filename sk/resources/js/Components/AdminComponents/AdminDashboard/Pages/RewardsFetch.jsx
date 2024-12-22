import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { EllipsisHorizontalIcon, PencilIcon, GiftIcon, PlusIcon } from '@heroicons/react/24/solid';
import DeleteRewards from './DeleteRewards';

const RewardsFetch = () => {
    const { rewards } = useContext(AppContext);

    // State to handle selected category
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get unique categories from rewards
    const categories = ["All", ...new Set(rewards.map((reward) => reward.category || "No Category"))];

    // Filter rewards based on the selected category
    const filteredRewards = selectedCategory === "All"
        ? rewards
        : rewards.filter((reward) => (reward.category || "No Category") === selectedCategory);

    return (
        <div className="space-y-5">
            <Typography variant="h4" color="blue-gray" className="font-semibold text-center">
                Available Rewards
            </Typography>

            {/* Add Rewards Button */}

            <div className="flex justify-end space-x-4">
            <Link
                to="/admin/dashboard/rewards/"
                className="flex items-center gap-2 px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                aria-label="Add Reward"
            >
                <GiftIcon className="w-6 h-6 text-white transition duration-300 group-hover:scale-110" />
                <span>Add Reward</span>
            </Link>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 my-4">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "filled" : "outlined"}
                        color={selectedCategory === category ? "blue" : "gray"}
                        className={`transition-transform ${
                            selectedCategory === category ? "scale-110" : "hover:scale-105"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredRewards.map((reward) => (
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

                        {/* Image Section with placeholder */}
                        <div className="w-full overflow-hidden rounded-md h-60">
                            <img
                                src={`/storage/${reward.image_path}` || '/path/to/placeholder.jpg'}
                                alt={reward.name}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Card Body */}
                        <CardBody>
                            {/* Reward Title */}
                            <Typography variant="h5" color="blue-gray" className="mb-2 truncate">
                                {reward.name}
                            </Typography>

                            {/* Reward Description */}
                            <Typography className="mb-2 text-sm text-gray-600 truncate">
                                {reward.description}
                            </Typography>

                            {/* Reward Points */}
                            <Typography>
                                <span className="font-semibold">Points:</span> {reward.points}
                            </Typography>

                            {/* Reward Stocks */}
                            <Typography>
                                <span className="font-semibold">Stocks:</span> {reward.stocks}
                            </Typography>

                            {/* Category Badge */}
                            <div className="mt-4">
                                <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                                    {reward.category || "No Category"}
                                </span>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* No Rewards Found Message */}
            {filteredRewards.length === 0 && (
                <Typography className="text-center text-gray-500">
                    No rewards available for the selected category.
                </Typography>
            )}
        </div>
    );
};

export default RewardsFetch;
