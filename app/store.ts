import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import {authApi} from 'apis/auth'
import userDataReducer from 'features/UserData/userDataSlice'

export const store =  configureStore({
    reducer: {
        userData : userDataReducer,
        [authApi.reducerPath] : authApi.reducer,     
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})