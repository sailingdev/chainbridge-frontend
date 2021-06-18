import { createStore, combineReducers } from "redux";
import { reducer as userWalletReducer } from "redux/walletUser/reducer";

export const store = createStore(
    combineReducers({
        user: userWalletReducer
    })
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch