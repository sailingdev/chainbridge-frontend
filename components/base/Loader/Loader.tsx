import React from 'react';
import style from './Loader.module.scss'


export interface LoaderProps {
}

const Loader: React.FC<LoaderProps> = () => {
    return(
        <div className={style.ldsRing}>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Loader;