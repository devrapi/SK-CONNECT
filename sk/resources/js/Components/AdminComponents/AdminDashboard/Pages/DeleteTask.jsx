import React from 'react';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const DeleteTask = ({id}) => {

    const handleDelete = async () => {
        try {
          await ApiService.delete(`task/${id}`);
          window.location.reload(); // Reload the page or update the UI as needed
        } catch (error) {
          console.log('Error during reward deletion:', error.response?.data || error.message);
        }
      };


      const confirmDelete = async () => {

        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'This reward will be permanently deleted!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
          await handleDelete(); // Proceed with deletion if confirmed
        }
      };
  return (
    <>
         <ArchiveBoxIcon className="w-8 h-8 text-red-500 cursor-pointer" onClick={confirmDelete} />

    </>
  )
}

export default DeleteTask
