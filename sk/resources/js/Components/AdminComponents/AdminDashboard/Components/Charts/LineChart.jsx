import React, { Suspense, lazy } from "react";

// @material-tailwind/react
import {
  Card,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";

// Dynamically import the chart component using React.lazy
const Chart = lazy(() => import("react-apexcharts"));

// Deepmerge
import merge from "deepmerge";

function AreaChart({ height = 350, series, colors, options }) {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      ...merge(
        {
          chart: {
            height: height,
            type: "area",
            zoom: {
              enabled: false,
            },
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
          legend: {
            show: false,
          },
          markers: {
            size: 0,
            strokeWidth: 0,
            strokeColors: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          grid: {
            show: true,
            borderColor: "#EEEEEE",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          tooltip: {
            theme: "light",
          },
          yaxis: {
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0,
              opacityTo: 0,
              stops: [0, 100],
            },
          },
        },
        options ? options : {}
      ),
    }),
    [height, colors, options]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chart type="area" height={height} series={series} options={chartOptions} />
    </Suspense>
  );
}

export function LineChart() {
  return (
    <section className="m-10">
      <Card>
        <CardBody className="!p-2">
          <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4 ">
            <Typography variant="h3" color="blue-gray">
              SK Connect Participation in 2024
            </Typography>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600"
                >
                  SK Members Participating
                </Typography>
              </div>
            </div>
          </div>
          {/* chart */}
          <AreaChart
            colors={["#4CAF50", "#2196F3"]}
            options={{
              xaxis: {
                categories: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
              },
            }}
            series={[
              {
                name: "2024 Participation",
                data: [
                  50, 120, 200, 300, 400, 500, 600, 650, 700, 750, 800, 850,
                ], // Replace these values with actual data for participation
              },
            ]}
          />
        </CardBody>
        <CardFooter className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <Typography variant="h6" color="blue-gray">
              SK Connect 2024 Participation
            </Typography>
            <Typography
              variant="small"
              className="mt-1 font-normal text-gray-600"
            >
              Total participation in SK Connect events this year
            </Typography>
          </div>
          <Button variant="outlined">View full report</Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default LineChart;
