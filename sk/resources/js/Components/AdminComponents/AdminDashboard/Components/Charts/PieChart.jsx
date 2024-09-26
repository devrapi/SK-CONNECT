import React, { useContext } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { AppContext } from '../../../../Context/AppContext'; // Assuming you have AppContext

const PieChart = () => {
  const { profiles } = useContext(AppContext);

  // Categorize profiles by education levels, including "Not School Youth"
  const educationCounts = profiles?.reduce((acc, profile) => {
    const level = profile.education;
    if (level === "Elementary") acc.elementary += 1;
    else if (level === "HighSchool") acc.highSchool += 1;
    else if (level === "Senior Highschool") acc.seniorHighSchool += 1;
    else if (level === "College") acc.college += 1;
    else if (level === "Not School Youth") acc.notSchoolYouth += 1; // Not School Youth
    return acc;
  }, {
    elementary: 0,
    highSchool: 0,
    seniorHighSchool: 0,
    college: 0,
    notSchoolYouth: 0, // Initial count for "Not School Youth"
  });

  // Dynamically setting data based on education levels
  const chartConfig = {
    type: "pie",
    width: 420,
    height: 420,
    series: [
      educationCounts?.elementary || 0,        // Elementary
      educationCounts?.highSchool || 0,        // High School
      educationCounts?.seniorHighSchool || 0,  // Senior High School
      educationCounts?.college || 0,           // College
      educationCounts?.notSchoolYouth || 0,    // Not School Youth
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      labels: ["Elementary", "High School", "Senior High School", "College", "Not School Youth"],  // Education labels
      dataLabels: {
        enabled: false,
      },
      colors: ["#1e88e5", "#ff8f00", "#00897b", "#d81b60", "#ff5252"], // Custom colors for each education level
      legend: {
        show: true,  // Optionally show the legend
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
        <div className="p-5 text-white bg-gray-900 rounded-lg w-max">
          <Square3Stack3DIcon className="w-6 h-6" />
        </div>
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
      <CardBody className="grid px-2 mt-4 place-items-center">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default PieChart;
