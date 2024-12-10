import React from 'react'
import { TrashIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const SkOfficialsDelete = ({id}) => {


    const handleDelete = async () => {
        try {
          await ApiService.delete(`officials/${id}`);
          window.location.reload(); // Reload the page or update the UI as needed
        } catch (error) {
          console.log('Error during reward deletion:', error.response?.data || error.message);
        }
      };
      const confirmDelete = async () => {
        const result = await MySwal.fire({
          title: 'Are you sure?',
          text: 'This Sk Official will be permanently deleted!',
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
    <div className='flex' onClick={confirmDelete}>
    <TrashIcon className="w-4 h-4 mr-2" /> Delete Sk Officials
    </div>
  )
}

export default SkOfficialsDelete
