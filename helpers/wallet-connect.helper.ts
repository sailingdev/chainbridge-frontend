import { ethers } from "ethers";
import { UserWallet } from "interfaces";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapSignerAsWallet } from "./wallet.helper";
import { USER_WALLET_TYPE } from "const";
import { store } from "./storage.helper";
//  Create WalletConnect Provider
export const walletProvider = new WalletConnectProvider({
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
});

export const connect = async (): Promise<UserWallet> => {
    //  Enable session (triggers QR Code modal)
    try {
        const accounts = await walletProvider.enable();
        if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(walletProvider)
            const signer = provider.getSigner(accounts[0]);
            store(USER_WALLET_TYPE, 'walletconnect');
            return mapSignerAsWallet(signer, 'walletconnect');
        } else {
            throw new Error('No WalletConnect account retrieved');
        }
    } catch (err) {
        //user closed QR modal
        throw new Error(err);
    }

}
