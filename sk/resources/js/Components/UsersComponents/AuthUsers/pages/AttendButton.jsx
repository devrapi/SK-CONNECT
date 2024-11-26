import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Button } from '@material-tailwind/react';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';

const AttendButton = ({ eventId }) => {
    const { user } = useContext(AppContext);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const fetchPendingEvents = async () => {
            try {
                const response = await ApiService.get(`events/${user.id}/status`);
                const pendingEventIds = response.data.pending_events.map(event => event.event.id);
                setIsPending(pendingEventIds.includes(eventId));
            } catch (error) {
                console.error('Error fetching pending events:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to check your event status. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        };

        fetchPendingEvents();
    }, [eventId, user.id]);

    const handleAttend = async () => {
        try {
            const response = await ApiService.post(`events/${eventId}/${user.id}/attend`);
            await Swal.fire({
                title: 'Success!',
                text: response.data.message || 'You have successfully attended the event.',
                icon: 'success',
                confirmButtonText: 'Okay',
            });
            setIsPending(true);
        } catch (error) {
            let errorMessage = 'An unexpected error occurred. Please try again.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    const confirmAttend = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to attend this event?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Attend',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            handleAttend();
        }
    };

    return (
        <Button
            color={isPending ? 'gray' : 'blue'}
            size="sm"
            className={`rounded-full ${isPending && 'cursor-not-allowed'}`}
            onClick={isPending ? null : confirmAttend}
            disabled={isPending}
        >
            {isPending ? 'Already Registered' : 'Attend Event'}
        </Button>
    );
};

export default AttendButton;
