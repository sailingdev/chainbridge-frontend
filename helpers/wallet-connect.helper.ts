import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapSignerAsWallet } from "./wallet.helper";
export const connect = async () => {
    //  Create WalletConnect Provider
    const walletProvider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    //  Enable session (triggers QR Code modal)
    const accounts = await walletProvider.enable();
    console.log('wallet provider enabled');
    if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(walletProvider)
        const signer = provider.getSigner(accounts[0]);
        return mapSignerAsWallet(signer, 'walletconnect');
    } else {
        throw new Error('No WalletConnect account retrieved');
    }
}
