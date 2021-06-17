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
import { UserType } from 'interfaces/index';

export interface ModalMenuProps {
    modalMenuOpen: boolean;
    setModalMenuOpen: Function;
    user: UserType | null;
}

const ModalMenu: React.FC<ModalMenuProps> = ({ modalMenuOpen, setModalMenuOpen, user }) => {
    const router = useRouter();
    const handleClose = () => {
        setModalMenuOpen(false)
    }
    const navigateLogin = () => {
        handleClose()
        router.push('home-not-connected')
    }
    const test = {
        walletId: "1234567859123456789123456789",
        capsAmount: 300000,
        networkType: "metamask",
        chainType: 0,
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

                        {(user || test) ? 
                            <>
                                <div className={"row py-4"}>
                                    <div className={style.capsAmount}>{formatCaps(test.capsAmount) + " CAPS"}</div>
                                    <div className={style.capsAvailable}>Available</div>
                                </div>
                                <div className={"row py-4"}>
                                    <div>
                                        {test.networkType==="metamask" ? <Metamask/> : <WalletConnect/>}
                                        <span className={style.network}>
                                            {`${test.chainType===0 ? "Ethereum" : "Binance"} Network`}
                                        </span>
                                    </div>
                                    <div className={style.address}>
                                        {middleEllipsis(test.walletId, 24)}
                                    </div>
                                </div>
                            </>
                        :
                            <>
                                <div className={"row py-5 px-4"}>
                                    <div className={"btn btn-outline-primary rounded-pill"} onClick={() => navigateLogin()}>
                                        Log in
                                    </div>
                                </div>
                            </>
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
                        {(user || test) && 
                            <div className={"row py-5 px-4"}>
                                <div className={"btn btn-outline-primary rounded-pill"}>Log out</div>
                            </div>
                        }
                    </div>


                </ClickAwayListener>
            }
        </>
    )
}

export default ModalMenu;
 
