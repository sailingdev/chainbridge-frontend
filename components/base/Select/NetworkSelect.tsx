import React from 'react';
import style from './NetworkSelect.module.scss'
import SelectArrows from 'components/assets/SelectArrows';
import Check from 'components/assets/Check';
import Ethereum from 'components/assets/Networks/Ethereum';
import Binance from 'components/assets/Networks/Binance';


export interface Option{
    value:number;
    label:string;
}

export interface NetworkSelectProps {
    options: Option[];
    selected: number;
    handleChange: Function;
    isFrom: boolean;
    network?: string;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ options, selected, handleChange, isFrom, network }) => {
    return(
        <div className={style.selectContainer}>
            <select
                value={selected}
                onChange={e => handleChange(Number(e.target.value), isFrom)}
                className={style.select}
            >
                {options.map((option,i) => {
                    return (
                        <option 
                            key={i} 
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default NetworkSelect;
 
