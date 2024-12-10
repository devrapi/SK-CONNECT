import React, { useContext } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { AppContext } from '../../../../Context/AppContext';

const PieChart = () => {
  const { profiles } = useContext(AppContext);

  const educationCounts = profiles?.reduce((acc, profile) => {
    const level = profile.education;
    if (level === "Elementary") acc.elementary += 1;
    else if (level === "HighSchool") acc.highSchool += 1;
    else if (level === "Senior Highschool") acc.seniorHighSchool += 1;
    else if (level === "College") acc.college += 1;
    else if (level === "Out of School") acc.notSchoolYouth += 1;
    return acc;
  }, {
    elementary: 0,
    highSchool: 0,
    seniorHighSchool: 0,
    college: 0,
    notSchoolYouth: 0,
  });

  const total = educationCounts?.elementary + educationCounts?.highSchool + educationCounts?.seniorHighSchool + educationCounts?.college + educationCounts?.notSchoolYouth;

  const chartConfig = {
    type: "pie",
    series: [
      educationCounts?.elementary || 0,
      educationCounts?.highSchool || 0,
      educationCounts?.seniorHighSchool || 0,
      educationCounts?.college || 0,
      educationCounts?.notSchoolYouth || 0,
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        width: '100%',
        height: '100%',
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 300,
              height: 300,
            },
          },
        },
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: 400,
              height: 400,
            },
          },
        },
      ],
      labels: ["Elementary", "High School", "Senior High School", "College", "Out of School"],
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const percentage = ((val / total) * 10).toFixed(1);
          return `${percentage}%`;
        },
      },
      colors: ["#1e88e5", "#ff8f00", "#00897b", "#d81b60", "#ff5252"],
      legend: {
        show: true,
        position: 'bottom',
      },
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            Education Levels Pie Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize the education distribution among profiles.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="grid w-full px-2 mt-4 place-items-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
          <Chart {...chartConfig} />
        </div>
      </CardBody>
    </Card>
  );
};

export default PieChart;
