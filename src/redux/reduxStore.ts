import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dataSlice from '~/redux/reducer/dataReducer/dataSlice'


export const reduxStore = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
})

export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxStoreDispatch = typeof reduxStore.dispatch