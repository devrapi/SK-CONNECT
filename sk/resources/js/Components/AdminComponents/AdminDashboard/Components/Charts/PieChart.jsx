import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  import { Square3Stack3DIcon } from "@heroicons/react/24/outline";


  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
    },
  };
const PieChart = () => {
  return (
    <Card>
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
    >
      <div className="p-5 text-white bg-gray-900 rounded-lg w-max">
        <Square3Stack3DIcon className="w-6 h-6" />
      </div>
      <div>
        <Typography variant="h6" color="blue-gray">
          Pie Chart
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="max-w-sm font-normal"
        >
          Visualize your data in a simple way using the
          @material-tailwind/react chart plugin.
        </Typography>
      </div>
    </CardHeader>
    <CardBody className="grid px-2 mt-4 place-items-center">
      <Chart {...chartConfig} />
    </CardBody>
  </Card>
  )
}

export default PieChart
