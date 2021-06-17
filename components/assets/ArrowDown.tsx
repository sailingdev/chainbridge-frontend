import React from 'react';

interface ArrowDownProps {
  className?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="16"
    height="19"
    viewBox="0 0 16 19" 
  >
	  <path d="M8.32073 18.848L15.7287 10.526C16.1685 10.032 16.0332 9.614 15.3905 9.614L10.8239 9.614L10.8239 0.532C10.8239 0.228 10.6209 -2.34465e-07 10.3503 -2.46294e-07L5.61461 -4.53298e-07C5.344 -4.65127e-07 5.14104 0.228 5.14104 0.532L5.14104 9.614L0.574455 9.614C-0.0682492 9.614 -0.203555 10.032 0.23619 10.526L7.6442 18.848C7.84716 19.076 8.1516 19.076 8.32073 18.848Z" fill="white"/>
  </svg>
);

export default ArrowDown;
