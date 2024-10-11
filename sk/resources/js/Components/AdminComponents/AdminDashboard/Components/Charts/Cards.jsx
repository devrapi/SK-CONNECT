import React, { useContext } from 'react';

// @material-tailwind/react
import {
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { AppContext } from '../../../../Context/AppContext';

export function KpiCard({
  title,
  percentage,
  count,
  color,
  icon,
}) {
  return (
    <Card className="shadow-sm border border-gray-200 !rounded-lg">
      <CardBody className="p-4">
        <div className="flex items-center justify-between">
          <Typography
            className="!font-medium !text-xs text-gray-600"
          >
            {title}
          </Typography>
          <div className="flex items-center gap-1">
            {icon}
            <Typography
              color={color}
              className="font-medium !text-xs"
            >
              {percentage}
            </Typography>
          </div>
        </div>
        <Typography
          color="blue-gray"
          className="mt-1 text-2xl font-bold"
        >
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
      title: "Events",
      percentage: "5%",
      count: event?.length || 0,
      color: "green",
      icon: (
        <ChevronUpIcon
          strokeWidth={4}
          className="w-3 h-3 text-green-500"
        />
      ),
    },
    {
      title: "Profiles",
      percentage: "8%",
      count: profiles?.length || 0,
      color: "green",
      icon: (
        <ChevronUpIcon
          strokeWidth={4}
          className="w-3 h-3 text-green-500"
        />
      ),
    },
    {
      title: "Ticket",
      percentage: "12%",
      count: ticket?.length || 0,
      color: "red",
      icon: (
        <ChevronDownIcon
          strokeWidth={4}
          className="w-3 h-3 text-red-500"
        />
      ),
    },
    {
      title: "Rewards",
      percentage: "6%",
      count: rewards?.length || 0,
      color: "green",
      icon: (
        <ChevronUpIcon
          strokeWidth={4}
          className="w-3 h-3 text-green-500"
        />
      ),
    },
  ];

  return (
    <div className="container pb-5 ">
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
