import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import style from './NetworkSelect.module.scss'
import SelectArrows from 'components/assets/SelectArrows';
import Check from 'components/assets/Check';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'
import Ethereum from 'components/assets/Networks/Ethereum';
import Binance from 'components/assets/Networks/Binance';


export interface Option{
    value:number;
    label:string;
}

export interface NetworkSelectProps {
    options: Option[];
    selected: Option;
    handleChange: Function;
    isFrom: boolean;
    networkConnected?: string;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ options, selected, handleChange, isFrom, networkConnected }) => {
    const [selectOpen, setSelectOpen] = useState(false)
    const notSelected = options.filter(x => x.value !== selected.value)[0]
    const handleSelectChange = () => {
        handleChange(notSelected, isFrom)
        setSelectOpen(false)
    }
    return(
        <>
            <div className={style.selectContainer}>
                <div className={style.networkRow + " " + (!selectOpen ? style.networkRowRadius : "") + " row d-flex align-items-center"}>
                    <div className={style.selectColumn + " col-10"}>
                        <div className={style.selectColumnRow + " row"}>
                            <div className={"col-10 col-md-8 px-2 d-flex align-items-center"}>
                                <div>{selected.value ===0 ? <Ethereum className={"mx-1"}/> : <Binance className={"mx-1"}/>}</div>
                                <div>{selected.label}</div>
                            </div>
                            {!networkConnected &&
                                <div className={"col-2 col-md-4 px-0 d-flex justify-content-center justify-content-md-left align-items-center"}>
                                    {networkConnected==="walletconnect"  ? <WalletConnect className={style.connectedIcon}/> : <Metamask className={style.connectedIcon}/>}
                                    <span className={style.connectedLabel}>{"Connected"}</span>
                                    <Check className={style.connectedCheck}/>
                                </div>
                            }
                        </div>
                    </div>
                    <div 
                        className={style.selectArrows + " " + (!selectOpen ? style.selectArrowsRadius : "") + " col-2"} 
                        onClick={()=>setSelectOpen(!selectOpen)}
                    >
                        <SelectArrows />
                    </div>
                </div>
                <div className={selectOpen ? style.optionContainer : "d-none"} onClick={() => handleSelectChange()}>
                    <ClickAwayListener onClickAway={()=>selectOpen && setSelectOpen(false)}>
                        <div className="col-10 px-2">
                                <div className={style.selectColumnRow + " row"}>
                                    <div className={"col-10 col-md-8 d-flex align-items-center"}>
                                        <div>{notSelected.value === 0 ? <Ethereum className={"mx-1"}/> : <Binance className={"mx-1"}/>}</div>
                                        <div>{notSelected.label}</div>
                                    </div>
                                </div>
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
                
        </>
    )
}

export default NetworkSelect;