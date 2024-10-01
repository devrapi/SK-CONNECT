import React, { useState } from 'react';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

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

      {/* Remove the Dialog since we're using SweetAlert2 */}
      {/* <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Confirm Archive</DialogHeader>
        <DialogBody>
          Are you sure you want to archive this profile?
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleOpen} className="mr-2" color='blue'>
            Cancel
          </Button>
          <Button color="red" onClick={handleArchived}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog> */}
    </>
  );
};

export default ArchivedProfiles;
