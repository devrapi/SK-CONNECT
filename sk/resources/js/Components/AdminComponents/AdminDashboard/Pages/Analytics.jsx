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
      <div className="mb-8 font-custom">
        <Typography variant="h4" color="blue-gray" className="font-semibold text-green-700 font-custom">
          ANALYTICS DASHBOARD
        </Typography>
      </div>

      {/* Cards Section */}
      <div>
        <Cards />
      </div>

      {/* Charts and Table Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Pie Chart */}

        <div className="col-span-4 bg-white rounded-lg lg:col-span-2 xl:grid-cols-2">
        <LineChart/>
        </div>
        <div className="col-span-4 bg-white rounded-lg lg:col-span-2 xl:grid-cols-2">

          <PieChart />

        </div>

        {/* Table (Spanning Full Width) */}
        <div className="col-span-4 lg:col-span-4">
          <Tables />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
