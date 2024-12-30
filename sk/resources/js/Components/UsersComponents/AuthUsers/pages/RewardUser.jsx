import React, { useContext, useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { StarIcon } from '@heroicons/react/24/solid';
import ClaimReward from './ClaimReward';

const RewardUser = () => {
    const { rewards } = useContext(AppContext);
    const { user } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filterRewards = (category) => {
        setSelectedCategory(category);
    };

    const filteredRewards = selectedCategory === 'All'
        ? rewards
        : rewards.filter(reward => reward.category === selectedCategory);

    const hasReachedClaimLimit = user.reward_claimed_count >= 3;

    return (
        <div className="container pb-6 mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <Typography variant="h4" className="font-bold text-gray-800 uppercase font-custom">
                    Explore Rewards
                </Typography>
                <Typography className="text-gray-500 font-custom">
                    Use your points to claim exciting rewards.
                </Typography>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4">
                {['All', 'Basic', 'Classic', 'Premium'].map((category) => (
                    <Button
                        key={category}
                        onClick={() => filterRewards(category)}
                        className={`px-4 py-2 text-sm font-medium capitalize transition duration-300 rounded-full font-custom ${
                            selectedCategory === category
                                ? 'bg-green-700 text-white'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredRewards.map((reward) => (
                    <Card
                        key={reward.id}
                        className="max-w-md p-4 mx-auto transition-transform transform rounded-lg shadow-md hover:shadow-xl hover:scale-105 bg-white"
                    >
                        {/* Reward Name */}
                        <div className="mb-4 text-center">
                            <Typography variant="h5" className="font-bold text-gray-700 font-custom">
                                {reward.name}
                            </Typography>
                        </div>

                        {/* Reward Image */}
                        <div className="relative w-full overflow-hidden rounded-lg h-60">
                            <img
                                src={`/storage/${reward.image_path}`}
                                alt={reward.name}
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                        </div>

                        {/* Reward Details */}
                        <CardBody className="px-4 py-4">
                            <Typography color="gray" className="mb-3 text-sm truncate font-custom">
                                {reward.description}
                            </Typography>

                            <div className="flex items-center justify-between text-sm font-custom">
                                <div className="flex items-center">
                                    <StarIcon className="w-5 h-5 mr-1 text-yellow-500" />
                                    <span className="font-semibold text-green-700">
                                        {reward.points} Points
                                    </span>
                                </div>
                                <Typography>
                                    <span className="font-semibold text-green-700">Stocks:</span> {reward.stocks}
                                </Typography>
                            </div>

                            <div className="mt-4 text-center">
                                <div
                                    className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full font-custom ${
                                        reward.category === 'Basic'
                                            ? 'bg-green-500'
                                            : reward.category === 'Classic'
                                            ? 'bg-yellow-500'
                                            : reward.category === 'Premium'
                                            ? 'bg-red-500'
                                            : 'bg-blue-500'
                                    }`}
                                >
                                    {reward.category}
                                </div>
                            </div>
                        </CardBody>

                        {/* Claim Button */}
                        <CardFooter className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
                            {hasReachedClaimLimit ? (
                                <Button
                                    disabled
                                    className="text-sm font-semibold text-gray-600 bg-gray-300 rounded-md cursor-not-allowed font-custom"
                                >
                                    Claim Limit Reached
                                </Button>
                            ) : (
                                <ClaimReward
                                    rewardId={reward.id}
                                    userId={user.id}
                                    rewardPoints={reward.points}
                                    userPoints={user.points}
                                    rewardStocks={reward.stocks}
                                    className="text-sm font-semibold text-white bg-green-700 hover:bg-green-600 rounded-md font-custom"
                                />
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RewardUser;
