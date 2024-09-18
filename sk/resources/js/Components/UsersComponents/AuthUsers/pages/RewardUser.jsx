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

    <div className="space-y-5">
        <Typography variant="h4" color="blue-gray" className="font-semibold">
           REWARDS
        </Typography>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {rewards.map(ev => (
                        <Card key={ev.id} className="pt-12 mt-6 w-96">
                            <div color="blue-gray" className="relative h-56">
                                <img
                                    src={`/storage/${ev.image_path}`}
                                    alt={ev.name}
                                    className="p-8 rounded-t-lg"
                                />
                            </div>
                            <CardBody className="">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {ev.name}
                                </Typography>
                                <Typography className="truncate">
                                    {ev.description}
                                </Typography>
                                <Typography>
                                   <span className='font-semibold'>Points:</span>  {ev.points}
                                </Typography>
                            </CardBody>
                            <CardFooter className="flex justify-between pt-0 ">
                                <ClaimReward rewardId={ev.id} userId={user.id}/>
                            </CardFooter>
                        </Card>
                    ))}
                </div>


            </div>

        </>
  )
}

export default RewardUser
