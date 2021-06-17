import React, { useState } from 'react';
import style from './HomeNotConnected.module.scss';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'
import { NextPageContext } from 'next';
import ModalConnect from 'components/ModalConnect';
import { NetworkType } from 'interfaces';

export interface HeaderProps {
    setUser: Function;
}

const HomeNotConnected: React.FC<HeaderProps> = ({ setUser }) => {
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
