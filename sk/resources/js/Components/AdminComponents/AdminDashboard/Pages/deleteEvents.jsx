import React from 'react';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Button } from "@material-tailwind/react";

const MySwal = withReactContent(Swal);

const DeleteEvents = ({ event_id  }) => {
  const handleDelete = async () => {
    try {
      const response = await ApiService.delete(`events/${event_id}`);
      console.log(response.data.message); // Log success message if needed
      // Reload the page or update the UI as needed
      window.location.reload();
    } catch (error) {
      console.log('Error during events delete:', error.response?.data || error.message);
    }
  };

  const confirmDelete = async () => {



    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, archive it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await handleDelete();
    }
  };

  return (
    <div className='flex' onClick={confirmDelete}>
    <TrashIcon className="w-4 h-4 mr-2" /> Archive
    </div>
  );
};

export default DeleteEvents;
