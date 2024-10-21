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
          console.log(response.data.message);

          if (response) {
            await MySwal.fire({
              title: 'Success!',
              text: response.data.message, // Adjust this based on your API response
              icon: 'success',
              confirmButtonText: 'Cool',
            });

            // Optionally reload the page or update the state
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('Error claiming reward:', error);
        await MySwal.fire({
          title: 'Error!',
          text: 'Not enough points',
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
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            >

            Claim Now
        </Button>
    ) : (
        <Button
            disabled
            color="gray" // Use gray to indicate the button is disabled
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
