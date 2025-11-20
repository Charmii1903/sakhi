import React from "react";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Hero = () => {
  const navigate = useNavigate();

  // Carousel data
  const homeCarouselData = [
    {
      image: "/banner.jpg",
      path: "/",
    },
    {
      image: "/banner1.jpg",
      path: "/collection",
    },
    {
      image: "/banner2.jpg",
      path: "/collection",
    },
    {
      image: "/banner3.jpg",
      path: "/collection",
    },
    {
      image: "/banner4.jpg",
      path: "/collection",
    },
    {
      image: "/banner5.jpg",
      path: "/collection",
    },
    {
      image: "/banner6.jpg",
      path: "/collection",
    },
    {
      image: "/banner7.jpg",
      path: "/collection",
    },
  ];

  // Handle drag prevention for images
  const handleDragStart = (e) => e.preventDefault();

  // Prepare carousel items
  const carouselItems = homeCarouselData.map((item) => (
    <img
      key={item.path}
      className="cursor-pointer object-cover w-full h-full"
      src={item.image}
      alt=""
      onClick={() => navigate(item.path)}
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));

  return (
    <div className="flex flex-col sm:flex-row h-[600px] border border-gray-400 ">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 h-full flex items-center justify-center px-6 sm:px-10">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-xl md:text-4xl">Welcome to Sakhi</p>
          </div>
          <p className="prata-regular text-lg sm:py-3 lg:text-lg leading-relaxed">
          Explore season-wise collections, trendy styles,
           and exclusive designs crafted for every occasion. Stay stylish with our 
           curated picks that blend comfort and elegance. Shop now and redefine your wardrobe with our bestsellers and latest arrivals.
          </p>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-md md:text-lg">Shop Now</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <div className="w-full sm:w-1/2 h-full overflow-hidden">
        <AliceCarousel
          mouseTracking
          items={carouselItems}
          autoPlay
          infinite
          autoPlayInterval={2000}
          disableButtonsControls
          disableDotsControls
        />
      </div>
    </div>
  );
};

export default Hero;
