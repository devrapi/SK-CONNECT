import React from 'react';
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";

const Features = () => {
  return (
    <section className="px-8 py-10">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography
          color="blue-gray"
          className="mb-4 !text-2xl font-bold lg:!text-4xl"
        >
          How it Works
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto max-w-lg !text-gray-500"
        >
          Explore, participate, and earn rewards! Here's how SK Connect empowers you on your journey.
        </Typography>
      </div>

      {/* Cards Section */}
      <div className="container grid grid-cols-1 mx-auto mb-8 lg:gap-x-8 gap-y-8 lg:grid-cols-3">
        {/* Card 1 */}
        <Card className="col-span-1 overflow-hidden bg-gray-100/50" shadow={false}>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2 font-medium">
              Join Events
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Participate in community events and gain points as you contribute to meaningful activities.
            </Typography>
            <img
              src="/img/iphone.png"
              alt="Participate"
              className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center"
            />
          </CardBody>
        </Card>

        {/* Card 2 */}
        <Card className="col-span-2 overflow-hidden bg-gray-100/50" shadow={false}>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2 font-medium">
              Complete Tasks
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Take on fun tasks like daily check-ins and referrals to earn extra points and level up in your journey.
            </Typography>
            <img
              src="/img/task2.png"
              alt="Complete Tasks"
             className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center"
            />
          </CardBody>
        </Card>
      </div>

      <div className="container grid grid-cols-1 mx-auto lg:gap-x-8 gap-y-8 lg:grid-cols-3">
        <Card className="col-span-2 overflow-hidden bg-gray-100/50" shadow={false}>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2 font-medium">
                Redeem Rewards
                </Typography>
                <Typography className="text-center max-w-sm mx-auto text-base font-normal leading-7 !text-gray-500">
                Exchange your points for real rewards, from vouchers to exclusive event access and more.
                </Typography>
                <img
                src="/img/rewardsNew.png"
                alt="Redeem Rewards"
                className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center" // Changed to object-contain
                />
            </CardBody>
                    </Card>


        {/* Card 4 */}
        <Card className="col-span-1 bg-gray-100/50" shadow={false}>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2 font-medium">
              Connect with Friends
            </Typography>
            <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Join a vibrant community of youth, share experiences, and grow together through SK Connect.
            </Typography>
            <div className="flex items-center justify-center mt-24 -space-x-4">
              <Avatar size="xl" variant="circular" alt="user 1" className="border-2 border-white hover:z-10" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
              <Avatar size="xl" variant="circular" alt="user 2" className="border-2 border-white hover:z-10" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80" />
              <Avatar size="xl" variant="circular" alt="user 3" className="border-2 border-white hover:z-10" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80" />
              <Avatar size="xl" variant="circular" alt="user 4" className="border-2 border-white hover:z-10" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" />
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default Features;
