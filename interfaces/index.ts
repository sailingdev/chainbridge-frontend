import { Signer } from "ethers";

export type NetworkType = 'metamask' | 'walletconnect' | null | undefined;
export enum ChainTypes {
    erc20 = 0,
    bep20 = 1
}
export type ChainType = ChainTypes | null | undefined;
export interface UserWallet {
    address: string
    balance: string | number
    chainId?: number
    gasPrice?: string
    transactionCount?: number
    networkType?: NetworkType;
    chainType?: ChainType
    signer : Signer
}
