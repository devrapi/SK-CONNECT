import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

export function Map() {
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-base lg:!text-2xl"
        >
          We're Here for You
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          Need Assistance?
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          If you have questions about our services, need help with your account, or want to provide feedback, our team is ready to assist you!
        </Typography>
        <div className="grid items-center grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 ">
          <img
            src="/img/maps.png" // Change this to an appropriate image for SK Connect support
            alt="support illustration"
            className="w-full h-full lg:max-h-[510px]"
          />
          <form action="#" className="flex flex-col justify-end gap-4 lg:max-w-sm">
            <Typography
              variant="small"
              className="text-left !font-semibold !text-gray-600"
            >
              Choose Your Inquiry Type
            </Typography>
            <div className="flex gap-4">
              <Button variant="outlined" className="max-w-fit">
                General Inquiry
              </Button>
              <Button variant="outlined" className="max-w-fit">
                Account Support
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="first-name"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Last Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="last-name"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-gray-900"
              >
                Your Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="name@email.com"
                name="email"
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-gray-900"
              >
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="gray"
                placeholder="Message"
                name="message"
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button className="w-full" color="gray">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Map;
