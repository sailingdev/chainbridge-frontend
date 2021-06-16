import React, { useState } from 'react';
import Link from 'next/link';
import style from './MainHeader.module.scss';
import LogoTernoaBridge from 'components/assets/LogoTernoaBridge';
import Hamburger from 'components/assets/Hamburger';
import Setting from 'components/assets/Setting';
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';
import ModalMenu from 'components/base/ModalMenu'
import { middleEllipsis, formatCaps } from 'utils/strings';
import { UserType } from 'interfaces/index';

export interface HeaderProps {
    user: UserType | null;
    setUser: Function;
}

const MainHeader: React.FC<HeaderProps> = ({ user, setUser }) => {
    const [modalMenuOpen, setModalMenuOpen] = useState(false)
    let isNetworkEth = true
    let isMetamaskConnection = true

    return (
        <>
            <div className={style.Header}>
                <Link href="/">
                    <a>
                        <LogoTernoaBridge className={style.Logo}/>
                    </a>
                </Link>
                <div className={"d-none d-md-block"}>
                    {!user ?
                        <a className={"btn btn-outline-primary rounded-pill"} onClick={()=>setUser({walletId:"0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", capsAmount: 350000})}>
                            Connect wallet
                        </a>
                    :
                        <div className={"d-flex"}>
                            <div className={style.CapsContainer}>
                                <div className={"d-flex py-2 px-3 align-items-center"}>
                                    <div className={style.CapsAmount}>{formatCaps(user.capsAmount) + " Caps"}</div>
                                    <div className={style.CapsAvailable}>{"Available"}</div>
                                </div>
                            </div>
                            <div className={style.ProviderContainer}>
                                <div className={"row d-flex align-items-center"}>
                                    <div className={"col-3"}>
                                        {isMetamaskConnection ? <Metamask className=""/> : <WalletConnect className=""/>}
                                    </div>
                                    <div className={"col"}>
                                        <div className={"row"}>
                                            <span className={style.Address}>{middleEllipsis(user.walletId)}</span>
                                        </div>
                                        <div className={"row"}>
                                            <span className={style.Network}>{`${isNetworkEth ? "Ethereum" : "Binance"} Network`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.SettingContainer}>
                                <div className={"d-flex py-2 px-3 align-items-center"}  onClick={()=>setUser(null)}>
                                    <Setting className={style.SettingIcon}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={"d-md-none"} onClick={()=>setModalMenuOpen(true)}>
                    <Hamburger className={style.Hamburger} />
                </div>
                {/*<ModalMenu
                    modalMenuOpen={modalMenuOpen}
                    setModalMenuOpen={setModalMenuOpen}
                    user={user}
                />*/}
            </div>
        </>
    )
}

export default MainHeader;
