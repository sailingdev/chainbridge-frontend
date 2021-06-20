import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapSignerAsWallet } from "./wallet.helper";
//  Create WalletConnect Provider
export const walletProvider = new WalletConnectProvider({
    infuraId: "d7ba724d1621497aaacdbc03b1094a2e",
});

export const connect = async () => {
    
    //  Enable session (triggers QR Code modal)
    try {
        const accounts = await walletProvider.enable();
        console.log('wallet provider enabled');
        if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(walletProvider)
            const signer = provider.getSigner(accounts[0]);
            return mapSignerAsWallet(signer, 'walletconnect');
        } else {
            throw new Error('No WalletConnect account retrieved');
        }
    } catch (err) {
        console.log('error', err)
    }

}
