import React from 'react'
import { TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import ApiService from '../../../Services/ApiService';

const AnnouncementDelete = ({id}) => {

    const handleDelete = async () => {
        try {
          await ApiService.delete(`announcement/${id}`);
          window.location.reload(); // Reload the page or update the UI as needed
        } catch (error) {
          console.log('Error during reward deletion:', error.response?.data || error.message);
        }
      };

      const confirmDelete = async () => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'This Post will be archive!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, archive it',
          cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
          await handleDelete(); // Proceed with deletion if confirmed
        }
      };

  return (
    <div className='flex' onClick={confirmDelete}>
     Archive
    </div>
  )
}

export default AnnouncementDelete
