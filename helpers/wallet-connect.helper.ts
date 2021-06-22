import { ethers } from "ethers";
import { UserWallet } from "interfaces";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapSignerAsWallet } from "./wallet.helper";
import { USER_WALLET_TYPE } from "const";
import { store } from "./storage.helper";
//  Create WalletConnect Provider
export let walletProvider: WalletConnectProvider;
export const onQRCallback = async (accounts: string[], success: Function, reject: Function) => {
    if (accounts && accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(walletProvider)
        const signer = provider.getSigner(accounts[0]);
        store(USER_WALLET_TYPE, 'walletconnect');
        const wallet = await mapSignerAsWallet(signer, 'walletconnect');
        success(wallet)
    } else {
        reject('No WalletConnect account retrieved');
    }

}
export const connect = (): Promise<UserWallet> => {
    return new Promise<UserWallet>(async (success, reject) => {
        // workaround to avoid console.log while connecting
        const saveLog = console.log;
        console.log = () => { };
        walletProvider = new WalletConnectProvider({
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
            bridge: process.env.NEXT_PUBLIC_WALLETCONNECT_BRIDGE,
        });
        try {
            const accounts = await walletProvider.enable();
            onQRCallback(accounts, success, reject)
            // workaround revert - reset console.log
            console.log = saveLog;
        }
        catch (e) {
            // caught user modal closing error
        }
    })
}
