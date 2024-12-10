import React, { useState } from 'react';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

const ArchivedProfiles = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleArchived = async () => {
    try {
      await ApiService.delete(`profiles/${id}`);
      setOpen(false);
      window.location.reload(); // Reload the page or update the UI as needed
    } catch (error) {
      console.log('Error during profile archive:', error.response?.data || error.message);
    }
  };

  const confirmArchive = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This profile will be archived!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, archive it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      handleArchived(); // Proceed with archiving the profile if confirmed
    }
  };

  return (
    <>
      <ArchiveBoxIcon className="w-6 h-6 text-red-500 cursor-pointer" onClick={confirmArchive} />
    </>
  );
};

export default ArchivedProfiles;
