import React, { useState, useEffect } from "react";

const StarRating = ({ onRatingSubmit, currentRating }) => {
  const [selectedRating, setSelectedRating] = useState(currentRating || 0);

  useEffect(() => {
    // Update stars if the current rating changes
    setSelectedRating(currentRating || 0);
  }, [currentRating]);

  const handleClick = (rating) => {
    setSelectedRating(rating);
    onRatingSubmit(rating); // Send the rating to parent
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          className={`cursor-pointer ${
            star <= selectedRating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
