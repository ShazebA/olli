import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ totalStars = 5, onRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
    if (onRating) onRating(ratingValue); 
  };

  return (
    <div>
        <p>Rating: {rating}</p>
        {[...Array(totalStars)].map((star, index) => {
            const ratingValue = index + 1;
            return (
                <label key={index}>
                    <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleRating(ratingValue)}
                        style={{ display: 'none' }}
                    />
                    <FaStar
                        className="star"
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        size={20}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    />
                </label>
            );
        })}
    </div>
  );
};

export default Rating;
