import React, { useState } from 'react';
import Link from 'next/link';
import style from './MainHeader.module.scss';
import LogoTernoaBridge from 'components/assets/LogoTernoaBridge';
import Hamburger from 'components/assets/Hamburger';
import Setting from 'components/assets/Setting';
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';
import { middleEllipsis, formatCaps } from 'utils/strings';
import { useRouter } from 'next/router'
import { UserWallet } from 'interfaces';

export interface HeaderProps {
    user: UserWallet | null;
    setUser: Function;
}

const MainHeader: React.FC<HeaderProps> = ({ user, setUser }) => {
    let isNetworkEth = true
    let isMetamaskConnection = true
    const router = useRouter();
    const handleMenuClick = () => {

    }
    return (
        <>
            <div className={style.Header}>
                <Link href="/">
                    <a>
                        <LogoTernoaBridge className={style.Logo} />
                    </a>
                </Link>
                <div className={"d-none d-md-block"}>
                    {!user ?
                        <a className={"btn btn-outline-primary rounded-pill"} onClick={() => router.push('home-not-connected')}>
                            Connect wallet
                        </a>
                        :
                        <div className={"d-flex"}>
                            <div className={style.CapsContainer}>
                                <div className={"d-flex py-2 px-3 align-items-center"}>
                                    <div className={style.CapsAmount}>{formatCaps(user.balance) + " Caps"}</div>
                                    <div className={style.CapsAvailable}>{"Available"}</div>
                                </div>
                            </div>
                            <div className={style.ProviderContainer}>
                                <div className={"row d-flex align-items-center"}>
                                    <div className={"col-3"}>
                                        {isMetamaskConnection ? <Metamask /> : <WalletConnect />}
                                    </div>
                                    <div className={"col"}>
                                        <div className={"row"}>
                                            <span className={style.Address}>{middleEllipsis(user.balance)}</span>
                                        </div>
                                        <div className={"row"}>
                                            <span className={style.Network}>{`${isNetworkEth ? "Ethereum" : "Binance"} Network`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.SettingContainer}>
                                <div className={"d-flex py-2 px-3 align-items-center"}>
                                    <Setting className={style.SettingIcon} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={"d-md-none"} onClick={() => handleMenuClick()}>
                    <Hamburger className={style.Hamburger} />
                </div>
            </div>
        </>
    )
}

export default MainHeader;
