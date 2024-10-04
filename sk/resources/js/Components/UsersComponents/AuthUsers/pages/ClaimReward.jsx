import React from 'react';
import { Button } from '@material-tailwind/react';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ClaimReward = ({ rewardId, userId }) => {
  const handleClaim = async () => {
    try {
      const response = await ApiService.post(`rewards/claim/${userId}/${rewardId}`);
      console.log(response.data.message);

      if (response) {
      await MySwal.fire({
        title: 'Success!',
        text: response.data.message, // Adjust this based on your API response
        icon: 'success',
        confirmButtonText: 'Cool',
      });

      window.location.reload();

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
