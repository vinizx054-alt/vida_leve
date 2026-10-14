import React from 'react';

interface CaktoLogoProps {
  className?: string;
  size?: number;
}

export const CaktoLogo: React.FC<CaktoLogoProps> = ({ className = 'w-6 h-6', size }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`inline-block shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cakto vibrant green rounded square */}
      <rect width="100" height="100" rx="24" fill="#00A868" />

      {/* Cactus base/ground puddle */}
      <ellipse cx="50" cy="74.5" rx="19" ry="4" fill="#0B1318" />

      {/* Main vertical trunk */}
      <rect x="41" y="22" width="18" height="51" rx="9" fill="#0B1318" />

      {/* Left arm */}
      <rect x="23" y="42" width="11" height="18" rx="5.5" fill="#0B1318" />
      <path d="M 28 53 H 45 V 61 H 33 C 29 61 27 59 27 56 Z" fill="#0B1318" />

      {/* Right arm (higher) */}
      <rect x="66" y="29" width="11" height="22" rx="5.5" fill="#0B1318" />
      <path d="M 50 43 H 72 V 51 C 72 54.5 69.5 56.5 66 56.5 H 50 Z" fill="#0B1318" />
    </svg>
  );
};
