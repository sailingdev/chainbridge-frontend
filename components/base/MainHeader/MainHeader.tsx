import React, { useState } from 'react';
import Link from 'next/link';
import style from './MainHeader.module.scss';
import LogoTernoaBridge from 'components/assets/LogoTernoaBridge';
import Hamburger from 'components/assets/Hamburger';
import Setting from 'components/assets/Setting';
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';
import { middleEllipsis, formatCaps } from 'utils/strings';
import ModalMenu from '../ModalMenu';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ChainTypes } from 'interfaces';
import Stars from '../Stars';
import { actions } from 'redux/walletUser/actions';
import ClickAwayListener from 'react-click-away-listener';

export interface HeaderProps {
    setConnectModalOpen: Function;
    isWindowEthAvailable: Boolean;
    handleConnect: Function;
}

const MainHeader: React.FC<HeaderProps> = ({ setConnectModalOpen, isWindowEthAvailable, handleConnect }) => {
    const userWallet = useAppSelector((state) => state.user.userWallet)
    const dispatch = useAppDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showDisconnectButton, setShowDisconnectButton] = useState(false)
    const [isDisconnectButtonHovered, setIsDisconnectButtonHovered] = useState(false)
    return (
        <header>
            <Stars />
            <div className={style.header}>
                <Link href="/">
                    <a>
                        <LogoTernoaBridge className={style.logo} />
                    </a>
                </Link>
                <div className={"d-none d-md-block"}>
                    {!userWallet ?
                        <a className={"btn btn-outline-primary rounded-pill"} onClick={() => setConnectModalOpen(true)}>
                            Connect wallet
                        </a>
                        :
                        <>
                        <div className={"d-flex"}>
                            <div className={style.capsContainer}>
                                <div className={"d-flex py-2 px-3 align-items-center"}>
                                    <div className={style.capsAmount}>{formatCaps(userWallet.capsAmount) + " Caps"}</div>
                                    <div className={style.capsAvailable}>{"Available"}</div>
                                </div>
                            </div>
                            <ClickAwayListener onClickAway={()=>setShowDisconnectButton(false)}>
                                <div className={style.providerContainer} onClick={()=>setShowDisconnectButton(!showDisconnectButton)}>
                                    <div className={"row d-flex align-items-center"}>
                                        <div className={"col-3"}>
                                            {userWallet.networkType === "metamask" ? <Metamask /> : <WalletConnect />}
                                        </div>
                                        <div className={"col"}>
                                            <div className={"row"}>
                                                <span className={style.address}>{middleEllipsis(userWallet.address.toString())}</span>
                                            </div>
                                            <div className={"row"}>
                                                <span className={style.network}>
                                                    {`${userWallet.chainType===ChainTypes.erc20 ? 
                                                        "Ethereum" 
                                                    : 
                                                        userWallet.chainType===ChainTypes.bep20 ?
                                                            "Binance"
                                                        :
                                                            "Wrong"
                                                    } 
                                                    Network`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className={style.logoutContainer + " " + (showDisconnectButton ? "d-block" : "d-none")} 
                                        onMouseEnter={()=>setIsDisconnectButtonHovered(true)} 
                                        onMouseLeave={()=>setIsDisconnectButtonHovered(false)}
                                        onClick={() => {dispatch(actions.logout());setIsDisconnectButtonHovered(false)}}
                                    >
                                        <div className={"d-flex p-1 align-items-center " + style.logoutButton}>
                                            {!isDisconnectButtonHovered ? <img src={'/Logout.png'} className={"mx-2"}/> : <img src={'/LogoutHover.png'} className={"mx-2"}/>}
                                            Disconnect
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>
                            {/*<div className={style.settingContainer}>
                                <div className={"d-flex px-3 align-items-center"}>
                                    <Setting className={style.settingIcon} />
                                </div>
                            </div>*/}
                        </div>
                        </>
                    }
                </div>
                <div className={"d-md-none"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Hamburger className={style.hamburger + " mx-2"} />
                </div>
            </div>
            <ModalMenu
                modalMenuOpen={isMenuOpen}
                setModalMenuOpen={setIsMenuOpen}
                isWindowEthAvailable={isWindowEthAvailable}
                handleConnect={handleConnect}
            />
        </header>
    )
}

export default MainHeader;
