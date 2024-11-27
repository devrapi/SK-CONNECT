import React, { useContext } from 'react';
import {
    Card,
    IconButton,
    CardFooter,
    Typography,
    Avatar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import moment from 'moment';
import {
    GlobeAsiaAustraliaIcon,
    EllipsisHorizontalIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/solid';
import AdminCommentLike from './AdminCommentLike';
import AnnouncementCreate from './AnnouncementCreate';
import { Link } from 'react-router-dom';
import AnnouncementDelete from './AnnouncementDelete';

const Announcement = () => {
    const { announcement } = useContext(AppContext);

    return (
        <>
            <div className="container mx-auto p-4">
                <Typography variant="h4" color="blue-gray" className="font-semibold text-center mb-6">
                    Announcement Dashboard
                </Typography>

                <div className="flex justify-center mb-6">
                    <AnnouncementCreate />
                </div>

                <div className="space-y-6">
                    {announcement.map((item) => (
                        <Card key={item.id} className="max-w-xl mx-auto p-4 rounded-lg shadow-md transition-all hover:shadow-lg">
                            <Menu>
                                <MenuHandler>
                                    <div className="absolute top-4 right-4 cursor-pointer">
                                        <EllipsisHorizontalIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" />
                                    </div>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>
                                        <Link to={`/admin/dashboard/announcement/update/${item.id}`}>
                                            <div className="flex items-center gap-2">
                                                <PencilIcon className="w-5 h-5 text-blue-500" />
                                                <span>Edit Post</span>
                                            </div>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <div className="flex items-center gap-2">
                                            <TrashIcon className="w-5 h-5 text-red-500" />
                                            <AnnouncementDelete id={item.id} />
                                        </div>
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
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="font-medium">
                                        Kabataan ng Uno
                                    </Typography>
                                    <Typography variant="small" className="text-gray-500 text-sm">
                                        <div className="flex items-center gap-1">
                                            {moment(item.created_at).fromNow()}
                                            <GlobeAsiaAustraliaIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </Typography>
                                </div>
                            </div>

                            <div className="px-4 text-left">
                                <Typography variant="h5" color="blue-gray" className="font-bold mb-2">
                                    {item.title}
                                </Typography>
                                <Typography color="gray" className="mb-4 text-sm leading-relaxed">
                                    {item.content}
                                </Typography>
                                <hr />
                                <AdminCommentLike AnnounceId={item.id} />
                            </div>

                            <CardFooter className="pt-4">
                                <Typography variant="small" color="gray" className="text-xs">
                                    Posted by Admin
                                </Typography>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Announcement;
