import React, { useContext, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
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
                    <Typography variant="h4" color="blue-gray" className="font-semibold uppercase">
                        Rewards
                    </Typography>
                </div>

                {/* Monthly Claimed Rewards Indicator */}
                <div className="my-4 text-center">
                    <Typography variant="h6" color="blue-gray" className="font-medium">
                        Rewards Claimed This Month: {user.reward_claimed_count} / 3                    </Typography>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex justify-center space-x-4">
                    {['All', 'Basic', 'Classic', 'Premium'].map(category => (
                        <Button
                            key={category}
                            color={selectedCategory === category ? "blue" : "gray"}
                            onClick={() => filterRewards(category)}
                            className={`px-4 py-2 text-sm font-medium capitalize transition duration-300 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Rewards Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredRewards.map((reward) => (
                        <Card key={reward.id} className="max-w-md p-4 mx-auto rounded-lg shadow-lg">
                            {/* Reward Name */}
                            <div className="mb-4 text-center">
                                <Typography variant="h3" color="blue-gray" className="text-lg font-bold">
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

                                {/* Category Badge */}
                                <div className={`absolute top-2 left-2 px-3 py-1 text-xs font-bold text-white rounded-full ${
                                    reward.category === 'Basic' ? 'bg-green-500' :
                                    reward.category === 'Classic' ? 'bg-yellow-500' :
                                    reward.category === 'Premium' ? 'bg-red-500' : 'bg-blue-600'
                                }`}>
                                    {reward.category}
                                </div>
                            </div>

                            {/* Reward Details */}
                            <CardBody className="px-4 py-2 text-left">
                                <Typography color="gray" className="mb-3 text-sm truncate">
                                    {reward.description}
                                </Typography>

                                {/* Points and Stock Information */}
                                <div className="flex flex-col space-y-1 text-sm">
                                    <Typography className="font-medium">
                                        <span className="font-semibold">Points:</span> {reward.points}
                                    </Typography>
                                    <Typography className="font-medium">
                                        <span className="font-semibold">Available Stocks:</span> {reward.stocks}
                                    </Typography>
                                </div>
                            </CardBody>

                            {/* Card Footer for Claim Button */}
                            <CardFooter className="flex justify-end p-3 border-t">
                                {hasReachedClaimLimit ? (
                                    <Button
                                        color="gray"
                                        disabled
                                        className="text-gray-600 bg-gray-300 cursor-not-allowed"
                                    >
                                        You have reached your reward limit
                                    </Button>
                                ) : (
                                    <ClaimReward
                                        rewardId={reward.id}
                                        userId={user.id}
                                        rewardPoints={reward.points}
                                        userPoints={user.points}
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
