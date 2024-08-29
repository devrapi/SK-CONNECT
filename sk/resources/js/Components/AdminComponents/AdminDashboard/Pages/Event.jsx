import React from 'react'
import { Input, Textarea, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import ApiService from '../../../Services/ApiService';
import { useNavigate } from 'react-router-dom';



const Event = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        title: '',
        description: '',
        points: ''
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
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('points', form.points);

            // Append the selected date
            formData.append('date', selectedDate ? selectedDate.toISOString().split('T')[0] : ''); // Format the date

            // Append the image if one is selected
            if (imageFile) {
                formData.append('image', imageFile); // Append the actual file
            }

            // Make the API request with FormData
            const response = await ApiService.post('events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',

                },
            });
            navigate('/admin/dashboard/calendars');
            window.location.reload();

            setForm({
                title: '',
                description: '',
                points: ''
              });

              setImage(null);
              setImageFile(null);
              setSelectedDate(null);

        } catch (error) {
            console.log('Error during event creation:', error.response?.data || error.message);

            if (error.response?.status === 422) {
                setForm({
                    title: '',
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
    <Card className="max-w-5xl mx-auto mt-10 shadow-lg">
    <CardBody>
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Create Event
      </Typography>
      <form>
        <div className="grid grid-cols-2 gap-6">
          {/* Title Field */}
          <div className="flex flex-col mb-4">
            <div className='mb-4'>
            <Input
              type="text"
              label="Event Title"
              size="lg"
              className="w-full shadow-inner"
              value={form.title}
              onChange={(event) => {
                setForm({ ...form, title: event.target.value });
              }}
            />
            {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
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
          </div>

          {/* Date Field */}
          <div className="mb-4">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full p-4 shadow-inner"
            />
            {selectedDate && (
              <Typography className="mt-2 font-mono">
                Selected Date: {format(selectedDate, "PPP")}
              </Typography>
            )}
            {errors.date && <span className="text-xs text-red-600">{errors.date}</span>}
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
        <div className='mt-10'>
        <Button type="submit" color="green" className="w-full" onClick={handleSubmit}>
          Create Event
        </Button>
        </div>

      </form>
    </CardBody>
  </Card>

  )
}

export default Event
