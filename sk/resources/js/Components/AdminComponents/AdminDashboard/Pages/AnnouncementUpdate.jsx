import React from 'react'
import { Input, Textarea, Button, Card, CardBody, Typography , CardFooter } from "@material-tailwind/react";
import { useState } from "react";
import Swal from 'sweetalert2';
import ApiService from '../../../Services/ApiService';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AnnouncementUpdate = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        title: '',
        content: '',
      });


      const getAnnouncement = async () => {
        try {
          const response = await ApiService.get(`announcement/${id}`);
          const data = response.data;

          setForm({
            title: data.title,
            content: data.content,
          });
          setImage(data.image_path);

        } catch (error) {
          setErrors({ ...errors, fetchError: 'Failed to fetch event data.' });
        }
      };

      useEffect(() => {
        getAnnouncement();
      }, [id]);




      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Create a preview URL
            setImageFile(file); // Store the actual file for submission
        }
    };



      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a FormData object to send both text and file data
            const formData = new FormData();

            // Append form fields
            formData.append('title', form.title);
            formData.append('content', form.content);

            if (imageFile) {
                formData.append('image_path', imageFile); // Append the actual file
            }

            // Make the API request with FormData
            const response = await ApiService.post(`announcement/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',

                },
            })
            if (response) {
                // Show success alert
                await Swal.fire({
                  title: 'Announcement Updated!',
                  text: 'Success!',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                navigate('/admin/dashboard/announcement');

                // Reload the page after the alert is closed
                window.location.reload();
              }

            setForm({
                title: '',
                content: '',
              });


        } catch (error) {
            console.log('Error during announcement creation:', error.response?.data || error.message);

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
    <div className="space-y-6 mt-5 font-custom">
      <Card className="max-w-lg mx-auto shadow-lg">
        <div className="flex justify-center items-center pt-4">
          <Typography variant="h4" className="font-semibold font-custom">
            Update Announcement
          </Typography>
        </div>
        <CardBody>
          <form className='font-custom'>
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
              <div className="col-span-2 mt-2 mb-4">
            <Input
              type="file"
              label="Upload Image"
              accept="image/*"
              onChange={handleImageChange}
              size="lg"
              className="w-full mt-2 mb-4 shadow-inner"
            />
          {image && (
            <div className="mt-4">
                <Typography className="mb-2">Preview:</Typography>
                <img
                src={image.startsWith('blob') ? image : `/storage/${image}`}
                alt="Event Preview"
                className="w-full h-auto rounded-md shadow-inner"
                />
            </div>
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
                Update Announcement
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>
  </>
  )
}

export default AnnouncementUpdate
