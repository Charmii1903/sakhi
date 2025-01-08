
import React from "react";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Hero = () => {

  const navigate = useNavigate();
  // Carousel data
  const homeCarouselData = [
    {
      image: "/banner.png", 
      path: "/",             
    },
    {
      image: "/banner7.jpg",
      path: "/collection",
    },
    {
      image: "/banner9.jpg",
      path: "/collection",
    },
    {
      image: "/banner10.png",
      path: "/collection",
    },
    {
      image: "/banner8.png",
      path: "/collection",
    },
  ];

  // Handle drag prevention for images
  const handleDragStart = (e) => e.preventDefault();

  // Prepare carousel items
  const carouselItems = homeCarouselData.map((item) => (
    <img
      key={item.path}
      className="cursor-pointer object-cover w-full h-[600px]" 
      src={item.image}
      alt=""
      onClick={() => navigate(item.path)}
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));

  return (
    // <div className="flex flex-col sm:flex-row border border-gray-400 h-[600px]"> {/* Updated height */}
    //   {/* Hero left side - smaller */}
    //   <div className="w-full sm:w-1/3 flex items-center justify-center sm:py-0 h-full"> {/* Full height */}
    //     <div className="text-[#414141]">
    //       <div className="flex items-center gap-2">
    //         <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
    //         <p className="font-medium text-sm md:text-base">Our Bestseller</p>
    //       </div>
    //       <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
    //         Latest Arrivals
    //       </h1>
    //       <div className="flex items-center gap-2">
    //         <p className="font-semibold text-sm md:text-base">Shop Now</p>
    //         <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Hero right side - larger with Carousel */}
    //   <div className="w-full sm:w-2/3 h-full"> {/* Full height */}
    //     <AliceCarousel
    //       mouseTracking
    //       items={carouselItems}
    //       autoPlay
    //       infinite
    //       autoPlayInterval={2000}
    //       disableButtonsControls
    //       disableDotsControls
    //     />
    //   </div>
    // </div>

    <div className="border border-gray-500 h-[600px] w-full"> {/* Adjust height here */}
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
  );
};

export default Hero;
