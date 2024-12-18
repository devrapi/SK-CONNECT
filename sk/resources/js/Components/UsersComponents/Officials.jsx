import React, { useContext } from "react";
import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { AppContext } from "../Context/AppContext";
import { GlobeAltIcon ,AcademicCapIcon  } from "@heroicons/react/24/outline";

function TeamCard({ img, name, title }) {
  return (
    <Card className="rounded-lg bg-[#FAFAFA] shadow-md hover:shadow-lg transition-shadow duration-300 font-custom">
  <CardBody className="text-center">
    <Avatar
      src={img || "default-avatar.png"} // Fallback image if `img` is null
      alt={name}
      variant="circular"
      size="xxl"
      className="mx-auto mb-6"
    />
    <Typography
      variant="h5"
      color="blue-gray"
      className="font-medium text-lg font-custom"
    >
      {name}
    </Typography>
    <Typography
      color="blue-gray"
      className="mb-4 text-base font-semibold text-gray-600 font-custom"
    >
      {title}
    </Typography>
    {/* Social Media Icons */}
    <div className="flex items-center justify-center gap-2">
      {/* Instagram */}
      <IconButton variant="text" color="blue-gray">
        <GlobeAltIcon className="w-6 h-6" />
      </IconButton>
      {/* Facebook */}
      <IconButton variant="text" color="blue-gray">
        <AcademicCapIcon className="w-6 h-6" />
      </IconButton>
    </div>
  </CardBody>
</Card>
  );
}

const Officials = () => {
  const { officials } = useContext(AppContext); // Fetch the officials array from context

  if (!officials || officials.length === 0) {
    return (
      <div className="text-center text-gray-500 font-custom">
        No officials to display.
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-5">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-28">
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-lg tracking-wide font-custom text-gray-800"
          >
            Meet the Team
          </Typography>
          <Typography
            variant="h2"
            color="blue-gray"
            className="my-4 text-2xl lg:text-4xl font-bold font-custom text-gray-800"
          >
            Behind the Success: Our Dedicated Team
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto max-w-4xl text-gray-500 text-sm lg:text-base font-custom"
          >
            From visionary leadership to creative talent and technical wizards,
            each team member plays a pivotal role in delivering exceptional
            service and innovative solutions.
          </Typography>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {officials.map((official, index) => (
            <TeamCard
              key={index}
              img={`/storage/${official.image_path}`}
              name={official.name}
              title={official.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Officials;
