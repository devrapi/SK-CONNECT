import React from "react";
import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";

function TeamCard({ img, name, title }) {
  return (
    <Card className="rounded-lg bg-[#FAFAFA] shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardBody className="text-center">
        <Avatar
          src={img}
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-6"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="font-medium text-lg"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-4 text-base font-semibold text-gray-600"
        >
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-2">
          <IconButton variant="text" color="blue-gray">
            <i className="fa-brands fa-twitter text-lg" />
          </IconButton>
          <IconButton variant="text" color="blue-gray">
            <i className="fa-brands fa-linkedin text-lg" />
          </IconButton>
          <IconButton variant="text" color="blue-gray">
            <i className="fa-brands fa-dribbble text-lg" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}

const members = [
  {
    img: `https://www.material-tailwind.com/img/avatar1.jpg`,
    name: "Ryan Samuel",
    title: "Co-Founder",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar2.jpg`,
    name: "Samantha Jones",
    title: "CTO",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar5.jpg`,
    name: "Nora Hazel",
    title: "UI/UX Designer",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar4.jpg`,
    name: "Otto Gonzalez",
    title: "Marketing Specialist",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar6.jpg`,
    name: "Emma Roberts",
    title: "UI Designer",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar3.jpg`,
    name: "William Pearce",
    title: "Web Developer",
  },
  {
    img: "https://www.material-tailwind.com/image/avatar7.svg",
    name: "Bruce Mars",
    title: "UI/UX Designer",
  },
  {
    img: "https://www.material-tailwind.com/image/avatar8.svg",
    name: "Annie Sprrat",
    title: "Marketing Specialist",
  },
];

const Officials = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-5">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-28">
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-lg tracking-wide"
          >
            Meet the Team
          </Typography>
          <Typography
            variant="h2"
            color="blue-gray"
            className="my-4 text-2xl lg:text-4xl font-bold"
          >
            Behind the Success: Our Dedicated Team
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto max-w-4xl text-gray-500 text-sm lg:text-base"
          >
            From visionary leadership to creative talent and technical wizards,
            each team member plays a pivotal role in delivering exceptional
            service and innovative solutions.
          </Typography>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {members.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Officials;
