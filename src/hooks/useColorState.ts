import { useState, useEffect } from "react";
import { hsvToRgb, rgbToHsl, rgbToHsv, rgbToHex } from "../utils/colorUtils";
import colorName from 'color-namer';

const useColorState = () => {
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(1);
  const [value, setValue] = useState<number>(1);
  const [alpha, setAlpha] = useState<number>(1);

  const rgb = hsvToRgb(hue, saturation, value);
  const hsl = rgbToHsl(rgb.r, rgb.b, rgb.b);
  const hex = rgbToHex(rgb);
  const name = colorName(hex).basic[0]?.name;

  const [inputHex, setInputHex] = useState<string>(hex);

  useEffect(() => {
    setInputHex(hex);
  }, [hex]);

  const handleColorChange = (newColor: string) => {
    // Validate the hex input
    if (!newColor || !/^#[0-9A-F]{6}$/i.test(newColor)) {
      setInputHex(newColor);
      return;
    }

    // Proceed only if the color is valid
    const r = parseInt(newColor.slice(1, 3), 16);
    const g = parseInt(newColor.slice(3, 5), 16);
    const b = parseInt(newColor.slice(5, 7), 16);

    const hsv = rgbToHsv(r, g, b);
    setHue(hsv.h);
    setSaturation(hsv.s);
    setValue(hsv.v);
    setInputHex(newColor);
  };

  return {
    hsv: { hue, setHue, saturation, setSaturation, value, setValue },
    alphaState: { alpha, setAlpha },
    computed: { rgb, hex, hsl, name },
    inputHex,
    handleColorChange,
  };
};

export default useColorState;
