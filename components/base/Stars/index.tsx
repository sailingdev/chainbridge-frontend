import React from 'react';
import style from './Stars.module.scss';

interface StarsProps {
	className?: string;
}

const Stars: React.FC<StarsProps> = ({ }) => (
	<><div id="stars2" className={style.stars2}></div>
		<div id="stars3" className={style.stars3}></div>
	</>
);

export default Stars;
