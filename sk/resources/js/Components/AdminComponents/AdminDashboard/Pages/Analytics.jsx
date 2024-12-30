import React from "react";
import PieChart from "../Components/Charts/PieChart";
import Tables from "../Components/Charts/Tables";
import Cards from "../Components/Charts/Cards";
import { Typography } from "@material-tailwind/react";
import LineChart from "../Components/Charts/LineChart";

const Analytics = () => {
  return (
    <div className="min-h-screen px-6 py-8 bg-gray-100">
      {/* Header */}
      <div className="mb-8 text-center">
        <Typography variant="h4" color="blue-gray" className="font-semibold">
          ANALYTICS DASHBOARD
        </Typography>
      </div>

      {/* Cards Section */}
      <div>
        <Cards />
      </div>

      {/* Charts and Table Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pie Chart */}
        <div className="col-span-1 lg:col-span-3 p-4 bg-white rounded-lg shadow-md">
          <PieChart />

        </div>
        <div className="col-span-1 lg:col-span-3 p-4 bg-white rounded-lg shadow-md">
        <LineChart/>
        </div>

        {/* Table (Spanning Full Width) */}
        <div className="col-span-1 lg:col-span-3 p-4 bg-white rounded-lg shadow-md">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-4 font-semibold"
          >
            User Rankings
          </Typography>
          <Tables />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
