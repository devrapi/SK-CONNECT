import React, { useState, useContext, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
  Badge,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';
import { CameraIcon } from '@heroicons/react/24/solid';
import ApiService from '../../../Services/ApiService';
import WeeklyStreaks from './WeeklyStreaks';
import Swal from 'sweetalert2';

const MyProfile = () => {
  const { user } = useContext(AppContext);

  const defaultImage = '/img/default_user.jpg';
  const [image, setImage] = useState(user.image_path ? `/storage/${user.image_path}` : defaultImage);
  const [imageFile, setImageFile] = useState(null);
  const [dailyLogin, setDailyLogin] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  async function getDailyLogin() {
    const res = await ApiService.get(`dailyLogin/${user.daily_login_id}`);
    const data = await res.data;
    setDailyLogin(data.streak);
  }

  useEffect(() => {
    getDailyLogin();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      Swal.fire('Invalid File', 'Please upload a valid image.', 'error');
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await ApiService.post(`update/user/${user.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response) {
        Swal.fire('Success', 'Avatar Updated Successfully!', 'success').then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Error during update creation:', error.response?.data || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center ">
      <Card className="w-full max-w-md mt-20 shadow-lg">
        <CardHeader color="green" className="relative py-6 text-center bg-gradient-to-r from-green-600 to-green-600">
          <div className="relative flex justify-center mb-4">
            <div className="relative group">
              <Avatar
                src={image}
                alt="User avatar"
                size="xxl"
                className="p-0.5"
                variant="circular"
                withBorder={true}
                color="blue"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-full cursor-pointer right-2 group-hover:opacity-75"
              >
                <CameraIcon className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
          {imageFile && !isUploading && (
            <Button color="green" onClick={handleSubmit} size="sm">
              Save Avatar
            </Button>
          )}
          {isUploading && <Typography variant="small" color="green">Uploading...</Typography>}
          <Typography variant="h5" color="white">
            {user.name}
          </Typography>
          <Typography variant="small" color="white">
            {user.email}
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <div className="px-4 py-2 mb-4 text-green-700 bg-green-100 rounded-lg">
            <Typography variant="h6" className="font-bold">
              Points: {user.points}
            </Typography>
          </div>
          <div className="flex justify-center space-x-3">
            <Link to={`/index/editProfile/${user.profile_id}`}>
              <Button className='bg-green-700' size="sm">
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
