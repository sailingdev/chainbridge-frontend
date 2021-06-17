export type UserType = {
    walletId: string;
    capsAmount: number;
    networkType: NetworkType;
    chainType: ChainType
} | null;
export type NetworkType = 'metamask' | 'walletconnect' | null | undefined;
export type ChainType = 0 | 1 | null | undefined;