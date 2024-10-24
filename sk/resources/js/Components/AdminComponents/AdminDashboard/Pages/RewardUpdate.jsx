import React, { useEffect } from 'react'
import { Input, Textarea, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import ApiService from '../../../Services/ApiService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
const RewardUpdate = () => {

    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        name: '',
        description: '',
        points: '',
        stocks: ''

      });


      const gerRewards = async () => {
        try {
          const response = await ApiService.get(`rewards/${id}`);
          const data = response.data;

          setForm({
            name: data.name,
            description: data.description,
            points: data.points,
            stocks:data.stocks
          });

          setImage(data.image_path); // Assuming you're dealing with an image path
        } catch (error) {
          setErrors({ ...errors, fetchError: 'Failed to fetch event data.' });
        }
      };

      useEffect(() => {
        gerRewards();
      }, [id]);

      // Handle the image change and create a preview URL
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Create a preview URL
            setImageFile(file);

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            // Append form fields
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('points', form.points);
            formData.append('stocks', form.stocks);

        // Append the image if one is selected
        if (imageFile) {
            formData.append('image', imageFile);
            console.log('Appended image file:', imageFile);
        } else {
            console.log('No image file to append.');
        }

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await ApiService.post(`rewards/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',

                },
            })

            if (response) {
                // Show success alert
                await Swal.fire({
                  title: 'Rewards Updated successfully!!',
                  text: 'Success!',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                // Reload the page after the alert is closed
                window.location.reload();
              }


            console.log('Update successful:', response.data);

        } catch (error) {
            console.log('Error during event update:', error.response?.data || error.message);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ global: 'An unexpected error occurred during updating.' });
            }
        }
    };

  return (
    <>
        <Typography variant="h4" color="blue-gray" className="font-semibold">
        Rewards Update
    </Typography>

    <div className='flex justify-end'>
    <Link to="/admin/dashboard/avail-rewards">
            <ArrowLeftCircleIcon className='w-12 text-blue-500 h-14 hover hover:text-blue-400'/>
        </Link>
    </div>

    <Card className="max-w-5xl mx-auto mt-10 shadow-lg">
    <CardBody>
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Update Rewards
      </Typography>

      <form>
        <div className="grid grid-cols-1 ">

          <div className="flex flex-col mb-4">
            <div className='mb-4'>
            <Input
              type="text"
              label="Event name"
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
            <Textarea
              label="Event Description"
              size="lg"
              className="w-full shadow-inner"
              value={form.description}
              onChange={(event) => {
                setForm({ ...form, description: event.target.value });
              }}
            />
            {errors.description && <span className="text-xs text-red-600">{errors.description}</span>}
          </div>

          <div className="mt-2 mb-4">
            <Input
              type="number"
              label="Points"
              size="lg"
              className="w-full shadow-inner"
              value={form.points}
              onChange={(event) => {
                setForm({ ...form, points: event.target.value });
              }}
            />
            {errors.points && <span className="text-xs text-red-600">{errors.points}</span>}
          </div>
          <div className="mt-2 mb-4">
            <Input
              type="number"
              label="Stocks"
              size="lg"
              className="w-full shadow-inner"
              value={form.stocks}
              onChange={(event) => {
                setForm({ ...form, stocks: event.target.value });
              }}
            />
            {errors.stocks && <span className="text-xs text-red-600">{errors.stocks}</span>}
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
                className="w-full h-auto rounded-md shadow-inner"
                />
            </div>
                )}
          </div>
        </div>

        {/* Submit Button */}
        <div className='mt-10'>
        <Button type="submit" color="green" className="w-full" onClick={handleSubmit}>
          Update Rewards
        </Button>
        </div>

      </form>
    </CardBody>
  </Card>
    </>
  )
}

export default RewardUpdate
