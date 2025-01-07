import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from "@material-tailwind/react";
import '../../../css/app.css';

const Homepage = () => {
  return (
    <header
      className="py-12 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/img/bg1.jpg')" }}
    >
      <div className="py-12 ">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-y-12 md:grid-cols-2">
            {/* Left Side: Title Text */}
            <div>
              <Typography className="inline-flex px-3 py-1 text-xs font-medium text-blue-500 bg-white border rounded-lg border-blue-gray-50">
                Welcome to SK Connect
              </Typography>
              <Typography
                variant="h1"
                color="gray"
                className="mt-6 text-3xl font-bold leading-snug md:text-4xl lg:text-5xl font-custom"
              >
                Connect, Participate, Reward{" "}
                <span className="text-green-700 font-custom">
                  Your Youth Journey Starts Here
                </span>
              </Typography>
              <Typography
                variant="lead"
                className="mt-4 text-gray-300 md:text-lg font-custom"
              >
                Join a vibrant community where your contributions lead to real rewards.
              </Typography>
              <div className="flex flex-col items-center gap-4 mt-8 md:flex-row">
                <Button className="w-full px-4 py-2 bg-green-700 md:w-auto hover:bg-green-800">
                  <Link to="/register" className="text-white">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Homepage;
