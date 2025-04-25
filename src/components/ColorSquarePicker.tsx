import React, { useRef } from "react";
import useDrag from "../hooks/useDrag";

interface ColorSquarePickerProps {
  hue: number;
  saturation: number;
  value: number;
  setSaturation: (s: number) => void;
  setValue: (v: number) => void;
  hex: string;
}

const ColorSquarePicker: React.FC<ColorSquarePickerProps> = ({
  hue,
  saturation,
  value,
  setSaturation,
  setValue,
  hex,
}) => {
  const squareRef = useRef<HTMLDivElement>(null);

  const updateSquare = (e: MouseEvent) => {
    if (!squareRef.current) return;
    const { left, top, width, height } =
      squareRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - left, 0), width);
    const y = Math.min(Math.max(e.clientY - top, 0), height);

    setSaturation(x / width);
    setValue(1 - y / height);
  };

  const handleMouseDown = useDrag(updateSquare);

  return (
    <div
      ref={squareRef}
      onMouseDown={handleMouseDown}
      className="w-64 h-64 border relative overflow-hidden border-black dark:border-white rounded cursor-crosshair"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div
        className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none"
        style={{
          left: `${saturation * 100}%`,
          top: `${(1 - value) * 100}%`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 4px rgba(0,0,0,0.5)",
          backgroundColor: hex,
        }}
      />
    </div>
  );
};

export default ColorSquarePicker;