import { AnyAction } from 'redux'
import { UserWallet } from 'interfaces'
import { clear } from 'helpers/storage.helper';
import { USER_WALLET_TYPE } from 'const';
import { walletProvider } from 'helpers/wallet-connect.helper';

const userWallet: UserWallet | null = null as (UserWallet | null)
const initialState = { userWallet }

export const reducer = (state = initialState, action: AnyAction) => {
    let nextState
    switch (action.type){
        case 'USER_WALLET_LOGIN':
            nextState = {
                ...state,
                userWallet: action.value
            }
            return nextState
        case 'USER_WALLET_LOGOUT':
            clear(USER_WALLET_TYPE)
            if (walletProvider?.connected){
                walletProvider.disconnect()
            }
            nextState = {
                ...state,
                userWallet: null
            }
            return nextState
        case 'USER_WALLET_SET_CAPS_AMOUNT':
            if (state.userWallet){
                nextState = {
                    ...state,
                    userWallet: {
                        ...state.userWallet,
                        capsAmount: action.value
                    }
                }
                return nextState
            }else{
                return state
            }
        default:
            return state
    }
}