import { ethers, Signer } from "ethers"

export const mapSignerAsWallet = async (signer: Signer) => {
    return {
        address: await signer.getAddress(),
        balance: ethers.utils.formatEther(await signer.getBalance()),
        chainId: await signer.getChainId(),
        gasPrice: ethers.utils.formatEther(await signer.getGasPrice()),
        transactionCount: await signer.getTransactionCount(),
        _signer: signer
    }
}