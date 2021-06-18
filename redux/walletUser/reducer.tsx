import { AnyAction } from 'redux'
import { UserWallet } from 'interfaces'

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
            nextState = {
                ...state,
                userWallet: null
            }
            return nextState
        default:
            return state
    }
}