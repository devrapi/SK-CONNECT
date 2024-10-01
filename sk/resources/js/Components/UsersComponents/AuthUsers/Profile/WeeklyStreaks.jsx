import React from 'react';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {  FireIcon } from "@heroicons/react/24/solid"; // Import an icon for the reward
import ApiService from '../../../Services/ApiService';
import { StarIcon } from '@heroicons/react/24/solid';
const WeeklyStreaks = ({ userStreak , user_id }) => {
    const [activeStep, setActiveStep] = React.useState(userStreak); // Initialize with user's streak



    React.useEffect(() => {
        setActiveStep(userStreak); // Update activeStep whenever userStreak changes
    }, [userStreak]);

    const isLastStep = activeStep === 6; // Streak is 7 at the 7th step (index 6)

    const claimReward = async () => {
        try {
            const response = await ApiService.post(`claimStreak/${user_id}`);
            // Handle successful response
            alert(response.data.message); // Show success message
            // You may want to update local state or perform other actions here
        } catch (error) {
            // Handle error
            console.error('Error claiming reward:', error);
            // You can check if the error response exists and display it
            if (error.response && error.response.data) {
                alert(error.response.data.message || 'Error claiming reward');
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };


    return (
        <div className="w-full px-4 py-2">
            <Typography variant="h5" className="mb-10">
                Daily Login Streak: {activeStep + 1}/7
            </Typography>
            <Stepper activeStep={activeStep} >
                <Step color='red'>
                    <FireIcon className="w-5 h-5 text-red-600" />
                </Step>
                <Step>
                    <FireIcon className="w-5 h-5 text-red-600" />
                </Step>
                <Step>
                    <FireIcon className="w-5 h-5 text-red-600" />
                </Step>
                <Step>
                    <FireIcon className="w-5 h-5 text-red-600" />
                </Step>
                <Step>
                    <FireIcon className="w-5 h-5 text-red-600" />
                </Step>
                <Step>
                    <FireIcon className="w-5 h-5 text-red-600" />
                </Step>
                <Step>
                   <StarIcon className="w-5 h-5 text-red-600" />
                </Step>
            </Stepper>

            <div className="flex justify-center mt-16">
                {isLastStep && (
                    <Button onClick={claimReward} className="bg-green-500">
                        Claim Reward
                    </Button>
                )}
            </div>
        </div>
    );
};

export default WeeklyStreaks;
