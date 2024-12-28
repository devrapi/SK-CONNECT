import React, { useContext, useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { StarIcon } from '@heroicons/react/24/solid';
import ClaimReward from './ClaimReward';

const RewardUser = () => {
    const { rewards } = useContext(AppContext);
    const { user } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function to filter rewards based on category
    const filterRewards = (category) => {
        setSelectedCategory(category);
    };

    // Filtered rewards
    const filteredRewards = selectedCategory === 'All'
        ? rewards
        : rewards.filter(reward => reward.category === selectedCategory);

    // Check if user has reached the claim limit
    const hasReachedClaimLimit = user.reward_claimed_count >= 3;

    return (
        <>
            <div className="container pb-6 mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <Typography variant="h4" className="font-semibold text-gray-700 uppercase font-custom">
                       Available Rewards
                    </Typography>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex justify-end space-x-4">
    {['All', 'Basic', 'Classic', 'Premium'].map(category => (
        <Button
            key={category}
            onClick={() => filterRewards(category)}
            className={`px-4 py-2 text-sm font-medium capitalize transition duration-300 rounded-full ${
                selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    : 'bg-blue-50 text-green-700 hover:from-green-200 hover:to-blue-200 hover:bg-gradient-to-r'
            }`}
        >
            {category}
        </Button>
    ))}
</div>


                {/* Rewards Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredRewards.map((reward) => (
                        <Card key={reward.id} className="max-w-md p-4 mx-auto transition-transform rounded-lg shadow-lg hover:shadow-2xl hover:scale-105">
                            {/* Reward Name */}
                            <div className="mb-4 text-center">
                                <Typography variant="h5" className="font-bold text-gray-800">
                                    {reward.name}
                                </Typography>
                            </div>

                            {/* Reward Image */}
                            <div className="relative w-full overflow-hidden rounded-md h-60">
                                <img
                                    src={`/storage/${reward.image_path}`}
                                    alt={reward.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Reward Details */}
                            <CardBody className="px-4 py-2 text-left">
                                <Typography color="gray" className="mb-3 text-sm truncate">
                                    {reward.description}
                                </Typography>

                                {/* Points and Stock Information */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center">
                                        <StarIcon className="w-5 h-5 mr-1 text-yellow-500" />
                                        <span className="font-semibold text-green-700">{reward.points} Points</span>
                                    </div>
                                    <Typography>
                                        <span className="font-semibold text-green-700">Stocks:</span> {reward.stocks}
                                    </Typography>
                                </div>

                                {/* Category Badge */}
                                <div className="mt-3 text-center">
                                    <div
                                        className={`px-3 py-1 text-xs font-bold text-white rounded-full ${
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

                            {/* Card Footer for Claim Button */}
                            <CardFooter className="flex justify-end p-3 border-t border-green-200">
                                {hasReachedClaimLimit ? (
                                    <Button
                                        disabled
                                        className="text-gray-600 bg-gray-300 cursor-not-allowed"
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
                                    />
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RewardUser;
