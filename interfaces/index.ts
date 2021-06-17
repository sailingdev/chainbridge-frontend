export type NetworkType = 'metamask' | 'walletconnect' | null | undefined;
export type ChainType = 0 | 1 | null | undefined;
export interface UserWallet {
    address: string
    balance: string
    chainId: number
    gasPrice: string
    transactionCount: number
    networkType: NetworkType;
    chainType: ChainType
}
