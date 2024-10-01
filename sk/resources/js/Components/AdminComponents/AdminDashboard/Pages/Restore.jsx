import React, { useState } from 'react';
import { Typography } from "@material-tailwind/react";
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Restore = ({ id }) => {
  const handleRestore = async () => {
    try {
      const res = await ApiService.patch(`profiles/restore/${id}`);
      console.log(res.data.message); // Log success message if needed
      window.location.reload(); // Reload the page or update the UI as needed
    } catch (error) {
      console.log('Error during restoration:', error.response?.data || error.message);
    }
  };

  const confirmRestore = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This profile will be restored!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await handleRestore(); // Proceed with restoring the profile if confirmed
    }
  };

  return (
    <>
      <Typography variant="small" color="blue" className="font-medium cursor-pointer" onClick={confirmRestore}>
        <ArrowPathIcon className="w-6 h-6" />
        restore
      </Typography>
    </>
  );
};

export default Restore;
