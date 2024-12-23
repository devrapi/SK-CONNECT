import React from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";

const Features = () => {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
      {/* Section Header */}
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography
          className="mb-4 text-2xl font-bold text-green-700 lg:text-4xl font-custom"
        >
          How it Works
        </Typography>
        <Typography
          variant="lead"
          className="max-w-lg mx-auto text-sm text-gray-500 md:text-base font-custom"
        >
          Explore, participate, and earn rewards! Here's how SK Connect empowers you on your journey.
        </Typography>
      </div>

      {/* Cards Section */}
      <div className="container grid grid-cols-1 mx-auto mb-8 gap-y-8 lg:grid-cols-3 lg:gap-8">
        {/* Card 1 */}
        <Card className="overflow-hidden shadow-md bg-gray-100/50">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-4 text-xl font-medium lg:text-2xl font-custom"
            >
              Join Events
            </Typography>
            <Typography className="max-w-xs mx-auto mb-4 text-sm text-gray-500 md:text-base font-custom">
              Participate in community events and gain points as you contribute to meaningful activities.
            </Typography>
            <img
              src="/img/iphone.png"
              alt="Participate"
              className="object-cover w-full h-auto"
            />
          </CardBody>
        </Card>

        {/* Card 2 */}
        <Card className="overflow-hidden shadow-md bg-gray-100/50">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-4 text-xl font-medium lg:text-2xl font-custom"
            >
              Complete Tasks
            </Typography>
            <Typography className="max-w-xs mx-auto mb-4 text-sm text-gray-500 md:text-base font-custom">
              Take on fun tasks like daily check-ins and referrals to earn extra points and level up in your journey.
            </Typography>
            <img
              src="/img/task2.png"
              alt="Complete Tasks"
              className="object-cover w-full h-auto"
            />
          </CardBody>
        </Card>

        {/* Card 3 */}
        <Card className="overflow-hidden shadow-md bg-gray-100/50">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-4 text-xl font-medium lg:text-2xl font-custom"
            >
              Redeem Rewards
            </Typography>
            <Typography className="max-w-sm mx-auto mb-4 text-sm text-gray-500 md:text-base font-custom">
              Exchange your points for real rewards, from vouchers to exclusive event access and more.
            </Typography>
            <img
              src="/img/rewardsNew.png"
              alt="Redeem Rewards"
              className="object-cover w-full h-auto"
            />
          </CardBody>
        </Card>
      </div>

      {/* Additional Section */}

    </section>
  );
};

export default Features;
