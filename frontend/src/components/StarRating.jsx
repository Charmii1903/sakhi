import React, { useState } from "react";

const StarRating = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    onRatingSubmit(newRating); // Pass the rating to parent if needed
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={star <= (hover || rating) ? "#facc15" : "#e5e7eb"} // Yellow if selected or hovered, gray otherwise
          className="w-6 h-6 cursor-pointer"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
        >
          <path d="M12 .587l3.668 7.429L24 9.26l-6 5.854L19.335 24 12 20.267 4.665 24 6 15.114 0 9.26l8.332-1.244L12 .587z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
