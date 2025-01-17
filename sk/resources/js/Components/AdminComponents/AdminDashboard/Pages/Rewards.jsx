import React from 'react'
import { Input, Textarea, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import ApiService from '../../../Services/ApiService';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Rewards = () => {

    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        category:'' ,
        name: '',
        description: '',
        points: '',
        stocks: ''
      });

    // Handle the image change and create a preview URL
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
            formData.append('category', form.category);
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('points', form.points);
            formData.append('stocks', form.stocks);
            // Append the image if one is selected
            if (imageFile) {
                formData.append('image', imageFile); // Append the actual file
            }

            // Make the API request with FormData
            const response = await ApiService.post('rewards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response) {
                // Show success alert
                await Swal.fire({
                  title: 'Rewards Added successfully!!',
                  text: 'Success!',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                // Reload the page after the alert is closed
                navigate("/admin/dashboard/avail-rewards")
              }

            setForm({
                category: '',
                name: '',
                description: '',
                points: '',
                 stocks: ''
              });

              setImage(null);
              setImageFile(null);

        } catch (error) {
            console.log('Error during event creation:', error.response?.data || error.message);

            if (error.response?.status === 422) {
                setForm({
                    category: '',
                    name: '',
                    description: '',
                    points: '',
                     stocks: ''
                  });
                setErrors(error.response.data.errors);

            } else {
                setErrors({ global: 'An unexpected error occurred during registration.' });
            }
        }
    };

  return (
    <>

<Typography variant="h4" color="blue-gray" className="font-semibold text-green-700 font-custom">
        Rewards Management
    </Typography>
    <div className='flex justify-end'>
    <Link to="/admin/dashboard/avail-rewards">
            <ArrowLeftCircleIcon className='w-12 text-blue-500 h-14 hover hover:text-blue-400'/>
        </Link>
    </div>
    <Card className="max-w-5xl mx-auto mt-10 shadow-lg">
    <CardBody>
      <Typography variant="h4" color="blue-gray" className="mb-6 font-custom font-semibold">
        Create Rewards
      </Typography>
      <form className='font-custom'>
  <div className="grid grid-cols-1">
    {/* Title Field */}
    <div className="flex flex-col mb-4">

         {/* Category Dropdown */}
         <div className="mt-2 mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-inner focus:ring-green-500 focus:border-green-500 sm:text-sm"
          value={form.category || ''}
          onChange={(event) => {
            setForm({ ...form, category: event.target.value });
          }}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Basic">Basic Rewards</option>
          <option value="Classic">Classic Rewards</option>
          <option value="Premium">Premium Rewards</option>
        </select>
        {errors.category && <span className="text-xs text-red-600">{errors.category}</span>}
      </div>


      <div className="mb-4">
        <Input
          type="text"
          label="Reward Name"
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
          label="Reward Description"
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
          <img src={image} alt="Event Preview" className="w-full h-auto rounded-md shadow-inner" />
        </div>
      )}
    </div>
  </div>

  {/* Submit Button */}
  <div className="mt-10">
    <Button
      type="submit"
      color="green"
      className="w-full"
      onClick={
        handleSubmit
      }
    >
      Create Reward
    </Button>
  </div>
</form>

    </CardBody>
  </Card>
    </>
  )
}

export default Rewards
