import { Wallet } from "ethers";

export type UserType = {
    walletId: string;
    capsAmount: number;
} | null;
export type NetworkType = 'metamask' | 'walletconnect' | null | undefined;
export interface UserWallet {
    address: string
    balance: string
    chainId: number
    gasPrice: string
    transactionCount: number
    _signer: any
}