import React from 'react';
import { Button } from '@material-tailwind/react';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ClaimReward = ({ rewardId, userId, rewardPoints, userPoints, rewardStocks }) => {
    const canClaimReward = rewardPoints <= userPoints && rewardStocks > 0;

    const handleClaim = async () => {
        try {
            const confirmationResult = await MySwal.fire({
                title: 'Are you sure?',
                text: 'Do you want to claim this reward?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, claim it!',
                cancelButtonText: 'No, cancel',
            });

            if (confirmationResult.isConfirmed) {
                const response = await ApiService.post(`rewards/claim/${userId}/${rewardId}`);

                if (response) {
                    await MySwal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                    window.location.reload();
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
            await MySwal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <div className="flex justify-center mt-4">
            {rewardStocks === 0 ? (
                <Button
                    disabled
                    className="px-6 py-3 font-semibold text-gray-500 bg-gray-200 rounded-lg cursor-not-allowed"
                >
                    Out of Stock
                </Button>
            ) : canClaimReward ? (
                <Button
                    onClick={handleClaim}
                    className="px-6 py-3 font-semibold text-white transition-transform duration-300 rounded-lg shadow-lg bg-green-700"
                >
                    Claim Now
                </Button>
            ) : (
                <Button
                    disabled
                    className="px-6 py-3 font-semibold text-gray-500 bg-gray-200 rounded-lg cursor-not-allowed"
                >
                    Not Enough Points
                </Button>
            )}
        </div>
    );
};

export default ClaimReward;
