import React, { useContext, useState } from 'react';
import {
    Card,
    IconButton,
    CardFooter,
    Typography,
    Avatar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import moment from 'moment';
import { GlobeAsiaAustraliaIcon, EllipsisHorizontalIcon , PencilIcon, TrashIcon, } from '@heroicons/react/24/solid';
import AdminCommentLike from './AdminCommentLike';
import AnnouncementCreate from './AnnouncementCreate';
import { Link } from 'react-router-dom';
import AnnouncementDelete from './AnnouncementDelete';

const Announcement = () => {
    const { announcement } = useContext(AppContext);

    return (
        <>
            <Typography variant="h4" color="blue-gray" className="font-semibold mt-5">
                ANNOUNCEMENT DASHBOARD
            </Typography>

            <AnnouncementCreate />

            <div className="space-y-6 mt-5">
                {announcement.map((item) => (
                    <Card key={item.id} className="max-w-lg mx-auto relative">
                        <Menu>
                            <MenuHandler>
                                <div variant="text" className="absolute top-2 right-2 p-2 cursor-pointer">
                                    <EllipsisHorizontalIcon className="w-5 h-5" />
                                </div>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem>
                                <Link to={`/admin/dashboard/announcement/update/${item.id}`}>
                                     <div className='flex'>
                                    <PencilIcon className="w-4 h-4 mr-2" /> Edit Post
                                </div>
                                </Link>
                                </MenuItem>

                                <MenuItem >
                                    <AnnouncementDelete id={item.id}/>
                                </MenuItem>
                            </MenuList>
                        </Menu>

                        <div className="flex items-center mb-4">
                            <Avatar
                                src="/img/uno.png"
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
                            <AdminCommentLike AnnounceId={item.id} />
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

export default Announcement;
