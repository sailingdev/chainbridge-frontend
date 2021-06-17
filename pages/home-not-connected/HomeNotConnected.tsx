import React, { useState } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head'
import style from './HomeNotConnected.module.scss';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'
import MainHeader from 'components/base/MainHeader'
import Footer from 'components/base/Footer' 
import Stars from 'components/assets/Stars'
import { NetworkType, UserType } from 'interfaces';
import ModalConnect from 'components/ModalConnect';

export interface HeaderProps {
    setUser: Function;
    user: UserType;
}

const HomeNotConnected: React.FC<HeaderProps> = ({ user, setUser }) => {
    const [isConnectModalOpen, setConnectModalOpen] = useState(false);
    const [network, setNetwork] = useState<NetworkType>(null);
    const connectWithMetaMask = () => {
        console.log('connectWithMetaMask');
        setNetwork('metamask');
        setConnectModalOpen(true);
    }
    const connectWithWalletConnect = () => {
        console.log('connectWithWalletConnect');
        setNetwork('walletconnect');
        setConnectModalOpen(true);
    }
    return (
        <>
            <Head>
                <title>BSC ETH Bridge</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="BSC ETH Bridge, by Ternoa." />
            </Head>
            <div className={"mainContainer"}>
                <MainHeader user={user} setUser={setUser}/>
                <div className={"container py-md-6 py-4 d-flex flex-column align-items-center"}>
                    <div className={style.intro}>The safe, fast and most secure way to swap Caps to binance smart chain.</div>
                    <div className={"py-md-3 py-2"}>
                        <a className={"btn btn-outline-primary rounded-pill"} onClick={connectWithMetaMask}>
                            <div className={"d-flex align-items-center px-2"}>
                                <Metamask className={"mx-3"} />
                                <span className={style.buttonLabel}>Connect with Metamask</span>
                            </div>
                        </a>
                    </div>
                    <div className={"py-2"}>
                        <a className={"btn btn-outline-primary rounded-pill"} onClick={connectWithWalletConnect}>
                            <div className={"d-flex align-items-center px-2"}>
                                <WalletConnect className={"mx-3"} />
                                <span className={style.buttonLabel}>Connect with Wallet Connect</span>
                            </div>
                        </a>
                    </div>

                </div>
                <ModalConnect isOpen={isConnectModalOpen} setOpen={setConnectModalOpen} network={network} />
                <Footer/>
                <Stars className={"stars"}/>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    return {
        props: {
        }
    }
}
export default HomeNotConnected;
