import React from 'react'
import { Input, Textarea, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import ApiService from '../../../Services/ApiService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
const Gamification = () => {

    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        name: '',
        description: '',
        points: ''
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a FormData object to send both text and file data
            const formData = new FormData();

            // Append form fields
            formData.append('task_name', form.name);
            formData.append('description', form.description);
            formData.append('points', form.points);

            // Make the API request with FormData
            const response = await ApiService.post('task', formData);
            if (response) {
                // Show success alert
                await Swal.fire({
                  title: 'Profile updated successfully!!',
                  text: 'Success!',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                // Reload the page after the alert is closed
                window.location.reload();
              }

            setForm({
                name: '',
                description: '',
                points: ''
              });


        } catch (error) {
            console.log('Error during event creation:', error.response?.data || error.message);

            if (error.response?.status === 422) {
                setForm({
                    name: '',
                    description: '',
                    points: ''
                  });
                setErrors(error.response.data.errors);

            } else {
                setErrors({ global: 'An unexpected error occurred during registration.' });
            }
        }
    };
  return (
    <>
      <div className="space-y-5">
                <Typography variant="h4" color="blue-gray" className="font-semibold text-green-700 font-custom uppercase">
                    Task Management
                </Typography>

                <div className='flex justify-end'>
    <Link to="/admin/dashboard/task">
            <ArrowLeftCircleIcon className='w-12 text-blue-500 h-14 hover hover:text-blue-400'/>
        </Link>
    </div>

        <Card className="w-full shadow-lg">
        <Typography variant="h4" className="mt-5 mb-5 font-semibold text-center font-custom">
            Add Task
          </Typography>
        <CardBody>
          <form className='font-custom'>
            <div className="grid grid-cols-1 ">
              {/* Title Field */}
              <div className="flex flex-col mb-4">
                <div className='mb-4'>
                <Input
                  type="text"
                  label="Task Name"
                  size="lg"
                  className="w-full shadow-inner"
                  value={form.name}
                  onChange={(event) => {
                    setForm({ ...form, name: event.target.value });
                  }}
                />
                {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
                </div>

                <div className="mt-5">
                <Textarea
                  label="Task Description"
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
              </div>
            </div>

            {/* Submit Button */}
            <div className='mt-10'>
            <Button type="submit" color="green" className="w-full" onClick={handleSubmit}>
              Create Task
            </Button>
            </div>

          </form>
        </CardBody>
      </Card>
      </div>
      </>
  )
}

export default Gamification
