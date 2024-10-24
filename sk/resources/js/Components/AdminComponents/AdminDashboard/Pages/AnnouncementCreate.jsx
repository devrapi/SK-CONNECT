import React from 'react'
import { Input, Textarea, Button, Card, CardBody, Typography , CardFooter } from "@material-tailwind/react";
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
  <div className="space-y-6 mt-5">
    <Card className="max-w-lg mx-auto shadow-lg">
      <div className="flex justify-center items-center pt-4">
        <Typography variant="h4" className="font-semibold">
          Add Announcement
        </Typography>
      </div>
      <CardBody>
        <form>
          {/* Title Field */}
          <div className="flex flex-col mb-4">
            <div className="mb-4">
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
              {errors.title && (
                <span className="text-xs text-red-600">{errors.title}</span>
              )}
            </div>

            {/* Content Field */}
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
              {errors.content && (
                <span className="text-xs text-red-600">
                  {errors.content}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <CardFooter className="pt-5">
            <Button
              type="submit"
              color="green"
              className="w-full"
              onClick={handleSubmit}
            >
              Create Announcement
            </Button>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  </div>
</>

  )
}

export default AnnouncementCreate
