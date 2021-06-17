import { ethers } from "ethers";
import { UserWallet } from "interfaces";
import { mapSignerAsWallet } from "./wallet.helper";
export const connect = async (): Promise<UserWallet> => {
    if (!(<any>window).ethereum) {
        throw new Error('MetaMask provider not available');
    }
    const { result } = await (<any>window).ethereum.send("eth_requestAccounts");
    if (result?.length > 0) {
        const provider = new ethers.providers.Web3Provider((<any>window).ethereum)
        const signer = provider.getSigner(result[0]);
        return mapSignerAsWallet(signer);
    } else {
        throw new Error('No MetaMask account retrieved');
    }
}


