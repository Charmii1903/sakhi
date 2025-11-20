import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

const SeasonsGallery = () => {
  const navigate = useNavigate(); // For navigation to other pages

  const seasons = [
    { name: 'Summer', image: '/summercol.png', route: '/summer' },
    { name: 'Winter', image: '/wintercol.png', route: '/winter' },
    { name: 'Spring', image: '/springcol.png', route: '/spring' },
    { name: 'Fall', image: '/fallcol.png', route: '/fall' },
    { name: 'Ethnic', image: '/allcol.png', route: '/ethnic' },
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="text-center py-8 my-10 text-3xl">
      {/* Title Section */}
      <Title text1={"Explore By"} text2={"Collections"}/>
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque delectus debitis qui repellat, dolor ducimus.</p>
            
      {/* Gallery Section */}
      <div className="flex flex-wrap gap-4 text-2xl justify-center mt-6">
        {seasons.map((season) => (
          <div
            key={season.name}
            className="w-2/5 md:w-1/4 lg:w-1/5 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleNavigation(season.route)}
          >
            <img
              src={season.image}
              alt={season.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <p className="text-center mt-2 text-gray-700">{season.name}</p>
          </div>
        ))}
      </div>

      {/* Extra Space Below Hero Section */}
      <div className="mt-12" />
    </div>
  );
};

export default SeasonsGallery;
