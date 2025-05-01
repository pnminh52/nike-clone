import React, { useState } from "react";

const StarRatingInput = ({ rating, setRating }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="mb-4">
      <p className="py-4">
        Overall rating<span className="text-red-600">*</span>
      </p>
      <div className="flex gap-1 ">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const isActive = hovered > 0 ? starValue <= hovered : starValue <= rating;

          return (
            <svg
              key={starValue}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(0)}
              className={`w-12 h-12 cursor-pointer transition-colors ${
                isActive ? "text-black" : "text-white"
              }`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill="currentColor"
                stroke="black"
                strokeWidth="1.5"
                d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default StarRatingInput;
