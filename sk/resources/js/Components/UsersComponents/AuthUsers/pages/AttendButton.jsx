import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Button } from '@material-tailwind/react'
import ApiService from '../../../Services/ApiService';

const AttendButton = ({eventId}) => {

    const { user } = useContext(AppContext);

    const handleAttend = async () => {
        try {
          const response = await ApiService.post(`events/${eventId}/${user.id}/attend`);
          alert(response.message);
        } catch (error) {
          alert('Error attending event');
        }
      };

  return (
    <Button color="blue" size="sm" className="rounded-full" onClick={handleAttend} >
    Attend Event
    </Button>
  )
}

export default AttendButton
