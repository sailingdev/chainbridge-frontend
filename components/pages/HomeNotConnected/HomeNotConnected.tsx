import React from 'react';
import Link from 'next/link';
import style from './HomeNotConnected.module.scss';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'

export interface HeaderProps {
    setUser: Function;
}

const HomeNotConnected: React.FC<HeaderProps> = ({ setUser }) => {
    return (
        <div className={"container py-md-6 py-4 d-flex flex-column align-items-center"}>
            <div className={style.intro}>The safe, fast and most secure way to swap Caps to binance smart chain.</div>
            <div className={"py-md-3 py-2"}>
                <a className={"btn btn-outline-primary rounded-pill"} onClick={()=>setUser({walletId:"0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", capsAmount: 350000})}>
                    <div className={"d-flex align-items-center px-2"}>
                        <Metamask className={"mx-3"}/>
                        <span className={style.buttonLabel}>Connect with Metamask</span>
                    </div>
                </a>
            </div>
            <div className={"py-2"}>
                <a className={"btn btn-outline-primary rounded-pill"} onClick={()=>setUser({walletId:"0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", capsAmount: 350000})}>
                    <div className={"d-flex align-items-center px-2"}>
                        <WalletConnect className={"mx-3"}/>
                        <span className={style.buttonLabel}>Connect with Wallet Connect</span>
                    </div>
                </a>
            </div>
            
        </div>
    )
}

export default HomeNotConnected;
