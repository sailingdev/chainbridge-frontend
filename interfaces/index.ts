export type NetworkType = 'metamask' | 'walletconnect' | null | undefined;
export interface UserWallet {
    address: string
    balance: string
    chainId: number
    gasPrice: string
    transactionCount: number
}