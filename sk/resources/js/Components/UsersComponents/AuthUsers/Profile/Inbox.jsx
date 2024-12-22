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
                <div className="relative mr-4 cursor-pointer">
                    <div className="p-2 transition duration-200 ease-in-out bg-gray-200 rounded-full shadow-sm hover:bg-gray-300">
                        <BellAlertIcon className="w-6 h-6 text-black" />
                    </div>
                    {notifications.some(n => !n.read) && (
                        <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full animate-bounce">
                            {notifications.filter(n => !n.read).length}
                        </span>
                    )}
                </div>
            </MenuHandler>
            <MenuList
                className="absolute right-0 z-50 flex flex-col max-w-sm gap-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl top-full max-h-72 md:max-w-md md:max-h-80 lg:max-h-96"
                style={{ position: 'absolute' }} // Ensures the dropdown does not affect layout flow
            >
                {notifications.length === 0 ? (
                    <div className="py-4">
                        <Typography variant="small" color="gray" className="text-xs text-center">
                            No new notifications
                        </Typography>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 rounded-t-lg bg-gray-50">
                            <Typography variant="small" className="font-medium text-gray-700">
                                Notifications
                            </Typography>
                            <Button
                                variant="text"
                                size="small"
                                onClick={markAllAsRead}
                                className="text-blue-600 transition duration-200 hover:text-blue-800 hover:bg-blue-50"
                            >
                                Mark all as read
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2 px-2">
                            {notifications.map((notification) => (
                                <MenuItem
                                    key={notification.id}
                                    className={`flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out ${
                                        !notification.read ? 'bg-gray-50 shadow-sm' : ''
                                    }`}
                                >
                                    <Avatar
                                        variant="circular"
                                        alt="Notification Icon"
                                        src={notification.icon || "/img/uno.png"}
                                        size="sm"
                                        className="shadow-md"
                                    />
                                  <div className="flex flex-col w-full gap-1">
                                        <Typography
                                            variant="small"
                                            className={`text-sm line-clamp-3 ${
                                                !notification.read ? 'font-semibold text-gray-800' : 'text-gray-600'
                                            }`}
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
