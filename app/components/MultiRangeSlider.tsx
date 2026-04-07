"use client";

import { useEffect, useState } from "react";

const MultiRangeSlider = ({ min, max, step, onChange }: { min: number; max: number; step: number; onChange: (min: number, max: number) => void }) => {
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

  useEffect(() => {
    if (onChange) {
      onChange(minVal, maxVal);
    }
  }, [minVal, maxVal]);

  return <div className="w-full mt-4">
    <div className="relative h-20">
      <div className="absolute top-1/2 -translate-y-1/2 cursor-pointer w-full h-1.5 bg-gray-200 rounded-full" />

      <div
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer h-1.5 bg-black rounded-full"
        style={{
          left: `${getPercent(minVal)}%`,
          width: `${getPercent(maxVal) - getPercent(minVal)}%`,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full"
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full"
      />

      <span
        className="pointer-events-none absolute text-left top-3/4 -translate-y-1/2"
        style={{
          left: `${getPercent(minVal)}%`
        }}
      >${minVal}</span>
      <span
        className="pointer-events-none absolute top-3/4 -translate-y-1/2 text-center"
        style={{
          left: `${getPercent(maxVal) - 15}%`
        }}
      >${maxVal}</span>
    </div>

  </div>
}

export default MultiRangeSlider;