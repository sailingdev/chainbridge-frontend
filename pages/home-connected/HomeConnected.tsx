import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import style from './HomeConnected.module.scss';
import ArrowRight from 'components/assets/ArrowRight';
import ArrowDown from 'components/assets/ArrowDown';
import MainHeader from 'components/base/MainHeader';
import Footer from 'components/base/Footer';
import Stars from 'components/assets/Stars';
import NetworkSelect from 'components/base/Select/NetworkSelect';
import ConfirmTransaction from '../ConfirmTransaction';
import { UserType } from 'interfaces/index';
import { middleEllipsis, formatCaps } from 'utils/strings';
import { Option, options } from 'components/base/Select/NetworkSelect'

export interface HeaderProps {
    user: UserType;
    setUser: Function;
}

const HomeConnected: React.FC<HeaderProps> = ({ user, setUser }) => {
    const capsAmount = user?.capsAmount || 0;
    const [capsToSwap, setCapsToSwap] = useState(capsAmount)
    const [popupConfirmationOpen, setPopupConfirmationOpen] = useState(false)
    const [selectedOptionFrom, setSelectedOptionFrom] = useState(options[0])
    const handleChange = (option: Option, isFrom: boolean) => {
        if (isFrom) {
            setSelectedOptionFrom(option)
        } else {
            setSelectedOptionFrom(options.filter(x => x.value !== option.value)[0])
        }
    }
    const isAbleToSwap = capsToSwap && capsAmount && capsToSwap > 0 && capsToSwap <= capsAmount
    return (
        <>
        <Head>
            <title>BSC ETH Bridge</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="BSC ETH Bridge, by Ternoa." />
        </Head>
        <div className={"mainContainer"}>
            <MainHeader user={user} setUser={setUser}/>
            <div className={"container py-md-6 py-4 d-flex flex-column align-items-center"}>
                <div className={style.intro}>The safe, fast and most secure way to swap Caps to binance smart chain.</div>
                <div className={style.swapAddressLabel}>The swap will occur on your same adress</div>
                <div className={style.address}>{user?.walletId && middleEllipsis(user?.walletId, 24)}</div>
                <div className={"container py-2 pt-md-4 pb-md-3"}>
                    <div className={"row d-flex justify-content-center"}>
                        <div className={"col-12 col-md-auto px-0"}>
                            <span className={style.networkLabel}>From</span>
                            <NetworkSelect
                                selected={selectedOptionFrom}
                                handleChange={handleChange}
                                isFrom={true}
                            />
                        </div>
                        <div className={style.middleArrow + " col-12 col-md-1"}>
                            <div className={"align-self-center "}>
                                <ArrowRight className={"d-none d-md-block"} />
                                <ArrowDown className={"d-block d-md-none"} />
                            </div>
                        </div>
                        <div className={"col-12 col-md-auto px-0"}>
                            <span className={style.networkLabel}>To</span>
                            <NetworkSelect
                                selected={options.filter(x => x.value !== selectedOptionFrom.value)[0]}
                                handleChange={handleChange}
                                isFrom={false}
                            />
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
                <div className={"container d-flex justify-content-center px-0"}>
                    <div className={style.amountContainer}>
                        <div className={"px-2 pt-2 px-md-3 pt-md-3"}>Amount</div>
                        <div className={"row d-flex align-items-center px-2 pb-2 px-md-3 pb-md-0"}>
                            <div className={"col-10"}>
                                <span className={style.capsAmount}>{formatCaps(capsToSwap) + " CAPS"}</span>
                            </div>
                            <div className={"col-2"} onClick={() => setCapsToSwap(capsAmount)}>
                                <div className={"badge badge-pill " + style.maxButton}>
                                    Max
                                </div>
                            </div>
                        </div>
                        <div className={"d-none d-md-block"}>
                            <hr className={style.divider} />
                            <div className={style.sliderContainer}>
                                <div className={"row d-flex align-items-center"}>
                                    <div className={"col " + style.rangeLegend}>
                                        0 CAPS
                                    </div>
                                    <div className={"col " + style.rangeLegendRight}>
                                        {formatCaps(capsAmount) + " CAPS"}
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    className={style.slider}
                                    min={0}
                                    max={capsAmount}
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
                <div className={"pt-3"}>
                    <div className={`btn btn-primary rounded-pill ${isAbleToSwap ? "" : ""/*disabled */}`} onClick={(() => setPopupConfirmationOpen(true))}>
                        <div className={"d-flex align-items-center px-5 mx-5"}>
                            <span className={style.buttonLabel}>Next</span>
                        </div>
                    </div>
                </div>
                <ConfirmTransaction
                    open={popupConfirmationOpen}
                    setOpen={setPopupConfirmationOpen}
                    user={{walletId:"123456789", capsAmount:3000000, networkType:"metamask", chainType:0}}
                    capsToSwap={250000}
                    from={selectedOptionFrom}
                />
            </div>
            <Footer/>
            <Stars className={"stars"}/>
        </div>
      </>
    )
}

export default HomeConnected;
