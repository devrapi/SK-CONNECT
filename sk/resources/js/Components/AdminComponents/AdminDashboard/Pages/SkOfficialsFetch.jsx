import React, { useContext } from "react";
import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";
import { AppContext } from "../../../Context/AppContext";
import { Link } from 'react-router-dom';
import { GlobeAltIcon ,AcademicCapIcon ,EllipsisHorizontalIcon , PencilIcon , UserCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import SkOfficialsDelete from "./SkOfficialsDelete";

function TeamCard({ img, name, title,OfficialId }) {
    return (
      <Card className="rounded-lg bg-[#FAFAFA] shadow-md hover:shadow-lg transition-shadow duration-300">
   <Menu>
    <MenuHandler>
        <div className="absolute p-2 cursor-pointer top-2 right-2">
             <EllipsisHorizontalIcon className="w-5 h-5" />
                </div>
            </MenuHandler>
               <MenuList className="z-10">
                     <MenuItem>
                        <Link to={`/admin/dashboard/sk-officials/update/${OfficialId}`}>
                            <div className="flex items-center space-x-2">
                                <PencilIcon className="w-4 h-4" />
                                    <span>Edit Officials</span>
                                </div>
                                    </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <SkOfficialsDelete id={OfficialId} />
                                    </MenuItem>
                                </MenuList>
                            </Menu>
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

const SkOfficialsFetch = () => {
    const { officials } = useContext(AppContext); // Fetch the officials array from context

  if (!officials || officials.length === 0) {
    return (
      <div className="text-center text-gray-500">
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
        <div className="flex justify-end mb-6">
                    <Link to="/admin/dashboard/sk-officials/Create">
                        <div className="flex items-center space-x-2">
                            <UserCircleIcon className="w-8 h-8 text-blue-500" />
                            <PlusIcon className="w-5 h-5 text-blue-500" />
                        </div>
                    </Link>
                </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {officials.map((official, index) => (
            <TeamCard
              key={index}
              img={`/storage/${official.image_path}`}
              name={official.name}
              title={official.title}
              OfficialId={official.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkOfficialsFetch
