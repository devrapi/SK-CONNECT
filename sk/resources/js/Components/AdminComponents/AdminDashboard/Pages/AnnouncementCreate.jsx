import React from 'react'
import { Input, Textarea, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Swal from 'sweetalert2';
import ApiService from '../../../Services/ApiService';
const AnnouncementCreate = () => {

    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        title: '',
        content: '',
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a FormData object to send both text and file data
            const formData = new FormData();

            // Append form fields
            formData.append('title', form.title);
            formData.append('content', form.content);


            // Make the API request with FormData
            const response = await ApiService.post('announcement', formData);
            if (response) {
                // Show success alert
                await Swal.fire({
                  title: 'Announcement Created!',
                  text: 'Success!',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                // Reload the page after the alert is closed
                window.location.reload();
              }

            setForm({
                title: '',
                content: '',
              });


        } catch (error) {
            console.log('Error during event creation:', error.response?.data || error.message);

            if (error.response?.status === 422) {
                setForm({
                    title: '',
                    content: '',

                  });
                setErrors(error.response.data.errors);

            } else {
                setErrors({ global: 'An unexpected error occurred during registration.' });
            }
        }
    };
  return (
    <>

        <Card className="w-full shadow-lg">
        <Typography variant="h4" className="mt-5 mb-5 font-semibold text-center">
            Add Announcement
          </Typography>
        <CardBody>
          <form>
            <div className="grid grid-cols-1 ">
              {/* Title Field */}
              <div className="flex flex-col mb-4">
                <div className='mb-4'>
                <Input
                  type="text"
                  label="Title"
                  size="lg"
                  className="w-full shadow-inner"
                  value={form.title}
                  onChange={(event) => {
                    setForm({ ...form, title: event.target.value });
                  }}
                />
                {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
                </div>

                <div className="mt-5">
                <Textarea
                  label="Content"
                  size="lg"
                  className="w-full shadow-inner"
                  value={form.content}
                  onChange={(event) => {
                    setForm({ ...form, content: event.target.value });
                  }}
                />
                {errors.content && <span className="text-xs text-red-600">{errors.content}</span>}
              </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='mt-10'>
            <Button type="submit" color="green" className="w-full" onClick={handleSubmit}>
              Create Announcment
            </Button>
            </div>

          </form>
        </CardBody>
      </Card>
      </>
  )
}

export default AnnouncementCreate
