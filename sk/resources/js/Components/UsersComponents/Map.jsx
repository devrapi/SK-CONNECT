import React from "react";
import Slider from "react-slick";
import { Typography } from "@material-tailwind/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Map() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    { src: "/img/caraousel3.jpg", alt: "Bayanihan Image 1" },
    { src: "/img/carousel1.jpg", alt: "Bayanihan Image 2" },
    { src: "/img/carousel2.jpg", alt: "Bayanihan Image 3" },
    { src: "/img/carousel5.jpg", alt: "Bayanihan Image 4" },
    { src: "/img/carousel4.jpg", alt: "Bayanihan Image 5" },
    { src: "/img/carousel7new.jpg", alt: "Bayanihan Image 6" },
  ];

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-16 bg-gray-50">
      <div className="container flex flex-col mx-auto mb-5 lg:flex-row lg:items-center lg:gap-10">
        {/* Text Section */}
        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-4 text-lg font-semibold text-green-700 lg:text-2xl font-custom"
          >
            Welcome to San Nicolas 1
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-6 text-2xl font-bold text-gray-800 lg:text-4xl font-custom"
          >
            Discover the Heart of Community
          </Typography>
          <Typography className="mb-5 text-gray-600 lg:text-lg font-custom">
            San Nicolas 1 is a vibrant neighborhood known for its rich history,
            close-knit community, and picturesque landscapes. Whether you're
            here to explore or looking for a place to call home, San Nicolas 1
            offers something special for everyone.
          </Typography>
          <Typography className="mb-5 text-gray-600 lg:text-lg font-custom">
            Engage with a community where tradition meets modernity, fostering
            a sense of belonging and togetherness for all its residents.
          </Typography>
          <Typography className="text-gray-600 lg:text-lg font-custom">
            Experience the warmth of Bayanihan spirit as we invite you to be a
            part of our growing and thriving neighborhood.
          </Typography>
        </div>

        {/* Carousel Section */}
        <div className="lg:w-1/2">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Map;
