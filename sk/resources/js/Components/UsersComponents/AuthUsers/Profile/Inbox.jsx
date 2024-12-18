import React, { useContext, useEffect, useState } from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
    Button
} from "@material-tailwind/react";
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { AppContext } from '../../../Context/AppContext';
import ApiService from '../../../Services/ApiService';
import moment from 'moment';

const Inbox = () => {
    const { user } = useContext(AppContext);
    const [notifications, setNotifications] = useState([]);

    async function getNotification() {
        try {
            const res = await ApiService.get(`notification/${user.id}`);
            const data = await res.data;
            setNotifications(data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    useEffect(() => {
        getNotification();
    }, []);

    const markAllAsRead = async () => {
        try {
            await ApiService.post(`notification/${user.id}/mark-all-read`);
            getNotification();
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    return (
        <Menu>
            <MenuHandler>
                <div className="relative mr-4">
                    <div className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 ease-in-out">
                        <BellAlertIcon className="w-6 h-6 text-black" />
                    </div>
                    {notifications.some(n => !n.read) && (
                        <span className="absolute top-0 right-0 block h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse" />
                    )}
                </div>
            </MenuHandler>
            <MenuList className="flex flex-col max-w-sm gap-2 overflow-y-auto max-h-64 bg-white shadow-lg rounded-lg border border-gray-300">
                {notifications.length === 0 ? (
                    <Typography variant="small" color="gray" className="text-xs text-center py-4">
                        No new notifications
                    </Typography>
                ) : (
                    <>
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
                            <Typography variant="small" className="text-gray-600">
                                Notifications
                            </Typography>
                            <Button
                                variant="text"
                                size="small"
                                onClick={markAllAsRead}
                                className="text-gray-600 hover:bg-gray-200 transition duration-200"
                            >
                                Mark all as read
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {notifications.map((notification) => (
                                <MenuItem
                                    key={notification.id}
                                    className={`flex items-center gap-4 py-2 pl-4 pr-8 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out ${!notification.read ? 'bg-gray-50' : ''}`}
                                >
                                    <Avatar
                                        variant="circular"
                                        alt="Notification Icon"
                                        src={notification.icon || "/img/uno.png"}
                                        size="sm"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <Typography
                                            variant="small"
                                            className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}
                                        >
                                            {notification.message}
                                        </Typography>
                                        <Typography variant="small" className="text-xs text-gray-500">
                                            {moment(notification.created_at).fromNow()}
                                        </Typography>
                                    </div>
                                </MenuItem>
                            ))}
                        </div>
                    </>
                )}
            </MenuList>
        </Menu>
    );
};

export default Inbox;
