import { Typography, Card, CardBody } from "@material-tailwind/react";

function ContentCard({ img, title, desc }) {
  return (
    <Card
      className="relative grid items-end overflow-hidden rounded-xl min-h-[20rem] md:min-h-[25rem] lg:min-h-[30rem]"
      color="transparent"
    >
      {/* Background Image */}
      <img
        src={img}
        alt={title}
        className="absolute inset-0 object-cover object-center w-full h-full"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      {/* Card Content */}
      <CardBody className="relative flex flex-col justify-end p-6">
        <Typography
          variant="h4"
          color="white"
          className="text-lg md:text-xl lg:text-2xl font-semibold"
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          color="white"
          className="mt-2 text-sm md:text-base font-light"
        >
          {desc}
        </Typography>
      </CardBody>
    </Card>
  );
}

const contents = [
  {
    img: "/img/participate.jpg", // Replace with appropriate image URL or import
    title: "Get Involved",
    desc: "Join our vibrant community and engage in events, initiatives, and programs tailored for the youth.",
  },
  {
    img: "/img/participate2.jpg",
    title: "Events and Opportunities",
    desc: "Participate in various events, workshops, and activities designed to empower and inspire.",
  },
  {
    img: "/img/rewards.jpg",
    title: "Earn Rewards",
    desc: "Collect points and redeem exciting rewards by participating and achieving milestones on SK Connect.",
  },
];

export function Benefits() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-28 font-custom">
      {/* Section Header */}
      <div className="mb-10 lg:mb-16">
        <Typography
          variant="h2"
          className="!text-2xl !leading-snug sm:!text-3xl lg:!text-4xl font-bold font-custom text-gray-800"
        >
          Connect, Participate, Reward
        </Typography>
        <Typography
          variant="lead"
          className="mt-2 max-w-2xl !font-normal !text-gray-500 text-sm md:text-base font-custom"
        >
          Explore opportunities to connect, participate in meaningful events, and earn rewards tailored for you.
        </Typography>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 font-custom">
        {contents.map(({ img, title, desc }) => (
          <ContentCard key={title} img={img} title={title} desc={desc} className="font-custom" />
        ))}
      </div>
    </section>
  );
}

export default Benefits;
