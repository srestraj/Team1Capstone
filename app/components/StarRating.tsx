"use client";

import { useState } from "react";
import { Rating } from "../utils/types/Rating";
import Star from "./icons/Star";

const StarRating = ({ rating, readonly, updateRating }: Rating) => {
  const starElements: Element[] = Array(5).fill(<></>);
  const [ratingValue, setRatingValue] = useState<number>(rating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const logRating = (newRating: number) => {
    if (readonly) return;
    setRatingValue(newRating);
    updateRating?.(newRating);
  };

  return (
    <div className="flex items-center gap-1">
      {starElements.map((element, index) => {
        return (
          <span key={`${element}-${index}`}>
            {!readonly && (
              <input
                type="radio"
                id={`star-${index}`}
                value={index + 1}
                name="rating"
                className="rating-input hidden"
                disabled={readonly}
                checked={rating === index + 1}
                onChange={() => {
                  logRating(index + 1);
                }}
              />
            )}
            <label
              htmlFor={!readonly ? `star-${index}` : undefined}
              className="cursor-pointer"
              onMouseOver={() => {
                if (!readonly) {
                  setHoveredRating(index + 1);
                }
              }}
              onMouseLeave={() => {
                if (!readonly) {
                  setHoveredRating(null);
                }
              }}
            >
              <Star
                classNames="w-4 h-4 md:w-5 md:h-5"
                title="Rating"
                primaryFill={
                  index + 1 <= (hoveredRating || ratingValue)
                    ? "var(--rating-star)"
                    : "#D9D9D9"
                }
                secondaryFill={
                  index + 1 === Math.floor(ratingValue) && ratingValue % 1 !== 0
                    ? "var(--rating-star)"
                    : null
                }
              />
            </label>
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
