import React, { useContext , useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import ApiService from '../../../Services/ApiService';
import ClaimReward from './ClaimReward';

const RewardUser =  () => {

    const{rewards} = useContext(AppContext);
    const{user} = useContext(AppContext);



  return (
    <>

<div className="container pb-6 mx-auto space-y-6">
    <div className="text-center">
        <Typography variant="h4" color="blue-gray" className="font-semibold uppercase">
            Rewards
        </Typography>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rewards.map((reward) => (
            <Card key={reward.id} className="max-w-md p-4 mx-auto rounded-lg shadow-lg">
                {/* Reward Name */}
                <div className="mb-4 text-center">
                    <Typography variant="h3" color="blue-gray" className="text-lg font-bold">
                        {reward.name}
                    </Typography>
                </div>

                {/* Reward Image */}
                <div className="w-full overflow-hidden rounded-md h-60">
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
                    <ClaimReward
                        rewardId={reward.id}
                        userId={user.id}
                        rewardPoints={reward.points}
                        userPoints={user.points}
                    />
                </CardFooter>
            </Card>
        ))}
    </div>
</div>



        </>
  )
}

export default RewardUser
