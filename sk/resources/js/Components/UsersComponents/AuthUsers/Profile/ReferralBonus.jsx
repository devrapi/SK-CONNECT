import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input
} from "@material-tailwind/react";
import { XCircleIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';

const ReferralBonus = ({ user_id }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState({
        referal_code: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');



    const handleOpen = () => setOpen((cur) => !cur);

    const handleClaim = async () => {
        try {
            const response = await ApiService.post(`/referral/${user_id}`, input);

            if (response) {

                setOpen(false);
                // Show success alert
                await Swal.fire({
                  title: 'You Earned 25 points',
                  text: 'for referral bonus',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                // Reload the page after the alert is closed
                window.location.reload();
              }

            setMessage(response.data.message || 'Referral bonus claimed successfully.')

            setErrors({});
        } catch (error) {
            console.log('Error during referral bonus claim:', error.response?.data || error.message);
            const responseErrors = error.response?.data.errors || {};
            setErrors({
                general: responseErrors.general || 'An unexpected error occurred.',
                referal_code: responseErrors.referal_code || [],
            });
            setMessage(''); // Clear success message on error
        }
    };




    return (
        <>
            <Button onClick={handleOpen} color='teal'>Referral Bonus</Button>
            <Dialog size="xs" open={open} handler={handleOpen}>


                <DialogHeader className="justify-between">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Referral Bonus
                        </Typography>
                        <Typography color="gray" variant="paragraph">
                            Enter a referral code from your friends
                        </Typography>
                    </div>
                    <XCircleIcon
                        onClick={handleOpen}
                        className="w-10 h-10 text-gray-600 cursor-pointer"
                    />
                </DialogHeader>
                <DialogBody>
                    <div className="mb-6">
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="py-3 font-semibold uppercase opacity-70"
                        >
                            Enter Referral Code
                        </Typography>

                        <Input
                            variant="standard"
                            label="Referral Code"
                            onChange={(event) =>
                                setInput({ ...input, referal_code: event.target.value })
                            }
                        />
                    </div>
                    {message && (
                        <Typography variant="small" color="green" className="mt-2">
                            {message}
                        </Typography>
                    )}
                        {errors.general && (
                            <Typography variant="small" color="red" className="mt-1">
                                {errors.general}
                            </Typography>
                        )}
                </DialogBody>
                <DialogFooter className="justify-end gap-2">
                    <Button size="sm" color="blue" onClick={handleClaim}>
                        Claim Referral Bonus
                    </Button>
                </DialogFooter>
            </Dialog>

        </>
    );
};

export default ReferralBonus;
