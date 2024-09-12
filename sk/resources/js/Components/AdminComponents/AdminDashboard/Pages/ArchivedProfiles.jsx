import React, { useState } from 'react';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

const ArchivedProfiles = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleArchived = async () => {
    try {
      await ApiService.delete(`profiles/${id}`);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log('Error during profile archive:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <ArchiveBoxIcon className="w-6 h-6 text-red-500 cursor-pointer" onClick={handleOpen} />

      <Dialog open={open} handler={handleOpen} >
        <DialogHeader>Confirm Archive</DialogHeader>
        <DialogBody >
          Are you sure you want to archive this profile?
        </DialogBody>
        <DialogFooter>
          <Button  onClick={handleOpen} className="mr-2" color='blue'>
            Cancel
          </Button>
          <Button  color="red" onClick={handleArchived}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ArchivedProfiles;

