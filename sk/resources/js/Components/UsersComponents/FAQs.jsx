import React from 'react';
import { Typography } from "@material-tailwind/react";

const faqs = [
  {
    title: "How can I earn points?",
    desc: "You can earn points by inviting friends to events, completing side tasks, logging in daily, maintaining a weekly streak, and by performing well on the leaderboard.",
  },
  {
    title: "When do points reset?",
    desc: "Points will reset every month, but the points on the leaderboard will stay and carry over to the next month. This means leaderboard points are not reset.",
  },
  {
    title: "How many rewards can I claim per month?",
    desc: "Each user can claim a maximum of 3 rewards per month, based on the points they accumulate through activities like event invitations, daily logins, and leaderboard positions.",
  },
];

const FAQs = () => {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-14 ">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px] font-custom text-gray-800"
          >
            Frequently asked questions
          </Typography>
          <Typography
            className="mx-auto font-normal text-[18px] text-gray-800 lg:max-w-3xl font-custom"
          >
            Here are the rules for earning and using points in our system.
          </Typography>
        </div>
        <div className="grid max-w-3xl gap-10 mx-auto">
          {faqs.map(({ title, desc }) => (
            <div key={title}>
              <Typography color="blue-gray" className="pb-6 text-[20px] font-bold font-custom text-gray-800">
                {title}
              </Typography>
              <div className="pt-4 border-t border-gray-200">
                <Typography className="font-normal text-gray-800 font-custom">
                  {desc}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
