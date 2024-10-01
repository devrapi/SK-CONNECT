import React, { useState, useContext ,useEffect} from 'react';
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
import { CameraIcon } from '@heroicons/react/24/solid';
import ApiService from '../../../Services/ApiService';
import PointsAlert from '../pages/PointsAlert';
import WeeklyStreaks from './WeeklyStreaks';
const MyProfile = () => {



  const { user } = useContext(AppContext);




  // Fallback default image if user doesn't have an avatar
  const defaultImage = "/img/default_user.jpg"; // Ensure this path exists in your public folder
  const [image, setImage] = useState(user.image_path ? `/storage/${user.image_path}` : defaultImage);
  const [imageFile, setImageFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [points, setPoints] = useState(null)
  const [dailyLogin, setDailyLogin] = useState(null);



  async function getDailyLogin(){
    const res = await ApiService.get(`dailyLogin/${user.daily_login_id}`);
    const data = await res.data;

    setDailyLogin(data.streak)
}
    useEffect(() => {
        getDailyLogin();
    },[]);



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
      } else {
        console.log('No image file to upload');
      }

      const response = await ApiService.post(`update/user/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPoints(response.data.points);
      setShowAlert(true);

    // Reload the page
    window.location.reload();

    } catch (error) {
      console.error('Error during update creation:', error.response?.data || error.message);
    }
  };

  return (

    <div className="flex justify-center mt-10">

      <Card className="w-full max-w-md mt-20 shadow-lg">
      {showAlert && <PointsAlert points={points} />}
        <CardHeader color="blue-gray" className="relative py-4 text-center">
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
            <label htmlFor="avatar-upload" className="absolute bottom-0 p-1 bg-gray-800 rounded-full cursor-pointer right-2 hover:bg-gray-600">
              <CameraIcon className="w-5 h-5 text-white" />
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
            <Button color="blue" onClick={handleSubmit} size="sm">
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

          <div className="flex justify-center mt-4 space-x-3">
            <Link to={`/index/editProfile/${user.profile_id}`}>
              <Button color="blue" size="sm">
                Edit Profile
              </Button>
            </Link>

          </div>
          <div className="mt-6">
            <WeeklyStreaks userStreak={dailyLogin} user_id={user.id} />
        </div>
        </CardBody>
      </Card>

    </div>
  );
};

export default MyProfile;
