import { UserWallet } from 'interfaces'

export const actions = {
    login: (userWallet: UserWallet) => ({
        type: 'USER_WALLET_LOGIN',
        value: userWallet,
    }),
    logout: () => ({
        type: 'USER_WALLET_LOGOUT',
    }),
    setCapsAmount: (value: string | number) => ({
        type: 'USER_WALLET_SET_CAPS_AMOUNT',
        value: value,
    }),
}