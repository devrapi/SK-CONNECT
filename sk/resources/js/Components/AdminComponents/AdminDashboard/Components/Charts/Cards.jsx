import React, { useContext } from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarIcon,
  GiftIcon,
  UserIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import { AppContext } from "../../../../Context/AppContext";

export function KpiCard({ title, count,  icon, }) {

  return (
    <Card className="transition-shadow duration-200 border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
    <CardBody className="p-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mb-2">{icon}</div>
        </div>
        <div>
          <div className="text-center">
            <Typography color="blue-gray" className="text-2xl font-bold font-custom">
              {count}
            </Typography>
          </div>
          <Typography className="text-xs font-medium text-gray-400 font-custom">
            {title}
          </Typography>
        </div>
      </div>
    </CardBody>
    {/* Static progress line */}
    <div className="p-4 pt-0">
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
          style={{ width: "70%" }} // Adjust the width to represent the progress visually
        ></div>
      </div>
    </div>
  </Card>
  );
}

const Cards = () => {
  const { event, ticket, profiles, rewards } = useContext(AppContext);

  const data = [
    {
      title: "Total Events",
      percentage: "5%",
      count: event?.length || 0,
      color: "green",
      icon: <CalendarIcon className="w-10 h-10 text-yellow-600" />,
    //   trendIcon: <ChevronUpIcon className="w-4 h-4 text-green-500" />,
    },
    {
      title: "Total Youth ",
      percentage: "8%",
      count: profiles?.length || 0,
      color: "green",
      icon: <UserIcon className="w-10 h-10 text-blue-600" />,
    //   trendIcon: <ChevronUpIcon className="w-4 h-4 text-green-500" />,
    },
    {
      title: "Total Ticket",
      percentage: "12%",
      count: ticket?.length || 0,
      color: "red",
      icon: <TicketIcon className="w-10 h-10 text-green-600" />,
    //   trendIcon: <ChevronDownIcon className="w-4 h-4 text-red-500" />,
    },
    {
      title: "Total Rewards",
      percentage: "6%",
      count: rewards?.length || 0,
      color: "green",
      icon: <GiftIcon className="w-10 h-10 text-red-600" />,
    //   trendIcon: <ChevronUpIcon className="w-4 h-4 text-green-500" />,
    },
  ];

  return (
    <div className="container pb-5 mx-auto">
      <div className="grid gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((props, key) => (
          <KpiCard key={key} {...props} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
