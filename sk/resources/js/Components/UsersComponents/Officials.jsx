import React, { useContext } from "react";
import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { AppContext } from "../Context/AppContext";
import { GlobeAltIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

function TeamCard({ img, name, title }) {
  return (
    <Card className="transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg font-custom">
      <CardBody className="text-center">
        <Avatar
          src={img || "default_user.jpg"} // Fallback image if `img` is null
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-4 border border-gray-200"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-lg font-medium font-custom"
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
        <div className="flex items-center justify-center gap-4 mt-4">
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
    <section className="px-4 py-20 sm:px-6 lg:px-8 ">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-28">
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-lg tracking-wide text-green-700 uppercase font-custom"
          >
            Meet Our SK Leaders
          </Typography>
          <Typography
            variant="h2"
            color="blue-gray"
            className="my-4 text-2xl font-bold text-gray-800 lg:text-4xl font-custom"
          >
            Empowering Youth for a Brighter Tomorrow
          </Typography>
          <Typography
            variant="lead"
            className="max-w-3xl mx-auto text-sm text-gray-600 lg:text-base font-custom"
          >
            The Sangguniang Kabataan leadership team is dedicated to fostering
            youth empowerment, community engagement, and innovative programs
            that inspire the next generation. Meet the passionate individuals
            driving positive change in our community.
          </Typography>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
