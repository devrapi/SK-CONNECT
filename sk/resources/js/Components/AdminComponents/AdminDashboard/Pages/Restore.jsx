import React from 'react'
import {  Typography  } from "@material-tailwind/react";
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import ApiService from '../../../Services/ApiService';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { useState } from 'react';

const Restore = ({id}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

const handleRestore = async() => {
    try {
        const res = await ApiService.patch(`profiles/restore/${id}`);
        setOpen(false)
        window.location.reload();
    } catch (error) {
        console.log('Error during restoration :', error.response?.data || error.message);
    }
}


  return (
    <>

          <Typography variant="small" color="blue" className="font-medium cursor-pointer" onClick={handleOpen}  >
    <ArrowPathIcon className="w-6 h-6" />
    restore
    </Typography>



<Dialog open={open} handler={handleOpen}>
<DialogHeader>Confirm Archive</DialogHeader>
<DialogBody >
  Are you sure you want to archive this profile?
</DialogBody>
<DialogFooter>
  <Button  onClick={handleOpen} className="mr-2">
    Cancel
  </Button>
  <Button  color="red"  onClick={handleRestore}>
    Confirm
  </Button>
</DialogFooter>
</Dialog>
</>
  )
}

export default Restore
