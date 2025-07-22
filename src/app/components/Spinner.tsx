"use client";
export default function Spinner({ size = 24, color = "#FFD600" }) {
  return (
    <svg
      className="animate-spin mx-auto"
      style={{ width: size, height: size, color }}
      viewBox="0 0 50 50"
    >
      <circle
        className="opacity-20"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
      />
      <circle
        className="opacity-75"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray="90 150"
        strokeLinecap="round"
      />
    </svg>
  );
}
