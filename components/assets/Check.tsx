import React from 'react';

interface CheckProps {
  className: string;
}

const Check: React.FC<CheckProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="14"
    height="11"
    viewBox="0 0 14 11" 
  >
	  <path d="M4.33548 8.20645L1.08387 4.95484L0 6.03871L4.33548 10.3742L13.6258 1.08387L12.5419 0L4.33548 8.20645Z" fill="#14FFC6"/>
  </svg>
);

export default Check;
