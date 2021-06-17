import { connect as triggerConnectMetaMask } from "helpers/metamask.helper";
import { connect as triggerConnectWalletConnect } from "helpers/wallet-connect.helper";

export const connectMetaMask = () => {
  return triggerConnectMetaMask();
};
export const connectWalletConnect = () => {
  return triggerConnectWalletConnect();
};

