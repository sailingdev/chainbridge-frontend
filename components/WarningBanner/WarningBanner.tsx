import React from 'react';
import style from './WarningBanner.module.scss';

export interface WarningBannerProps {
}


const WarningBanner: React.FC<WarningBannerProps> = () => {
    return (
        <div className={style.warningBanner}>
            Warning: this bridge is currently being audited. Use it at your own risks.
        </div>
    )
}

export default WarningBanner;
