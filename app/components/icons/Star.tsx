import { StarType } from "@/app/utils/types/Product";

const Star = ({
  classNames,
  title,
  primaryFill = "#d9d9d9",
  secondaryFill = null,
}: StarType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 16"
      className={classNames}
      fill={primaryFill}
    >
      <title>{title}</title>
      <g>
        <polygon points="12.7 10.2 13.7 16 8.5 13.3 3.3 16 4.3 10.2 0 6.1 5.9 5.3 8.5 0 11.1 5.3 16.9 6.1 12.7 10.2" />
        {secondaryFill && (
          <polygon
            fill={secondaryFill}
            points="8.5 0 8.5 13.3 3.3 16 4.3 10.2 0 6.1 5.9 5.3 8.5 0"
          />
        )}
      </g>
    </svg>
  );
};

export default Star;
