"use client";

import { useState } from "react";

const MultiRangeSlider = ({ min, max, step }: { min: number; max: number; step: number }) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
  };

  const getPercent = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return <div className="w-full mt-4">
    <div className="relative h-32">
      {/* Track */}
      <div className="absolute top-1/2 -translate-y-1/2 cursor-pointer w-full h-1.5 bg-gray-200 rounded-full" />

      {/* Range highlight */}
      <div
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer h-1.5 bg-black rounded-full"
        style={{
          left: `${getPercent(minVal)}%`,
          width: `${getPercent(maxVal) - getPercent(minVal)}%`,
        }}
      />

      {/* Min thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full"
      />

      {/* Max thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full"
      />
      {/* Values */}
      <span
        className="pointer-events-none absolute text-left top-3/4 -translate-y-1/2"
        style={{
          left: `${getPercent(minVal)}%`
        }}
      >${minVal}</span>
      <span
        className="pointer-events-none absolute top-3/4 -translate-y-1/2 text-right"
        style={{
          left: `${getPercent(maxVal)}%`
        }}
      >${maxVal}</span>
    </div>

  </div>
}

export default MultiRangeSlider;