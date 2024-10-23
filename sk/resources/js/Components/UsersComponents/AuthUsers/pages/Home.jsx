import React, { useContext } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Avatar
  } from "@material-tailwind/react";

import { AppContext } from '../../../Context/AppContext';
import CommentLike from './CommentLike';
import moment from 'moment';
import {  GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid'; // Assuming you're using Heroicons
const Home = () => {

    const{announcement } = useContext(AppContext);


  return (
    <>
        <div className="space-y-6">
            {announcement.map((item) => (
                <Card key={item.id} className="max-w-lg mx-auto">
                     <div className="flex items-center mb-4">
                                    <Avatar
                                        src="/img/uno.png" // Add your avatar path here
                                        alt="Sangguniang Kabataan ng Uno"
                                        size="sm"
                                        className="m-3"
                                    />
                                    <div className='flex flex-col'>
                                        <Typography variant="h6" color="blue-gray">
                                            KABATAAN NG UNO
                                        </Typography>

                                        <Typography variant="small" className="text-xs text-gray-500">
                                            <div className='flex'>
                                                {moment(item.created_at).fromNow()}
                                                <GlobeAsiaAustraliaIcon className='w-4 h-4 ml-1' />
                                            </div>
                                        </Typography>
                                    </div>
                                </div>
                    <div className="px-6 text-left">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {item.title}
                        </Typography>
                        <Typography color="gray" className="mb-4">
                            {item.content}
                        </Typography>
                        <hr />
                        <CommentLike AnnounceId ={item.id}/>

                    </div>
                    <CardFooter>
                        <Typography variant="small" className="text-gray-500">
                            Posted by Admin
                        </Typography>

                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
};

export default Home;
