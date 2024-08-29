import React from 'react'
import ApiService from '../../../Services/ApiService'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
const deleteEvents = ({event_id ,handleOpen , open}) => {



    const handleDelete = async () => {
        try {
            const response = ApiService.delete(`events/${event_id}`)
            window.location.reload();
        } catch (error) {
            console.log('Error during events delete:', error.response?.data || error.message);
        }
    }

  return (
    <Dialog open={open} handler={handleOpen}>

    <DialogHeader>Confirm Archive</DialogHeader>
<DialogBody >
  Are you sure you want to delete this event?
</DialogBody>
<DialogFooter>
  <Button  onClick={handleOpen} className="mr-2">
    Cancel
  </Button>
  <Button  color="red"  onClick={handleDelete}>
    Confirm
  </Button>
</DialogFooter>
</Dialog>
  )
}

export default deleteEvents
