import React from 'react';
import { useState } from 'react';
import ApiService from '../../../Services/ApiService';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const VerifyTicket = ({ id }) => {
  const handleVerify = async () => {
    try {
      const response = await ApiService.put(`rewards/claim/verify/${id}`);
      console.log(response.data.message); // Log success message if needed
      window.location.reload(); // Reload the page or update the UI as needed
    } catch (error) {
      console.log('Error during ticket verification:', error.response?.data || error.message);
    }
  };

  const confirmVerify = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This ticket will be verified!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, verify it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await handleVerify(); // Proceed with verification if confirmed
    }
  };

  return (
    <div className='flex cursor-pointer' onClick={confirmVerify}>
      <CheckCircleIcon className="w-6 h-6 mr-1 text-red-600" />
      <Typography variant="small" color="red" className="font-medium cursor-pointer" >
        Verify
      </Typography>
    </div>
  );
};

export default VerifyTicket;
