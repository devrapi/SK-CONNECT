import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar, // Import Avatar from Material Tailwind
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';

const MyProfile = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md mt-20 shadow-lg">
        <CardHeader color="blue-gray" className="py-4 text-center">
          {/* Adding Avatar */}
          <div className="flex justify-center mb-4">
            <Avatar
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" // Fallback image if no profile picture
              alt="User avatar"
              size="xl"
              className="border-4 border-white"
            />
          </div>

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

          <div className="mt-4 space-x-3">
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
