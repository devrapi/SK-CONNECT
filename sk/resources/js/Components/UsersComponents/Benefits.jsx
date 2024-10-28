import { Typography, Card, CardBody } from "@material-tailwind/react";

function ContentCard({ img, title, desc }) {
  return (
    <Card
      className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"
      color="transparent"
    >
      <img
        src={img}
        alt={title}
        className="absolute inset-0 object-cover object-center w-full h-full"
      />
      <div className="absolute inset-0 bg-black/70" />
      <CardBody className="relative flex flex-col justify-end">
        <Typography variant="h4" color="white">
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          color="white"
          className="my-2 font-normal"
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
    <section className="container px-8 py-10 mx-auto lg:py-28">
      <Typography
        variant="h2"
        color="blue-gray"
        className="!text-2xl !leading-snug lg:!text-3xl"
      >
        Connect, Participate, Reward
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 max-w-lg !font-normal !text-gray-500"
      >
        Explore opportunities to connect, participate in meaningful events, and earn rewards tailored for you.
      </Typography>

      <div className="grid grid-cols-1 gap-10 mt-10 lg:grid-cols-3">
        {contents.map(({ img, title, desc }) => (
          <ContentCard key={title} img={img} title={title} desc={desc} />
        ))}
      </div>
    </section>
  );
}

export default Benefits;
