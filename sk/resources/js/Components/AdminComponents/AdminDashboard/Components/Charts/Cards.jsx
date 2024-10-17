import React, { useContext } from 'react';

// @material-tailwind/react
import {
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

import { ChevronDownIcon, ChevronUpIcon, CalendarIcon, GiftIcon, UserIcon, TicketIcon } from "@heroicons/react/24/solid";
import { AppContext } from '../../../../Context/AppContext';

export function KpiCard({
  title,
  percentage,
  count,
  color,
  icon,
  trendIcon,
}) {
  return (
    <Card className="shadow-sm border border-gray-200 !rounded-lg">
      <CardBody className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="mb-2">{icon}</div>
            <Typography className="!font-medium !text-xs text-gray-400 mt-2">
              {title}
            </Typography>
          </div>
          {/* Display the trend icon on the right */}
          <div className="flex items-center">
            <Typography color={color} className="font-medium !text-xs mr-1">
              {percentage}
            </Typography>
            {trendIcon}
          </div>
        </div>
        <Typography color="blue-gray" className="text-2xl font-bold">
          {count}
        </Typography>
      </CardBody>
    </Card>
  );
}

const Cards = () => {
  const { event, ticket, profiles, rewards } = useContext(AppContext);

  // Dynamically update the KPI data using the context values
  const data = [
    {
      title: "Total Events",
      percentage: "5%",
      count: event?.length || 0,
      color: "green",
      icon: <CalendarIcon className="w-8 h-8 text-black" />,
      trendIcon: <ChevronUpIcon className="w-4 h-4 text-green-500" />,
    },
    {
      title: "Total Youth Profiles",
      percentage: "8%",
      count: profiles?.length || 0,
      color: "green",
      icon: <UserIcon className="w-8 h-8 text-black" />,
      trendIcon: <ChevronUpIcon className="w-4 h-4 text-green-500" />,
    },
    {
      title: "Total Ticket",
      percentage: "12%",
      count: ticket?.length || 0,
      color: "red",
      icon: <TicketIcon className="w-8 h-8 text-black"/>,
      trendIcon: <ChevronDownIcon className="w-4 h-4 text-red-500" />,
    },
    {
      title: "Total Rewards",
      percentage: "6%",
      count: rewards?.length || 0,
      color: "green",
      icon: <GiftIcon className="w-8 h-8 text-black" />,
      trendIcon: <ChevronUpIcon className="w-4 h-4 text-green-500" />,
    },
  ];

  return (
    <div className="container pb-5">
      <div className="flex justify-between md:items-center">
        <div></div>
      </div>
      <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center md:gap-2.5 gap-4">
        {data.map((props, key) => (
          <KpiCard key={key} {...props} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
