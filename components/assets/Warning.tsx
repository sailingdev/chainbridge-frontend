import React from 'react';

interface WarningProps {
  className?: string;
}

const Warning: React.FC<WarningProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="66"
    height="57" 
    viewBox="0 0 66 57"
  >
    <path
      d="M33 0L0 57H66L33 0ZM33 11.97L55.59 51H10.41L33 11.97ZM30 42H36V48H30V42ZM30 24H36V36H30V24Z"
      fill="#FF204B"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="-9.35266e-07"
        y1="29.1667"
        x2="65.9357"
        y2="29.1667"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF7F05" />
        <stop offset="1" stopColor="#FF204B" />
      </linearGradient>
    </defs>
  </svg>
);

export default Warning;
