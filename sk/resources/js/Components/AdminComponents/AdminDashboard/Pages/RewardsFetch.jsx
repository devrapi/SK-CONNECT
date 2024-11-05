import React, { useContext , useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { PencilIcon,   PlusIcon , GiftIcon , } from '@heroicons/react/24/solid';
import DeleteRewards from './DeleteRewards';
const RewardsFetch = () => {

    const{rewards} = useContext(AppContext);
  return (
    <>

<div className="space-y-5">
    <Typography variant="h4" color="blue-gray" className="font-semibold">
       REWARDS
    </Typography>

    <div className='flex justify-end'>
    <Link to="/admin/dashboard/rewards/">
    <div className='flex items-center'>
        <GiftIcon className='w-10 h-10 text-purple-500'/>
        <PlusIcon className='w-6 h-6 text-purple-500'/>
</div>

        </Link>
    </div>
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
                        <CardFooter className="flex justify-between pt-0 border-t p-4 ">
                            <Link to={`/admin/dashboard/avail-rewards/${ev.id}`}>
                            <PencilIcon className="w-8 h-8 text-green-500 cursor-pointer"/>
                            </Link>

                            <DeleteRewards id={ev.id}/>
                        </CardFooter>
                    </Card>
                ))}
            </div>


        </div>


    </>
  )
}

export default RewardsFetch
