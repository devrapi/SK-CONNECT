import React from 'react'
import { useState } from 'react';
import ApiService from '../../../Services/ApiService';
import { CheckCircleIcon  } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
const VerifyTicket = ({id}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleVerify = async () => {
        const response = await ApiService.put(`rewards/claim/verify/${id}`);
        setOpen(false)
        window.location.reload();
    }
  return (
    <div>
         <Typography variant="small" color="blue" className="font-medium cursor-pointer" onClick={handleOpen}  >
    <CheckCircleIcon className="w-6 h-6" />
    verify
    </Typography>

    <Dialog open={open} handler={handleOpen} >
        <DialogHeader>Confirm Archive</DialogHeader>
        <DialogBody >
          Are you sure you want to Verify this Ticket?
        </DialogBody>
        <DialogFooter>
          <Button  onClick={handleOpen} className="mr-2" color='blue'>
            Cancel
          </Button>
          <Button  color="red" onClick={handleVerify}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
        </div>
  )
}

export default VerifyTicket
