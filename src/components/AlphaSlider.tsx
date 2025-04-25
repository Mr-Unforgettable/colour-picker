import React, { useRef } from "react";
import useDrag from "../hooks/useDrag";

interface AlphaSliderProps {
  alpha: number;
  setAlpha: (value: number) => void;
  rgb: { r: number; g: number; b: number };
}

const AlphaSlider: React.FC<AlphaSliderProps> = ({ alpha, setAlpha, rgb }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateAlpha = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    const { top, height } = sliderRef.current.getBoundingClientRect();
    const y = Math.min(Math.max(e.clientY - top, 0), height);
    setAlpha(1 - y / height); // Inverted for top-to-bottom
  };

  const handleMouseDown = useDrag(updateAlpha);

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      className="w-6 h-64 relative border border-black dark:border-white rounded cursor-pointer"
    >
      <div
        className="absolute rounded inset-0 z-0 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='8' height='8' fill='%23ccc'/><rect x='8' y='8' width='8' height='8' fill='%23ccc'/><rect x='8' width='8' height='8' fill='%23eee'/><rect y='8' width='8' height='8' fill='%23eee'/></svg>")`,
        }}
      />
      <div
        className="absolute rounded inset-0 z-10"
        style={{
          background: `linear-gradient(to top, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1))`,
        }}
      />
      <div
        className="absolute z-10 left-0 w-full h-[5px] bg-white shadow-md pointer-events-none"
        style={{
          top: `calc(${(1 - alpha) * 100}% - 5px)`,
        }}
      />
    </div>
  );
};

export default AlphaSlider;