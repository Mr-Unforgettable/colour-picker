import React, { useRef } from "react";
import useDrag from "../hooks/useDrag";

interface HueSliderProps {
  hue: number;
  setHue: (value: number) => void;
}

const HueSlider: React.FC<HueSliderProps> = ({ hue, setHue }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateHue = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    const { top, height } = sliderRef.current.getBoundingClientRect();
    const y = Math.min(Math.max(e.clientY - top, 0), height);
    setHue(((height - y) / height) * 360); // Inverted to match top-to-bottom
  };

  const handleMouseDown = useDrag(updateHue);

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      className="w-6 h-64 relative border border-black dark:border-white rounded cursor-pointer"
      style={{
        background:
          "linear-gradient(to top, red, magenta, blue, cyan, green, lime, yellow, red)",
      }}
    >
      <div
        className="absolute left-0 w-full h-[5px] bg-white shadow-md pointer-events-none"
        style={{
          top: `calc(${(1 - hue / 360) * 100}% - 5px)`,
        }}
      />
    </div>
  );
};

export default HueSlider;