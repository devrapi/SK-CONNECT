import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
} from "@material-tailwind/react";

const Homepage = () => {
  return (
    <>
      <header className="bg-gray-100 p-9">
  <div className="container px-4 mx-auto">
    <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
      {/* Left Side: Title Text */}
      <div>
        <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
          Welcome to SK Connect
        </Typography>
        <Typography
            variant="h1"
            color="gray"
            className="font-custom mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
            >
          Connect, Participate, Reward{" "}
          <span className="leading-snug text-green-700">
            Your Youth Journey Starts Here
          </span>
        </Typography>
        <Typography
          variant="lead"
          className="font-custom mx-auto w-full !text-gray-500 lg:text-lg text-base"
        >
          Join a vibrant community where your contributions lead to real rewards.
        </Typography>
        <div className="flex w-full gap-4 mt-8">
          <Button className="w-full px-4 md:w-[12rem] bg-green-700">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="w-full h-full bg-gray-100">
        <img
          src="/img/Online world-cuate.png" // Replace with your actual image URL
          alt="SK Connect"
          className="w-full h-auto"
        />
      </div>
    </div>
  </div>
</header>

    </>
  );
}

export default Homepage;
