import { Option } from "components/base/Select/NetworkSelect";
import { BigNumber, Contract, ethers, Signer } from "ethers"
import { ChainTypes } from "interfaces"

export const mapSignerAsWallet = async (signer: Signer) => {
    return {
        address: await signer.getAddress(),
        balance: ethers.utils.formatEther(await signer.getBalance()),
        chainId: await signer.getChainId(),
        gasPrice: ethers.utils.formatEther(await signer.getGasPrice()),
        transactionCount: await signer.getTransactionCount(),
        signer
    }
}

const contractAbi = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "name": "transfer",
        "type": "function",
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "_tokens"
            }
        ],
        "constant": false,
        "outputs": [],
        "payable": false
    }
];

export const connectSignerToContract = (signer: Signer, network: Option | null) => {
    if (!network) throw new Error('No network given')
    const contract = new Contract(network.tokenAddress, contractAbi, signer)
    return contract;
}
export const transfer = async (contract: Contract | null, network: Option | null, amount: number) => {
    if (!contract) throw new Error('Give contract to transfer')
    if (!network) throw new Error('Give network to transfer')

    var numberOfDecimals = 18;
    var numberOfTokens = ethers.utils.parseUnits(amount.toString(), numberOfDecimals);

    // Send tokens
    try {
        const transaction = await contract.transfer(network.bridgeAddress, numberOfTokens);
        const receipt = await transaction.wait()
        return receipt;
    } catch (error) {
        console.log(error.toString());
        throw new Error(error);
    }
}