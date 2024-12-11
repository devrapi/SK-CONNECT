import React from 'react';
import { Button } from '@material-tailwind/react';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ClaimReward = ({ rewardId, userId, rewardPoints, userPoints }) => {

    const filterpoints  = rewardPoints <= userPoints;

    const handleClaim = async () => {
        try {
          // Show confirmation dialog
          const confirmationResult = await MySwal.fire({
            title: 'Are you sure?',
            text: 'Do you want to claim this reward?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, claim it!',
            cancelButtonText: 'No, cancel',
          });

          if (confirmationResult.isConfirmed) {
            // Proceed with claiming the reward
            const response = await ApiService.post(`rewards/claim/${userId}/${rewardId}`);

            if (response) {
              // Show success message
              await MySwal.fire({
                title: 'Success!',
                text: response.data.message, // Message from API
                icon: 'success',
                confirmButtonText: 'Cool',
              });

              // Optionally reload the page or update the state
              window.location.reload();
            }
          }
        } catch (error) {
          // Extract error message from the API response
          const errorMessage =
            error.response?.data?.error || // API error message
            error.message ||               // Default error message
            'An unexpected error occurred'; // Fallback error message

          // Show error message
          await MySwal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      };


  return (
    <>
  {
    filterpoints ? (
        <Button
            onClick={handleClaim}
            color="purple" // Use green for active Claim Rewards button
            className="px-4 py-2 font-semibold text-white transition-transform duration-200 rounded-lg shadow-md bg-gradient-to-r from-red-500 to-red-500 hover:scale-105"
            >

            Claim Now
        </Button>
    ) : (
        <Button
            disabled
            color="red"
            variant='outline'// Use gray to indicate the button is disabled
            className="opacity-50 cursor-not-allowed" // Make it clear that the button is disabled
        >
            Not Enough Points
        </Button>
    )
}


    </>

  );
}

export default ClaimReward;
