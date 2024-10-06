import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
} from "@material-tailwind/react";

const Homepage = () => {
  return (
    <>
      <header className="bg-white px-9">
        <div className="container px-4 mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side: Title Text */}
            <div>
              <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
                Exciting News! Introducing our latest innovation
              </Typography>
              <Typography
                variant="h1"
                color="blue-gray"
                className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
              >
                Get ready to experience a new level of{" "}
                <span className="leading-snug text-green-700">
                  performance
                </span>{" "}
                and{" "}
                <span className="leading-snug text-green-700">
                  functionality
                </span>.
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
              >
                The time is now for it to be okay to be great. For being a bright
                color. For standing out.
              </Typography>
              <div className="flex w-full mt-8 gap-4">
                <Button className="w-full px-4 md:w-[12rem] bg-green-700">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="w-full h-full">
              <img
                src="/img/sampleimage.png" // Replace with your actual image URL
                alt="Innovation"
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
