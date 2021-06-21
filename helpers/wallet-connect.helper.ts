import { ethers } from "ethers";
import { UserWallet } from "interfaces";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapSignerAsWallet } from "./wallet.helper";
import { USER_WALLET_TYPE } from "const";
import { store } from "./storage.helper";
let qrHasDisplayed = false;
//  Create WalletConnect Provider
export const walletProvider = new WalletConnectProvider({
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
});
export const onQRCallback = (accounts: string[], success: Function, reject: Function) => {
    if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(walletProvider)
        const signer = provider.getSigner(accounts[0]);
        store(USER_WALLET_TYPE, 'walletconnect');
        const wallet = mapSignerAsWallet(signer, 'walletconnect');
        success(wallet)
    } else {
        reject('No WalletConnect account retrieved');
    }

}
export const connect = (): Promise<UserWallet> => {
    return new Promise<UserWallet>(async (success, reject) => {
        //  Enable session (triggers QR Code modal)
        try {
            console.log('qrHasDisplayed', qrHasDisplayed)
            if (qrHasDisplayed) {
                const uri = walletProvider.connector.uri;
                walletProvider.qrcodeModal.open(uri, async (accounts: any) => {
                    console.log('cb qr', accounts)
                    return onQRCallback(accounts, success, reject)
                });
            } else {
                qrHasDisplayed = true;
                const accounts = await walletProvider.enable();
                return onQRCallback(accounts, success, reject)
            }
        } catch (err) {
            //user closed QR modal
            reject(err);
        }
    })

}
