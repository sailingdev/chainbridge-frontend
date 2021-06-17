import React, { useState } from 'react';
import style from './ConfirmTransaction.module.scss';
import Close from 'components/assets/Close';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'
import Ethereum from 'components/assets/Networks/Ethereum';
import Binance from 'components/assets/Networks/Binance';
import Check from 'components/assets/Check';
import Caps from 'components/assets/Caps';
import { UserType } from 'interfaces';
import { formatCaps, middleEllipsis } from 'utils/strings';
import { Option, options } from 'components/base/Select/NetworkSelect'

export interface ConfirmTransactionProps {
    open: boolean;
    setOpen: Function;
    user: UserType;
    capsToSwap: number;
    from: Option
}

const NetworkRow = (option:Option, user: UserType) => {
    return (
        <div className={style.networkContainer}>
            <div className={"row " + style.networkRow}>
                <div className={"col-8 d-flex align-items-center"}>
                    <div>{option.value ===0 ? <Ethereum className={"mx-1"}/> : <Binance className={"mx-1"}/>}</div>
                    <div>{option.label}</div>
                </div>
                {user && user.chainType===option.value && 
                    <div className={"col-4 d-flex align-items-center justify-content-center"}>
                        {user && user.networkType==="walletconnect" ? <WalletConnect className={style.connectedIcon}/> : <Metamask className={style.connectedIcon}/>}
                        <span className={style.connectedLabel}>{"Connected"}</span>
                        <Check className={style.connectedCheck}/>
                    </div>
                }
            </div>
        </div>
    )
}

const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({ open, setOpen, user, capsToSwap, from }) => {
    const [isTermAccepted, setIsTermAccepted] = useState(false)
    const to = options.filter(x => x.value !== from.value)[0]
    const canConfirmTransaction = user && isTermAccepted && capsToSwap > 0 && capsToSwap <= user.capsAmount
    return (
        <>
        {open && 
            <div className={style.wrapper}>
                <div className={style.confirmTransactionContainer}>
                    <div className={"container py-2 px-2"}>
                        <div className={"row"}>
                            <div onClick={() => setOpen(false)}><Close className={style.closeButton}/></div>
                        </div>
                        <div className={"row d-flex justify-content-center text-center"}>
                            <span className={style.title}>Confirmation</span>
                            <hr className={style.divider}/>
                        </div>
                        <div className={"row d-flex text-center"}>
                            <div className={style.capsAmountContainer}>
                                <span className={style.capsAmount}>{`${formatCaps(capsToSwap)} CAPS`}</span>
                            </div>
                        </div>
                        <div className={"row px-4 pt-md-4 pt-2"}>
                            <span className={style.networkTitle}>From</span>
                            {NetworkRow(from, user)}
                        </div>
                        <div className={"row px-4 pt-md-4 pt-2"}>
                            <span className={style.networkTitle}>To</span>
                            {NetworkRow(to, user)}
                        </div>
                        <div className={"row py-4 px-4"}>
                            <div className={"col-6 " + style.leftLabel}>Asset</div>
                            <div className={"col-6 " + style.rightLabel}>
                                <Caps className={style.gridIcon}/> {` CAPS`}
                            </div>
                            <div className={"col-6 " + style.leftLabel}>Destination</div>
                            <div className={"col-6 " + style.rightLabel}>
                                {user && user.networkType==="walletconnect" ? 
                                    <WalletConnect className={style.gridIcon + " " + style.connectedIcon}/>
                                : 
                                    <Metamask className={style.gridIcon + " " + style.connectedIcon}/>
                                }
                                {user && middleEllipsis(user.walletId)}
                            </div>
                            <div className={"col-6 " + style.leftLabel}>Network fee</div>
                            <div className={"col-6 " + style.rightLabel}>
                                0.001 Eth
                            </div>
                            <div className={"col-6 " + style.leftLabel}>You will receive</div>
                            <div className={"col-6 " + style.rightLabel}>
                                <Caps className={style.gridIcon}/> {` ${formatCaps(capsToSwap)} CAPS`}
                            </div>
                        </div>
                        <div className={"row px-4"}>
                            <span className={style.feeWarningLabel}>The network fees and execution price depend on the market condition,  you may get a different rate when the transaction is complete</span>
                        </div>
                        <div className={"row pt-4 px-4 d-flex align-items-center"}>
                                <div className={"col-1 " + style.radioButton + " " + (isTermAccepted ? style.radioButtonChecked : "")} onClick={() => setIsTermAccepted(!isTermAccepted)}></div>
                                <div className={"col-11 " +style.termsLabel}>I have read and agree to the <a href="#">terms</a></div>
                        </div>
                        <div className={"row py-3 px-4"}>
                            <div className={"btn btn-outline-primary rounded-pill " + style.buttonLabel + " " + (canConfirmTransaction ? "" : "disabled")}>
                                CONFIRM TRANSACTION
                            </div>
                        </div>
                        <div className={"row d-flex justify-content-center"}>
                            <span className={style.capsAddressLabel}>You will receive your CAPS on the same address. Only the network will change.</span>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ConfirmTransaction;
