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
    <Dialog
    open={open}
    handler={handleOpen}
    animate={{
      mount: { scale: 1, y: 0 },
      unmount: { scale: 0.9, y: -100 },
    }}
  >
    <DialogHeader>Its a simple dialog.</DialogHeader>
    <DialogBody>
      The key to more success is to have a lot of pillows. Put it this way,
      it took me twenty five years to get these plants, twenty five years of
      blood sweat and tears, and I&apos;m never giving up, I&apos;m just
      getting started. I&apos;m up to something. Fan luv.
    </DialogBody>
    <DialogFooter>
      <Button
        variant="text"
        color="red"
        onClick={handleOpen}
        className="mr-1"
      >
        <span>Cancel</span>
      </Button>
      <Button variant="gradient" color="green" onClick={handleDelete}>
        <span>Confirm</span>
      </Button>
    </DialogFooter>
  </Dialog>
  )
}

export default deleteEvents
