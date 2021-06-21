import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import style from './HomeConnected.module.scss';
import ArrowRight from 'components/assets/ArrowRight';
import ArrowDown from 'components/assets/ArrowDown';
import MainHeader from 'components/base/MainHeader';
import Footer from 'components/base/Footer';
import NetworkSelect from 'components/base/Select/NetworkSelect';
import ConfirmTransaction from 'components/ConfirmTransaction';
import GenericModal from 'components/GenericModal';
import { middleEllipsis, formatCaps } from 'utils/strings';
import { Option, options } from 'components/base/Select/NetworkSelect'
import { getProviderBalance, transfer } from 'helpers/wallet.helper';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { actions } from 'redux/walletUser/actions';
import { ChainTypes } from 'interfaces';
import { NetworkType } from 'interfaces';
import { connectMetaMask, connectWalletConnect } from 'actions/connect';
import { walletProvider } from 'helpers/wallet-connect.helper';
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';

declare let window: any;

export interface HomeConnectedProps {
}

const HomeConnected: React.FC<HomeConnectedProps> = () => {
    const dispatch = useAppDispatch()
    const userWallet = useAppSelector((state) => state.user.userWallet)
    const [capsToSwap, setCapsToSwap] = useState(0)
    const [popupConfirmationOpen, setPopupConfirmationOpen] = useState(false)
    const [popupConnectionOpen, setPopupConnectionOpen] = useState(false)
    const [selectedOptionFrom, setSelectedOptionFrom] = useState<Option | null>(options[0])
    const [isCapsInputFocused, setIsCapsInputFocused] = useState(false)
    const [isWindowEthAvailable, setIsWindowEthAvailable] = useState(false)
    const isAbleToSwap = capsToSwap && userWallet && userWallet.capsAmount && capsToSwap > 0 && capsToSwap <= userWallet.capsAmount
    let maskedTextInput:any = null;
    const updateProviderBalance = async () => {
        if (userWallet) {
            console.log('updateProviderBalance');
            const providerBalance = await getProviderBalance(userWallet.signer, selectedOptionFrom)
            console.log('providerBalance', providerBalance.toString());
            dispatch(actions.setCapsAmount(Number(providerBalance.toString())))
        }
    }
    useEffect(()=>{
        setIsWindowEthAvailable(typeof window !== "undefined" && window.ethereum ? true : false)
    })
    useEffect(() => {
        updateProviderBalance()
        setCapsToSwap(0)
    }, [selectedOptionFrom?.value])
    const handleChange = (option: Option, isFrom: boolean) => {
        if (isFrom) {
            setSelectedOptionFrom(option)
        } else {
            const firstOption = options.find(x => x.value !== option.value) || null
            setSelectedOptionFrom(firstOption)
        }
    }
    const handleTransfer = async () => {
        const amount = Number(capsToSwap);
        const transaction = await transfer(userWallet.signer, selectedOptionFrom, amount)
        setPopupConfirmationOpen(false)
        const receipt = await transaction.wait()
        updateProviderBalance();
    }
    const handleConnect = async (network: NetworkType) => {
        switch (network) {
            case 'metamask':
                const metaMaskUserWallet = await connectMetaMask();
                console.log('metaMaskUserWallet', metaMaskUserWallet);
                dispatch(actions.login(metaMaskUserWallet))
                window.ethereum.on('chainChanged', async function (chain: any) {
                    console.log('chainChanged', chain)
                    const metaMaskUserWallet = await connectMetaMask();
                    console.log('metaMaskUserWallet', metaMaskUserWallet);
                    dispatch(actions.login(metaMaskUserWallet))
                })
                window.ethereum.on('accountsChanged', async function (accounts: any) {
                    // console.log('initEventsMetamask accountsChanged accounts', accounts)
                    if (accounts && accounts.length > 0) {
                        const metaMaskUserWallet = await connectMetaMask();
                        console.log('metaMaskUserWallet', metaMaskUserWallet);
                        dispatch(actions.login(metaMaskUserWallet))
                    } else {
                        dispatch(actions.logout())
                    }
                })
                break
            case 'walletconnect':
                try {
                    const walletconnectUserWallet = await connectWalletConnect()
                    dispatch(actions.login(walletconnectUserWallet))
                    walletProvider.on("disconnect", (code: any, reason: any) => {
                        console.log('on disconnect', code, reason);
                        dispatch(actions.logout())
                    });
                } catch (err) {
                    console.log('walletconnect err', err)
                    //TODO: reload window as its bugged, cannot re-call QR modal
                }

                break
        }
        setPopupConnectionOpen(false)
    }
    return (
        <>
            <Head>
                <title>BSC ETH Bridge</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="BSC ETH Bridge, by Ternoa." />
            </Head>
            <div className={"mainContainer"}>
                <MainHeader setConnectModalOpen={setPopupConnectionOpen} isWindowEthAvailable={isWindowEthAvailable} handleConnect={handleConnect}/>
                <div className={"container py-3 d-flex flex-column align-items-center"}>
                    <div className={style.intro}>The safe, fast and most secure way to swap Caps to binance smart chain.</div>
                    {userWallet && 
                        <>
                            <div className={style.swapAddressLabel}>The swap will occur on your same adress</div>
                            <div className={style.address}>{userWallet.address && middleEllipsis(userWallet.address, 24)}</div>
                        </>
                    }
                    <div className={"container px-2 py-3"}>
                        <div className={"row d-flex justify-content-center"}>
                            <div className={"col-12 col-md-5 px-0 mx-0"}>
                                <span className={style.networkLabel}>From</span>
                                <NetworkSelect
                                    selected={selectedOptionFrom}
                                    handleChange={handleChange}
                                    isFrom={true}
                                />
                            </div>
                            <div className={style.middleArrow + " col-12 col-md-2"}>
                                <div className={"align-self-center "}>
                                    <ArrowRight className={"d-none d-md-block"} />
                                    <ArrowDown className={"d-block d-md-none"} />
                                </div>
                            </div>
                            <div className={"col-12 col-md-5 px-0"}>
                                <span className={style.networkLabel}>To</span>
                                <NetworkSelect
                                    selected={options.filter(x => x.value !== selectedOptionFrom?.value)[0]}
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
                                <div className={"col-10"} onClick={() => maskedTextInput?.focus()}>
                                    <span className={style.capsAmount}>
                                        {formatCaps(capsToSwap) + " CAPS"}
                                        <input
                                            type="number"
                                            value={capsToSwap}
                                            onChange={(e) => Number(e.target.value)>=0 && Number(e.target.value)<=10000000000 && setCapsToSwap(Number(e.target.value))}
                                            ref={(input) => {maskedTextInput=input}}
                                            className={style.maskedInput}
                                            onFocus={() => setIsCapsInputFocused(true)}
                                            onBlur={() => setIsCapsInputFocused(false)}
                                        />
                                    </span>
                                </div>
                                <div className={"col-2"} onClick={() => userWallet && setCapsToSwap(userWallet.capsAmount)}>
                                    <div className={"badge badge-pill " + style.maxButton}>
                                        Max
                                    </div>
                                </div>
                            </div>
                            <hr className={style.divider + " " + (isCapsInputFocused ? style.dividerColored : "") } />
                        </div>
                    </div>
                    <div className={"pt-3"}>
                        <div 
                            className={`btn btn-primary rounded-pill ${isAbleToSwap ? "" : ""/*disabled */}`} 
                            onClick={() => userWallet ? setPopupConfirmationOpen(true) : setPopupConnectionOpen(true)}
                        >
                            <div className={"d-flex align-items-center px-5 mx-4"}>
                                <span>
                                    {userWallet ? "Next" : "Connect wallet"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                {/* Connect wallet modal */}
                <GenericModal
                    isClosable={true}
                    isModalError={false}
                    open={popupConnectionOpen}
                    setOpen={setPopupConnectionOpen}
                >
                    <div className={style.modalConnectTitle}>
                        Connect your Wallet
                    </div>
                    <div className={"d-flex flex-column align-items-center pt-3"}>
                        {isWindowEthAvailable && 
                            <div className={"py-2 " + style.buttonContainer}>
                                <a className={"btn btn-outline-primary rounded-pill " + style.connectButton} onClick={() => handleConnect("metamask")}>
                                    <div className={"d-flex align-items-center px-2"}>
                                        <Metamask className={"mx-3"} />
                                        <span>Metamask</span>
                                    </div>
                                </a>
                            </div>
                        }
                        <div className={"py-2 " + style.buttonContainer}>
                            <a className={"btn btn-outline-primary rounded-pill " + style.connectButton} onClick={() => handleConnect("walletconnect")}>
                                <div className={"d-flex align-items-center px-2"}>
                                    <WalletConnect className={"mx-3"} />
                                    <span>Wallet Connect</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </GenericModal>
                {/* Confirmation modal */}
                <ConfirmTransaction
                    open={popupConfirmationOpen}
                    setOpen={setPopupConfirmationOpen}
                    capsToSwap={capsToSwap}
                    from={selectedOptionFrom}
                    onConfirm={handleTransfer}
                />
                {/* Network error modal */}
                <GenericModal
                    isClosable={false}
                    isModalError={true}
                    open={(userWallet && userWallet.chainType===ChainTypes.other)}
                >
                    <div className={style.errorNetworkLabel}>
                        Please select  the ETH main network or the BSC main network in your wallet to continue
                    </div>
                </GenericModal>
            </div>
        </>
    )
}

export default HomeConnected;
