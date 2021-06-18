import { ethers } from "ethers";
import { UserWallet } from "interfaces";
import { mapSignerAsWallet } from "./wallet.helper";
export const connect = async (): Promise<UserWallet> => {
    if (!(<any>window).ethereum) {
        throw new Error('MetaMask provider not available');
    }
    const accounts =await (<any>window).ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts?.length > 0) {
        const provider = new ethers.providers.Web3Provider((<any>window).ethereum)
        const signer = provider.getSigner(accounts[0]);
        return mapSignerAsWallet(signer, 'metamask');
    } else {
        throw new Error('No MetaMask account retrieved');
    }
}


