import React from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";

const Features = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
      {/* Section Header */}
      <div className="container mx-auto text-center mb-10 lg:mb-20">
        <Typography
          color="blue-gray"
          className="mb-4 text-2xl lg:text-4xl font-bold"
        >
          How it Works
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto max-w-lg text-gray-500 text-sm md:text-base"
        >
          Explore, participate, and earn rewards! Here's how SK Connect empowers you on your journey.
        </Typography>
      </div>

      {/* Cards Section */}
      <div className="container grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-8 mx-auto mb-8">
        {/* Card 1 */}
        <Card className="bg-gray-100/50 overflow-hidden shadow-md">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-4 text-xl lg:text-2xl font-medium"
            >
              Join Events
            </Typography>
            <Typography className="max-w-xs mx-auto text-gray-500 text-sm md:text-base mb-4">
              Participate in community events and gain points as you contribute to meaningful activities.
            </Typography>
            <img
              src="/img/iphone.png"
              alt="Participate"
              className="w-full h-auto object-cover"
            />
          </CardBody>
        </Card>

        {/* Card 2 */}
        <Card className="bg-gray-100/50 overflow-hidden shadow-md">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-4 text-xl lg:text-2xl font-medium"
            >
              Complete Tasks
            </Typography>
            <Typography className="max-w-xs mx-auto text-gray-500 text-sm md:text-base mb-4">
              Take on fun tasks like daily check-ins and referrals to earn extra points and level up in your journey.
            </Typography>
            <img
              src="/img/task2.png"
              alt="Complete Tasks"
              className="w-full h-auto object-cover"
            />
          </CardBody>
        </Card>

        {/* Card 3 */}
        <Card className="bg-gray-100/50 overflow-hidden shadow-md">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-4 text-xl lg:text-2xl font-medium"
            >
              Redeem Rewards
            </Typography>
            <Typography className="max-w-sm mx-auto text-gray-500 text-sm md:text-base mb-4">
              Exchange your points for real rewards, from vouchers to exclusive event access and more.
            </Typography>
            <img
              src="/img/rewardsNew.png"
              alt="Redeem Rewards"
              className="w-full h-auto object-cover"
            />
          </CardBody>
        </Card>
      </div>

      {/* Additional Section */}

    </section>
  );
};

export default Features;
