import React from 'react';
import { Button } from '@material-tailwind/react';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ClaimReward = ({ rewardId, userId }) => {
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
        } else {
          // User canceled the claim
          await MySwal.fire({
            title: 'Cancelled',
            text: 'Your reward claim was cancelled.',
            icon: 'info',
            confirmButtonText: 'Okay',
          });
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
    <Button onClick={handleClaim}>Claim Rewards</Button>
  );
}

export default ClaimReward;
