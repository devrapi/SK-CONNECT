import React from 'react'
import { Link } from 'react-router-dom'
import {
    Navbar,
    Collapse,
    Button,
    IconButton,
    Typography,
    Input,
  } from "@material-tailwind/react";
const Homepage = () => {
  return (
    <>
<header className="pt-32 bg-white px-9">
        {/* <div className="grid mt-16 min-h-[82vh] w-full lg:h-[54rem] md:h-[34rem] place-items-stretch bg-[url('/image/bg-hero-17.svg')] bg-center bg-contain bg-no-repeat"> */}
          <div className="container px-4 mx-auto text-center">
            <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
              Exciting News! Introducing our latest innovation
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
            >
              Get ready to experience a new level of{" "}
              <span className="leading-snug text-green-500 ">
                performance
              </span>{" "}
              and{" "}
              <span className="leading-snug text-green-500">
                functionality
              </span>
              .
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              The time is now for it to be okay to be great. For being a bright
              color. For standing out.
            </Typography>
            <div className="grid w-full mt-8 place-items-start md:justify-center">
              <div className="flex flex-col w-full gap-4 mb-2 md:flex-row">

                <Button
                  color="green"
                  className="w-full px-4 md:w-[12rem]"
                >
                    <Link to="/register">

                    get started

                    </Link>

                </Button>
              </div>
            </div>
          </div>
        {/* </div> */}
      </header>




    </>
  )
}

export default Homepage
