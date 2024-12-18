import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

export function Map() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 lg:py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        {/* Header Section */}
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 text-lg lg:text-2xl font-semibold font-custom text-gray-800"
        >
          We're Here for You
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 text-2xl lg:text-4xl font-bold font-custom text-gray-800"
        >
          Need Assistance?
        </Typography>
        <Typography className="mb-10 lg:mb-16 mx-auto max-w-3xl text-gray-500 font-custom">
          Have questions about our services, need help with your account, or
          want to provide feedback? Our team is here to assist you!
        </Typography>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-12 items-center font-custom">
          {/* Image Section */}
          <img
            src="/img/maps.png" // Replace with a relevant image for SK Connect support
            alt="Support illustration"
            className="w-full h-auto lg:max-h-[500px] rounded-lg shadow-md"
          />

          {/* Form Section */}
          <form
            action="#"
            className="flex flex-col gap-6 lg:max-w-lg bg-white p-6 rounded-lg shadow-lg"
          >
            <Typography
              variant="small"
              className="text-left text-gray-600 font-semibold font-custom"
            >
              Choose Your Inquiry Type
            </Typography>
            <div className="flex gap-4">
              <Button variant="outlined" className="w-full">
                General Inquiry
              </Button>
              <Button variant="outlined" className="w-full">
                Account Support
              </Button>
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-1 text-left font-medium text-gray-800 font-custom"
                >
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="first-name"
                  containerProps={{ className: "w-full" }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-1 text-left font-medium text-gray-800 font-custom"
                >
                  Last Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="last-name"
                  containerProps={{ className: "w-full" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Typography
                variant="small"
                className="mb-1 text-left font-medium text-gray-800 font-custom"
              >
                Your Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="name@email.com"
                name="email"
                containerProps={{ className: "w-full" }}
              />
            </div>

            {/* Message */}
            <div>
              <Typography
                variant="small"
                className="mb-1 text-left font-medium text-gray-800 font-custom"
              >
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="gray"
                placeholder="Write your message here..."
                name="message"
                containerProps={{ className: "w-full" }}
              />
            </div>

            {/* Submit Button */}
            <Button className="w-full" color="blue">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Map;
