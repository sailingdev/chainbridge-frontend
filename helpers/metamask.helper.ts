import { ethers } from "ethers";
import { UserWallet } from "interfaces";
import { mapSignerAsWallet } from "./wallet.helper";
export const connect = async (): Promise<UserWallet> => {
    if (!(<any>window).ethereum) {
        throw new Error('MetaMask provider not available');
    }
    const provider = new ethers.providers.Web3Provider((<any>window).ethereum)
    const signer = provider.getSigner();
    return mapSignerAsWallet(signer);
}

