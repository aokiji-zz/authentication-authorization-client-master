import { configureStore } from '@reduxjs/toolkit'
import { calculatorAPI } from '../services/calculator.service'
import { authAPI } from '../services/auth.service'
import { calculatorReducer } from './slices/articles.slice'
import { authReducer } from './slices/auth.slice'
import { generalReducer } from './slices/general.slice'
import { userReducer } from './slices/user.slice'

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    articlesReducer: calculatorReducer,
    generalReducer,

    [authAPI.reducerPath]: authAPI.reducer,
    [calculatorAPI.reducerPath]: calculatorAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authAPI.middleware]).concat([calculatorAPI.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
