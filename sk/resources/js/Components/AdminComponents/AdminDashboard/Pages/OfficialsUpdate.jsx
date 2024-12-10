import React from 'react'
import { Input, Button, Card, CardBody, Typography ,Select, Option}
 from "@material-tailwind/react";
 import { useState } from "react";
 import ApiService from '../../../Services/ApiService';
 import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
 import Swal from 'sweetalert2';
 import { Link } from 'react-router-dom';
 import { useParams } from 'react-router-dom';
 import { useEffect } from 'react';

const OfficialsUpdate = () => {
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        name: '',
        title: '',
      });

      const getOfficials = async () => {
        try {
          const response = await ApiService.get(`officials/${id}`);
          const data = response.data;

          setForm({
            name: data.name,
            title: data.title,

          });

          setImage(data.image_path); // Assuming you're dealing with an image path
        } catch (error) {
          setErrors({ ...errors, fetchError: 'Failed to fetch event data.' });
        }
      };

      useEffect(() => {
        getOfficials();
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
            formData.append('name', form.name);
            formData.append('title', form.title);

            if (imageFile) {
                formData.append('image_path', imageFile); // Append the actual file
            }

            // Make the API request with FormData
            const response = await ApiService.post(`officials/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response) {
                // Show success alert
                await Swal.fire({
                  title: 'Sk officials Update successfully!!',
                  text: 'Success!',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                // Reload the page after the alert is closed
                window.location.reload();
              }

            setForm({
                name: '',
                title: '',

              });

              setImage(null);
              setImageFile(null);

        } catch (error) {
            console.log('Error during update officials:', error.response?.data || error.message);

            if (error.response?.status === 422) {
                setForm({
                    name: '',
                    title: '',

                  });
                setErrors(error.response.data.errors);

            } else {
                setErrors({ global: 'An unexpected error occurred during registration.' });
            }
        }
    };

  return (
    <>
    <Typography variant="h4" color="blue-gray" className="font-semibold">
        Update Sk Officials
    </Typography>
    {/* <div className='flex justify-end'>
    <Link to="/admin/dashboard/avail-rewards">
            <ArrowLeftCircleIcon className='w-12 text-blue-500 h-14 hover hover:text-blue-400'/>
        </Link>
    </div> */}
    <Card className="max-w-5xl mx-auto mt-10 shadow-lg">
    <CardBody>
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Update Officials
      </Typography>
      <form>
        <div className="grid grid-cols-1 ">
          {/* Title Field */}
          <div className="flex flex-col mb-4">
            <div className='mb-4'>
            <Input
              type="text"
              label="Sk Officials Name"
              size="lg"
              className="w-full shadow-inner"
              value={form.name}
              onChange={(event) => {
                setForm({ ...form, name: event.target.value });
              }}
            />
            {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
            </div>

            <div className="mt-5 mb-4">
                <Select
                    label="title"
                    size="lg"
                    className="w-full shadow-inner"
                    value={form.title}
                    onChange={(value) => {
                    setForm({ ...form, title: value });
                    }}
                >
                    <Option value="SK Chairman">SK Chairman</Option>
                    <Option value="SK Kagawad">SK Kagawad</Option>
                    <Option value="SK Treasurer">SK Treasurer</Option>
                    <Option value="SK Secretary">SK Secretary</Option>
                </Select>
                {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
            </div>
          </div>


          {/* Image Upload Field */}
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
                  className="w-full h-auto rounded-md shadow-inner" />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className='mt-10'>
        <Button type="submit" color="green" className="w-full" onClick={handleSubmit}>
          Update Officials
        </Button>
        </div>

      </form>
    </CardBody>
  </Card>
    </>
  )
}

export default OfficialsUpdate
