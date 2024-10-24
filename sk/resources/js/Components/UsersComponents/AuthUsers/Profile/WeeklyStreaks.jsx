import React from 'react';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { FireIcon, StarIcon } from "@heroicons/react/24/solid"; // Import icons for rewards
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';

const WeeklyStreaks = ({ userStreak, user_id }) => {
    const [activeStep, setActiveStep] = React.useState(userStreak); // Initialize with user's streak

    React.useEffect(() => {
        setActiveStep(userStreak); // Update activeStep whenever userStreak changes
    }, [userStreak]);

    const isLastStep = activeStep === 6; // Streak is 7 at the 7th step (index 6)

    const claimReward = async () => {
        try {
            const response = await ApiService.post(`claimStreak/${user_id}`);

            if (response) {
                // Show success alert
                await Swal.fire({
                    title: '<strong>Streak Claimed!!</strong>',
                    html: (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <p>You Earned 100 Points!</p>
                        </div>
                    ),
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });

                // Reload the page after the alert is closed
                window.location.reload();
              }

        } catch (error) {
            // Handle error
            console.error('Error claiming reward:', error);
            if (error.response && error.response.data) {
                alert(error.response.data.message || 'Error claiming reward');
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="w-full px-4 py-2">
            <Typography variant="h5" className="mb-4 text-center">
                Daily Login Streak: {activeStep + 1}/7
            </Typography>
            <Stepper activeStep={activeStep} className="mb-4">
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

            <div className="flex justify-center mt-6">
                {isLastStep && (
                    <Button onClick={claimReward} className="transition duration-200 bg-green-500 hover:bg-green-600">
                        Claim Reward
                    </Button>
                )}
            </div>
        </div>
    );
};

export default WeeklyStreaks;
