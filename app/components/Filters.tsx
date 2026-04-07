import Filter from "./icons/Filter";
import MultiRangeSlider from "./MultiRangeSlider";

const Filters = ({ colors }: { colors: string[] }) => {
  return (
    <div className="hidden lg:flex border border-gray-200 rounded-[20px] px-5 py-6 flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl text-black font-bold">
          Filters
        </h2>
        <Filter classNames="w-5 fill-black/40" />
      </div>
      <hr className="border-gray-200" />

      <details
        open
        className="overflow-hidden group [&amp;_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex cursor-pointer items-center justify-between gap-2 text-gray-900 transition">
          <h3 className="text-xl text-black font-bold">Price</h3>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </span>
        </summary>

        <MultiRangeSlider min={1} max={2000} step={1} />
      </details>

      <hr className="border-gray-200" />

      <details
        open
        className="overflow-hidden group [&amp;_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex cursor-pointer items-center justify-between gap-2 text-gray-900 transition">
          <h3 className="text-xl text-black font-bold">Colors</h3>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </span>
        </summary>

        <div className="bg-white">
          <div className="w-full flex flex-wrap gap-2.5">
            {
              colors.map((color: string) => (
                <div
                  key={color}
                  className="size-9 rounded-full border-2 border-black/20 border-inset"
                  style={{ backgroundColor: color }}
                />
              ))
            }
          </div>
        </div>
      </details>
    </div>
  );
};

export default Filters;
