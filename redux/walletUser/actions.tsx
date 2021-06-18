import { UserWallet } from 'interfaces'

export const actions = {
    login: (userWallet: UserWallet) => ({
        type: 'USER_WALLET_LOGIN',
        value: userWallet
    }),
    logout: () => ({
        type: 'USER_WALLET_LOGOUT',
    })
}