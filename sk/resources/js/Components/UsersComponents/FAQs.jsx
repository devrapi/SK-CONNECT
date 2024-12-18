import React from 'react'
import { Typography } from "@material-tailwind/react";

const faqs = [
    {
      title: "How do I order?",
      desc: "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don't appreciate the moment until it's passed.",
    },
    {
      title: "How can i make the payment?",
      desc: "It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't matter. Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams, too. We're not always in the position that we want to be at.",
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
            A lot of people don&apos;t appreciate the moment until it&apos;s
            passed. I&apos;m not trying my hardest, and I&apos;m not trying to
            do.
          </Typography>
        </div>
        <div className="grid max-w-3xl gap-10 mx-auto">
          {faqs.map(({ title, desc }) => (
            <div key={title}>
            <Typography color="blue-gray" className="pb-6 text-[20px] font-bold font-custom text-gray-800">
            {title}
          </Typography>
              <div className="pt-4 border-t border-gray-200">
                <Typography className="font-normal  font-custom text-gray-800">
                  {desc}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQs
