import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapSignerAsWallet } from "./wallet.helper";
export const connect = async () => {
    //  Create WalletConnect Provider
    const walletProvider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
        // bridge: process.env.NEXT_PUBLIC_BRIDGE_ROPSTEN_ADDRESS
    });
    // Subscribe to chainId change
    walletProvider.on("chainChanged", (chainId: number) => {
        console.log(chainId);
    });
    // Subscribe to session disconnection
    walletProvider.on("disconnect", (code: number, reason: string) => {
        console.log(code, reason);
    });
    await walletProvider.enable();
    //  Enable session (triggers QR Code modal)
    walletProvider.on("accountsChanged", (accounts: string[]) => {
        console.log(accounts);
    });
    const provider = new ethers.providers.Web3Provider(walletProvider)
    const signer = provider.getSigner();
    return mapSignerAsWallet(signer);
}
