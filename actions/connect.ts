import { connect as triggerConnectMetaMask } from "helpers/metamask.helper";
import { connect as triggerConnectWalletConnect } from "helpers/wallet-connect.helper";

export const connectMetaMask = () => {
  triggerConnectMetaMask();
  // const walletId = '00'
  // const capsAmount = 1000
  // return { walletId, capsAmount, type: 'metamask' };
};
export const connectWalletConnect = () => {
  triggerConnectWalletConnect();
  // const walletId = '00'
  // const capsAmount = 1000
  // return { walletId, capsAmount, type: 'walletconnect' };
};

