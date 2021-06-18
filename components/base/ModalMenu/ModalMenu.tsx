import React from 'react';
import { useRouter } from 'next/router'
import ClickAwayListener from 'react-click-away-listener';
import style from './ModalMenu.module.scss';
import Close from 'components/assets/Close'
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';
import Swap from 'components/assets/Swap';
import VideoTutorial from 'components/assets/VideoTutorial';
import SettingMenu from 'components/assets/SettingMenu';
import Support from 'components/assets/Support';
import FAQs from 'components/assets/FAQs';
import { middleEllipsis, formatCaps } from 'utils/strings';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { actions } from 'redux/walletUser/actions';
import { ChainTypes } from 'interfaces';

export interface ModalMenuProps {
    modalMenuOpen: boolean;
    setModalMenuOpen: Function;
    capsAmount: number|string
}

const ModalMenu: React.FC<ModalMenuProps> = ({ modalMenuOpen, setModalMenuOpen, capsAmount }) => {
    const userWallet = useAppSelector((state) => state.user.userWallet)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const handleClose = () => {
        setModalMenuOpen(false)
    }
    const navigateLogin = () => {
        handleClose()
        router.push('home-not-connected')
    }
    const handleLogout = () => {
        dispatch(actions.logout())
    }
    return(
        <>
            {modalMenuOpen && 
                <ClickAwayListener onClickAway={()=>handleClose()}>
                    <div className={style.ModalContainer}>
                        <div className={"d-flex justify-content-end"}>
                            <div onClick={()=>handleClose()}>
                                <Close />
                            </div>
                        </div>
                        {(userWallet) ? 
                            <>
                                <div className={"row py-4"}>
                                    <div className={style.capsAmount}>{formatCaps(capsAmount) + " CAPS"}</div>
                                    <div className={style.capsAvailable}>Available</div>
                                </div>
                                <div className={"row py-4"}>
                                    <div>
                                        {userWallet.networkType==="walletconnect" ? <WalletConnect/> : <Metamask/>}
                                        <span className={style.network}>
                                            {`${userWallet.chainType ===ChainTypes.erc20 ? "Ethereum" : "Binance"} Network`}
                                        </span>
                                    </div>
                                    <div className={style.address}>
                                        {middleEllipsis(userWallet.address, 24)}
                                    </div>
                                </div>
                            </>
                        :
                            <div className={"row py-5 px-4"}>
                                <div className={"btn btn-outline-primary rounded-pill"} onClick={() => navigateLogin()}>
                                    Log in
                                </div>
                            </div>
                        }
                        <div className={"row py-4"}>
                            <div className={"col-12 py-2"}>
                                <span><Swap/></span>
                                <span className={style.menuLabel}><a href="#">Swap</a></span>
                            </div>
                            <div className={"col-12 py-2"}>
                                <span><VideoTutorial/></span>
                                <span className={style.menuLabel}><a href="#">Video tutorial</a></span>
                            </div>
                            <div className={"col-12 py-2"}>
                                <span><SettingMenu/></span>
                                <span className={style.menuLabel}><a href="#">Settings</a></span>
                            </div>
                            <div className={"col-12 py-2"}>
                                <span><Support/></span>
                                <span className={style.menuLabel}><a href="#">Support</a></span>
                            </div>
                            <div className={"col-12 py-2"}>
                                <span><FAQs/></span>
                                <span className={style.menuLabel}><a href="#">FAQs</a></span>
                            </div>
                        </div>
                        {(userWallet) && 
                            <div className={"row py-5 px-4"}>
                                <div className={"btn btn-outline-primary rounded-pill"} onClick={() => handleLogout()}>Log out</div>
                            </div>
                        }
                    </div>


                </ClickAwayListener>
            }
        </>
    )
}

export default ModalMenu;
 
