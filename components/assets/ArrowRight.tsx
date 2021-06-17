import React from 'react';

interface ArrowRightProps {
  className?: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="22"
    height="22"
    viewBox="0 0 24 22" 
  >
	  <path d="M23.1467 10.5587L12.9267 0.372677C12.32 -0.231975 11.8067 -0.0459281 11.8067 0.837793V7.11686H0.653333C0.28 7.11686 0 7.39593 0 7.76803V14.2797C0 14.6517 0.28 14.9308 0.653333 14.9308H11.8067V21.2099C11.8067 22.0936 12.32 22.2797 12.9267 21.675L23.1467 11.489C23.4267 11.2099 23.4267 10.7913 23.1467 10.5587Z" fill="white"/>
  </svg>
);

export default ArrowRight;
