import React from 'react';
import { Stepper, Step, Button, Typography, Tooltip } from "@material-tailwind/react";
import { FireIcon, StarIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';

const WeeklyStreaks = ({ userStreak, user_id }) => {
    const [activeStep, setActiveStep] = React.useState(userStreak);

    React.useEffect(() => {
        setActiveStep(Math.min(userStreak, 6));
    }, [userStreak]);

    const isLastStep = activeStep === 6;

    const claimReward = async () => {
        try {
            const response = await ApiService.post(`claimStreak/${user_id}`);
            if (response) {
                await Swal.fire({
                    title: 'Congratulations!',
                    text: 'You have claimed your weekly streak reward!',
                    icon: 'success',
                    confirmButtonText: 'Awesome!',
                });
                window.location.reload();
            }
        } catch (error) {
            console.error('Error claiming reward:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'An unexpected error occurred.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <Typography variant="h5" className="mb-6 text-center text-blue-600">
                Weekly Login Streak: <span className="font-bold">{activeStep + 1}/7</span>
            </Typography>

            {/* Enhanced Stepper with Tooltips */}
            <Stepper activeStep={activeStep} className="mb-4">
                {Array.from({ length: 7 }).map((_, index) => (
                    <Step key={index} color={index <= activeStep ? 'green' : 'gray'}>
                        <Tooltip
                            content={index < 6 ? `Day ${index + 1}` : 'Final Reward'}
                            className="text-sm bg-blue-600"
                        >
                            {index < 6 ? (
                                <FireIcon
                                    className={`w-6 h-6 ${
                                        index <= activeStep ? 'text-green-500' : 'text-gray-400'
                                    }`}
                                />
                            ) : (
                                <StarIcon
                                    className={`w-6 h-6 ${
                                        isLastStep ? 'text-yellow-500 animate-pulse' : 'text-gray-400'
                                    }`}
                                />
                            )}
                        </Tooltip>
                    </Step>
                ))}
            </Stepper>

            {/* Progress Bar */}
            <div className="relative w-full h-2 mb-6 bg-gray-200 rounded-full">
                <div
                    className="absolute top-0 left-0 h-2 transition-all bg-green-500 rounded-full"
                    style={{ width: `${((activeStep + 1) / 7) * 100}%` }}
                />
            </div>

            {/* Claim Reward Button */}
            <div className="flex justify-center">
                {isLastStep ? (
                    <Button
                        onClick={claimReward}
                        className="transition duration-300 bg-green-500 hover:bg-green-600"
                        fullWidth
                    >
                        Claim Reward
                    </Button>
                ) : (
                    <Typography
                        variant="small"
                        className="text-gray-500"
                    >
                        Log in daily to complete your streak!
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default WeeklyStreaks;
