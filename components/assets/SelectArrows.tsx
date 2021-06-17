import React from 'react';

interface SelectArrowsProps {
  className?: string;
}

const SelectArrows: React.FC<SelectArrowsProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="12"
    height="23"
    viewBox="0 0 12 23" 
  >
	  <path d="M5.55345 22.2132L0.00560954 16.6532L1.58526 15.0725L5.55345 19.0383L9.51939 15.0725L11.1069 16.6588L5.55345 22.2132ZM1.58526 7.14077L0 5.55331L5.55345 0L11.1002 5.55892L9.52051 7.13853L5.55345 3.1738L1.58638 7.13965L1.58526 7.14077Z" fill="white"/>
  </svg>
);

export default SelectArrows;
