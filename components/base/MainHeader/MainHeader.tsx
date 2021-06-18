import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import style from './MainHeader.module.scss';
import LogoTernoaBridge from 'components/assets/LogoTernoaBridge';
import Hamburger from 'components/assets/Hamburger';
import Setting from 'components/assets/Setting';
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';
import { middleEllipsis, formatCaps } from 'utils/strings';
import ModalMenu from '../ModalMenu';
import { useAppSelector } from 'redux/hooks';
import { ChainTypes } from 'interfaces';

export interface HeaderProps {
    capsAmount: number;
}

const MainHeader: React.FC<HeaderProps> = ({ capsAmount }) => {
    const userWallet = useAppSelector((state) => state.user.userWallet)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter();
    return (
        <>
            <div className={style.Header}>
                <Link href="/">
                    <a>
                        <LogoTernoaBridge className={style.Logo} />
                    </a>
                </Link>
                <div className={"d-none d-md-block"}>
                    {!userWallet ?
                        <a className={"btn btn-outline-primary rounded-pill"} onClick={() => router.push('home-not-connected')}>
                            Connect wallet
                        </a>
                        :
                        <div className={"d-flex"}>
                            <div className={style.CapsContainer}>
                                <div className={"d-flex py-2 px-3 align-items-center"}>
                                    <div className={style.CapsAmount}>{formatCaps(capsAmount) + " Caps"}</div>
                                    <div className={style.capsAvailable}>{"Available"}</div>
                                </div>
                            </div>
                            <div className={style.ProviderContainer}>
                                <div className={"row d-flex align-items-center"}>
                                    <div className={"col-3"}>
                                        {userWallet.networkType==="metamask" ? <Metamask /> : <WalletConnect />}
                                    </div>
                                    <div className={"col"}>
                                        <div className={"row"}>
                                            <span className={style.Address}>{middleEllipsis(userWallet.address.toString())}</span>
                                        </div>
                                        <div className={"row"}>
                                            <span className={style.Network}>{`${userWallet.chainType===ChainTypes.erc20 ? "Ethereum" : "Binance"} Network`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.SettingContainer}>
                                <div className={"d-flex px-3 align-items-center"}>
                                    <Setting className={style.SettingIcon} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={"d-md-none"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Hamburger className={style.Hamburger + " mx-2"} />
                </div>
            </div>
            <ModalMenu
                modalMenuOpen={isMenuOpen}
                setModalMenuOpen={setIsMenuOpen}
                capsAmount={capsAmount}
            />
        </>
    )
}

export default MainHeader;
