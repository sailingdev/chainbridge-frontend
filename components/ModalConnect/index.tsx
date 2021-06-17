import React from 'react';
import style from './ModalConnect.module.scss';
import Close from 'components/assets/Close'
import { NetworkType } from 'interfaces/index';
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';
import { connectMetaMask, connectWalletConnect } from 'actions/connect';
export interface ModalConnectProps {
    isOpen: boolean;
    setOpen: Function;
    network: NetworkType;
    setUserWallet: Function
}

const ModalConnect: React.FC<ModalConnectProps> = ({ isOpen, setOpen, network, setUserWallet }) => {
    const handleConnect = async (network: NetworkType) => {
        switch (network) {
            case 'metamask':
                const metaMaskUserWallet = await connectMetaMask();
                console.log('metaMaskUserWallet',metaMaskUserWallet);                
                setUserWallet(metaMaskUserWallet)
                break
            case 'walletconnect':
                const walletconnectUserWallet = await connectWalletConnect()
                setUserWallet(walletconnectUserWallet)
                break
        }
    }
    return (<>
        { isOpen && <div className={style.ModalContainer}>
            <div className={style.ProviderContainer}>
                <div className={"row d-flex align-items-center full-height"}>
                    <div className={"col-12 text-center"}>
                        <div className={style.iconContainer}>
                            {network == 'metamask' ? <Metamask width={200} /> : <WalletConnect width={200} />}
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.ConnectButton} onClick={handleConnect.bind(this, network)}>Connect</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.ClosePanel} onClick={() => setOpen(false)}>
                <Close className={style.CloseButton} />
            </div>
        </div>
        }
    </>)
}

export default ModalConnect;

