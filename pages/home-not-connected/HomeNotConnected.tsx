import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import style from './HomeNotConnected.module.scss';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'
import MainHeader from 'components/base/MainHeader'
import Footer from 'components/base/Footer'
import { NetworkType } from 'interfaces';
import ModalConnect from 'components/ModalConnect';
import { useAppSelector } from 'redux/hooks';
declare let window: any;

export interface HomeNotConnectedProps {
}

const HomeNotConnected: React.FC<HomeNotConnectedProps> = () => {
    const [isConnectModalOpen, setConnectModalOpen] = useState(false);
    const [network, setNetwork] = useState<NetworkType>(null);
    const [isWindowEthAvailable, setIsWindowEthAvailable] = useState(false)
    const router = useRouter();
    const userWallet = useAppSelector((state) => state.user.userWallet)
    const connectWithMetaMask = () => {
        setNetwork('metamask');
        setConnectModalOpen(true);
    }
    const connectWithWalletConnect = () => {
        setNetwork('walletconnect');
        setConnectModalOpen(true);
    }
    useEffect(() => {
        if ((userWallet)) {
            router.push('home-connected')
        }
    }, [userWallet])
    useEffect(()=>{
        setIsWindowEthAvailable(typeof window !== "undefined" && window.ethereum ? true : false)
    })
    return (
        <>
            <Head>
                <title>BSC ETH Bridge</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="BSC ETH Bridge, by Ternoa." />
            </Head>
            <MainHeader capsAmount={0} />
            <div className={"mainContainer"}>
                <div className={"container py-md-6 py-4 d-flex flex-column align-items-center"}>
                    <div className={style.intro}>The safe, fast and most secure way to swap Caps to binance smart chain.</div>
                    <div className={"d-flex flex-column align-items-center pt-2 pt-md-5"}>
                        {isWindowEthAvailable && 
                            <div className={"py-2"}>
                                <a className={"btn btn-outline-primary rounded-pill"} onClick={connectWithMetaMask}>
                                    <div className={"d-flex align-items-center px-2"}>
                                        <Metamask className={"mx-3"} />
                                        <span className={style.buttonLabel}>Connect with Metamask</span>
                                    </div>
                                </a>
                            </div>
                        }
                        <div className={"py-2"}>
                            <a className={"btn btn-outline-primary rounded-pill"} onClick={connectWithWalletConnect}>
                                <div className={"d-flex align-items-center px-2"}>
                                    <WalletConnect className={"mx-3"} />
                                    <span className={style.buttonLabel}>Connect with Wallet Connect</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <ModalConnect isOpen={isConnectModalOpen} setOpen={setConnectModalOpen} network={network} />
                <Footer />
            </div>
        </>
    )
}

export default HomeNotConnected;
