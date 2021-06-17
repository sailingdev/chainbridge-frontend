export const connectMetaMask = () => {
  const walletId = '00'
  const capsAmount = 1000
  return { walletId, capsAmount, type: 'metamask' };
};
export const connectWalletConnect = () => {
  const walletId = '00'
  const capsAmount = 1000
  return { walletId, capsAmount, type: 'walletconnect' };
};

