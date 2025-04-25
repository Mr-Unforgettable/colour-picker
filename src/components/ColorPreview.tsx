import React from "react";

interface ColorPreviewProps {
  rgb: { r: number; g: number; b: number };
  alpha: number;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ rgb, alpha }) => {
  return (
    <div
      className="w-32 h-32 border border-white rounded shadow"
      style={{
        backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`,
      }}
    />
  );
};

export default ColorPreview;
