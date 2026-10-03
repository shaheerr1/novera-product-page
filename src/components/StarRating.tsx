import { useId } from "react";
import { formatCompactNumber } from "@/lib/format";

const STAR_PATH =
  "m12 3.2 2.6 5.5 6 .7-4.4 4.1 1.1 5.9L12 16.5l-5.3 2.9 1.1-5.9-4.4-4.1 6-.7L12 3.2Z";

interface StarRatingProps {
  average: number;
  count: number;
  max?: number;
}

export default function StarRating({ average, count, max = 5 }: StarRatingProps) {
  const clipId = useId();
  // Round down to the nearest half star, so 4.9 shows four and a half stars.
  const shown = Math.floor(average * 2) / 2;

  return (
    <div className="star-rating">
      <span className="star-rating__stars" aria-hidden="true">
        {Array.from({ length: max }, (_, index) => {
          const fill = Math.min(Math.max(shown - index, 0), 1);
          return (
            <svg key={index} className="star-rating__star" viewBox="0 0 24 24" focusable="false">
              {fill === 0.5 && (
                <defs>
                  <clipPath id={`${clipId}-half`}>
                    <rect width="12" height="24" />
                  </clipPath>
                </defs>
              )}
              <path className="star-rating__outline" d={STAR_PATH} />
              {fill > 0 && (
                <path
                  className="star-rating__fill"
                  d={STAR_PATH}
                  clipPath={fill === 0.5 ? `url(#${clipId}-half)` : undefined}
                />
              )}
            </svg>
          );
        })}
      </span>
      <span className="star-rating__score">
        <span className="visually-hidden">Rated </span>
        {average}/{max}
      </span>
      <span className="star-rating__count">({formatCompactNumber(count)} reviews)</span>
    </div>
  );
}
