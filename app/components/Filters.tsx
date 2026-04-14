"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filter from "./icons/Filter";
import MultiRangeSlider from "./MultiRangeSlider";
import { Category } from "../utils/types/Product";

const Filters = ({
  colors,
  categories,
  onFilterChange
}: {
  colors: string[];
  categories: Category[];
  onFilterChange: (queryString: string) => void
}) => {
  const [filters, setFilters] = useState<{
    category?: string;
    subcategory?: string;
    minPrice?: number;
    maxPrice?: number;
    colors: string[];
  }>({
    colors: [],
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateFilter = (type: string, payload: any) => {
    if (type === "color") {
      const { value, checked } = payload;

      setFilters((prev) => ({
        ...prev,
        colors: checked
          ? [...prev.colors, value] // add
          : prev.colors.filter((c) => c !== value), // remove
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: payload,
      }));
    }
  };

  const updatePrice = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const search = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.category) {
      params.set("category", filters.category);
    } else {
      params.delete("category");
    }

    if (filters.subcategory) {
      params.set("subcategory", filters.subcategory);
    } else {
      params.delete("subcategory");
    }

    if (filters.minPrice !== undefined) {
      params.set("minPrice", String(filters.minPrice));
    } else {
      params.delete("minPrice");
    }

    if (filters.maxPrice !== undefined) {
      params.set("maxPrice", String(filters.maxPrice));
    } else {
      params.delete("maxPrice");
    }

    if (filters.colors.length > 0) {
      params.set(
        "color",
        filters.colors.map((c) => encodeURIComponent(c)).join(",")
      );
    } else {
      params.delete("color");
    }

    const queryString: string = params.toString();
    router.push(`${pathname}?${queryString}`);

    onFilterChange(queryString);
  };
  return (
    <div className="hidden lg:flex border border-gray-200 rounded-[20px] px-5 py-6 flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl text-black font-bold">
          Filters
        </h2>
        <Filter classNames="w-5 fill-black/40" />
      </div>
      <hr className="border-gray-200" />

      <div className="flex flex-col gap-5">
        {
          categories.map((category) => (
            <details
              key={category._id}
              className="overflow-hidden group [&amp;_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 text-gray-900 transition">
                <h3 className="text-base text-black/60 capitalize">{category.title}</h3>
                <span className="transition -rotate-90  group-open:-rotate-0">
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
                    />
                  </svg>
                </span>
              </summary>

              <div className="bg-white mt-2">
                <div className="w-full flex flex-wrap gap-2.5">
                  {
                    category.subcategories.map((subcategory: string) => (
                      <label
                        key={subcategory}
                        className="cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="subcategory"
                          value={subcategory}
                          className="sr-only peer"
                          onChange={() => updateFilter('subcategory', subcategory)}
                        />
                        <span className="inline-flex items-center rounded-full px-4 py-2 text-sm capitalize transition bg-gray-100 text-gray-900 peer-checked:bg-black peer-checked:text-white hover:bg-gray-200">
                          {subcategory}
                        </span>
                      </label>
                    ))
                  }
                </div>
              </div>
            </details>
          ))
        }
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

        <MultiRangeSlider
          min={1}
          max={2000}
          step={1}
          onChange={(min: number, max: number) =>
            updatePrice(min, max)
          }
        />
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

        <div className="bg-white mt-2">
          <div className="w-full flex flex-wrap gap-2.5">
            {
              colors.map((color: string) => (
                <label key={color} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="color"
                    value={color}
                    checked={filters.colors.includes(color)}
                    className="sr-only peer"
                    onChange={(e) =>
                      updateFilter("color", {
                        value: color,
                        checked: e.target.checked,
                      })
                    }
                  />
                  <span
                    className={`relative size-9 inline-flex items-center justify-center rounded-full border-2 border-black/20 border-inset transition peer-checked:border-black ${color === '#fff' ? 'peer-checked:bg-custom-checkbox-black' : 'peer-checked:bg-custom-checkbox'} bg-size-[50%] bg-position-[55%_70%] bg-no-repeat`}
                    style={{ backgroundColor: color }}
                  />
                </label>
              ))
            }
          </div>
        </div>
      </details>

      <button onClick={() => search()} type="button" className="cursor-pointer bg-black rounded-full text-white text-center py-4 hover:bg-black/60">
        Apply Filter
      </button>
    </div>
  );
};

export default Filters;
