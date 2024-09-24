import React, { useState, useContext } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';
// import { CameraIcon } from "@heroicons/react/solid"; // Import an icon for the edit action
import { CameraIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import ApiService from '../../../Services/ApiService';

const MyProfile = () => {

  const{user} = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

 const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Create a preview URL
            setImageFile(file); // Store the actual file for submission
        }
    };

    const handleSubmit = async () => {

        try {
            const formData = new FormData();

            if (imageFile) {
                formData.append('image', imageFile);
                console.log([...formData]);
            }
            else{
                console.log('No image file to upload');
            }

            const response = await ApiService.put(`update/user/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error during update creation:', error.response?.data || error.message);
        }
    };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md mt-20 shadow-lg">
        <CardHeader color="blue-gray" className="py-4 text-center relative">
          {/* Adding Avatar */}
          <div className="relative flex justify-center mb-4">
            <Avatar
              src={image}
              alt="User avatar"
              size="xxl"
              className="p-0.5"
              variant="circular"
              withBorder={true}
              color="blue"
            />

            {/* Edit Icon for Avatar */}
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 cursor-pointer hover:bg-gray-600">
              <CameraIcon className="h-5 w-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>


          </div>
          {imageFile && (
            <Button color="blue" onClick={handleSubmit} size='sm' >
              Save Avatar
            </Button>
          )}
          <Typography variant="h5" color="gray">
            {user.name}
          </Typography>
          <Typography variant="small" color="gray">
            {user.email}
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <div className="px-4 py-2 mb-4 text-blue-700 bg-blue-100 rounded-lg">
            <Typography variant="h6" className="font-bold">
              Points: {user.points}
            </Typography>
          </div>

          <div className="mt-4 space-x-3 flex justify-center">
            <Link to={`/index/editProfile/${user.profile_id}`}>
              <Button color="blue" size="sm">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyProfile;
