import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Button } from '@material-tailwind/react';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';

const AttendButton = ({ eventId }) => {
    const { user } = useContext(AppContext);
    const [status, setStatus] = useState(null); // null, 'pending', or 'verified'
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchEventStatus = async () => {
            setLoading(true);
            try {
                const response = await ApiService.get(`events/${user.id}/status`);
                const { pending_events, verified_events } = response.data;

                const isPending = pending_events.some(event => event.event.id === eventId);
                const isVerified = verified_events.some(event => event.event.id === eventId);

                if (isVerified) {
                    setStatus('verified');
                } else if (isPending) {
                    setStatus('pending');
                } else {
                    setStatus(null);
                }
            } catch (error) {
                console.error('Error fetching event status:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to check your event status. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchEventStatus();
    }, [eventId, user.id]);

    const handleAttend = async () => {
        setLoading(true);
        try {
            const response = await ApiService.post(`events/${eventId}/${user.id}/attend`);
            await Swal.fire({
                title: 'Success!',
                text: response.data.message || 'You have successfully attended the event.',
                icon: 'success',
                confirmButtonText: 'Okay',
            });
            setStatus('pending');
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
        } finally {
            setLoading(false);
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
        className={`rounded-full text-white ${
            status === 'pending' || status === 'verified'
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-700 hover:bg-green-800'
        } ${loading ? 'cursor-not-allowed' : ''}`}
        size="sm"
        onClick={!status && !loading ? confirmAttend : null}
        disabled={status !== null || loading}
    >
        {loading
            ? 'Loading...'
            : status === 'verified'
            ? 'Already Attended'
            : status === 'pending'
            ? 'Already Registered'
            : 'Attend Event'}
    </Button>

    );
};

export default AttendButton;
