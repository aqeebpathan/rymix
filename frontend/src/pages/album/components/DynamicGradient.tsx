import { useState, useEffect } from "react";

const DynamicGradient = () => {
  const [fromColor, setFromColor] = useState("");

  useEffect(() => {
    setFromColor(getRandomColor());
  }, []);

  return (
    <div
      className="absolute inset-0 bg-gradient-to-b via-neutral-400 to-neutral-800/40 pointer-events-none transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${fromColor}E6, #2d2d2d99, #181818)`, // Soft blending
      }}
      aria-hidden="true"
    />
  );
};

const getRandomColor = () => {
  const colors = [
    // Cool tones
    "#4A90E2",
    "#50E3C2",
    "#81D4FA",
    "#00B4D8",
    "#6A0572",
    "#2D6A4F",

    // Warm tones
    "#FF6B6B",
    "#FF9F1C",
    "#FFC857",
    "#F4A261",
    "#E63946",
    "#D72638",

    // Pastels
    "#E0BBE4",
    "#FFCAD4",
    "#B5EAD7",
    "#C7CEEA",
    "#FFCB77",
    "#FAD02E",

    // Deep & rich colors
    "#8338EC",
    "#06D6A0",
    "#EF476F",
    "#118AB2",
    "#073B4C",
    "#8D99AE",

    // Unique and modern tones
    "#F77F00",
    "#8E44AD",
    "#3498DB",
    "#E74C3C",
    "#1A936F",
    "#A29BFE",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export default DynamicGradient;
