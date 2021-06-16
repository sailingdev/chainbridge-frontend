import React from 'react';

interface EthereumProps {
  className: string;
}

const Ethereum: React.FC<EthereumProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="36"
    height="36"
    viewBox="0 0 36 36" 
  >
    <path opacity="0.2" d="M36 17.6246C36 27.3585 27.9412 35.2494 18.0001 35.2494C8.05887 35.2494 0 27.3585 0 17.6246C0 7.89079 8.05887 0 18.0001 0C27.9411 0 36 7.89079 36 17.6246Z" fill="#505050"/>
    <g opacity="0.8">
      <path d="M17.9425 9.44678L17.8313 9.81679V20.5536L17.9425 20.6623L23.0326 17.7163L17.9425 9.44678Z" fill="white"/>
      <path d="M17.9424 9.44678L12.8523 17.7163L17.9424 20.6624V15.451V9.44678Z" fill="white"/>
      <path d="M17.9425 22.2839L17.8799 22.3586V26.1834L17.9425 26.3625L23.0357 19.3394L17.9425 22.2839Z" fill="white"/>
      <path d="M17.9426 26.3626V22.2839L12.8525 19.3394L17.9426 26.3626Z" fill="white"/>
      <path d="M17.9429 20.6624L23.0329 17.7165L17.9429 15.4512V20.6624Z" fill="white"/>
      <path d="M12.8525 17.7165L17.9426 20.6625V15.4512L12.8525 17.7165Z" fill="white"/>
    </g>
  </svg>
);

export default Ethereum;
