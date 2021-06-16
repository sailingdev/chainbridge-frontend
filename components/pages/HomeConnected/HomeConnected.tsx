import React, { useState, useEffect } from 'react';
import style from './HomeConnected.module.scss';
import ArrowRight from 'components/assets/ArrowRight';
import ArrowDown from 'components/assets/ArrowDown';
import NetworkSelect from 'components/base/Select/NetworkSelect';
import { UserType } from 'interfaces/index';
import { middleEllipsis, formatCaps } from 'utils/strings';

export interface HeaderProps {
    user: UserType;
}

const HomeNotConnected: React.FC<HeaderProps> = ({ user }) => {
    const options = [
        {value:0, label:"Ethereum network (ERC20)"},
        {value:1, label:"Binance Smart Chain (BEP20)"}
    ]
    const [selectedOptionFrom, setSelectedOptionFrom] = useState(0)
    const [capsToSwap, setCapsToSwap] = useState(user.capsAmount)
    const handleChange = (value:number, isFrom: boolean) => {
        if (isFrom){
            setSelectedOptionFrom(value)
        }else{
            setSelectedOptionFrom(options.filter(x=> x.value !== value)[0].value)
        }
    }
    return (
        <div className={"container py-md-6 py-4 d-flex flex-column align-items-center"}>
            <div className={style.intro}>The safe, fast and most secure way to swap Caps to binance smart chain.</div>
            <div className={style.swapAddressLabel}>The swap will occur on your same adress</div>
            <div className={style.address}>{middleEllipsis(user.walletId,24)}</div>
            <div className={"container pt-5 pb-3"}>
                <div>
                    <div className={"row"}>
                        <div className={"col-12 col-md-5"}>
                            <span className={style.networkLabel}>From</span>
                            <NetworkSelect
                                options={options}
                                selected={selectedOptionFrom}
                                handleChange={handleChange}
                                isFrom={true}
                            />
                        </div>
                        <div className={"col-12 col-md-2 d-flex flex-column justify-content-center"}>
                            <div className={"align-self-center"}>
                                <ArrowRight className={"d-none d-md-block"}/>
                                <ArrowDown className={"d-block d-md-none"}/>
                            </div>
                        </div>
                        <div className={"col-12 col-md-5"}>
                            <span className={style.networkLabel}>To</span>
                            <NetworkSelect
                                options={options}
                                selected={options.filter(x=> x.value !== selectedOptionFrom)[0].value}
                                handleChange={handleChange}
                                isFrom={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.addNetwork}>
                <span className={style.addNetworkLabel}>{"If you have not add Binance Smart Chain network in your MetaMask yet, please click "}</span>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener"
                    className={style.addNetworkButton}
                >
                    Add Network
                </a>
                <span className={style.addNetworkLabel}>{" and continue."}</span>
            </div>

            <div className={"container d-flex justify-content-center"}>
                <div className={style.amountContainer}>
                    <div className={style.amountLabel}>Amount</div>
                    <div className={"row d-flex align-items-center px-3"}>
                        <div className={"col-10 " + style.capsAmount}>
                            {formatCaps(capsToSwap) + " CAPS"}
                        </div>
                        <div className={"col-2"}  onClick={()=>setCapsToSwap(user.capsAmount)}>
                            <div className={"badge badge-pill " + style.maxButton}>
                                Max
                            </div>
                        </div>
                    </div>
                    <hr className={style.divider}/>
                    <div className={style.sliderContainer}>
                        {/*<div className={style.sliderBubble} style={{left: ((capsToSwap / user.capsAmount)*100)+"%"}}>
                            {formatCaps(capsToSwap) + " CAPS"}
                        </div>*/}
                        <div className={"row d-flex align-items-center"}>
                            <div className={"col " + style.rangeLegend}>
                                0 CAPS
                            </div>
                            <div className={"col " + style.rangeLegendRight}>
                                {formatCaps(user.capsAmount) + " CAPS"}
                            </div>
                        </div>
                        <input 
                            type="range" 
                            className={style.slider}
                            min={0}
                            max={user.capsAmount}
                            value={capsToSwap}
                            onChange={(event) => setCapsToSwap(Number(event.target.value))}
                        />
                        <div className={"row d-flex align-items-bottom pt-2"}>
                            <div className={"col " + style.rangeLegend}>
                                min
                            </div>
                            <div className={"col " + style.rangeLegendRight}>
                                max
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default HomeNotConnected;
