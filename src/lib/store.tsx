// src/lib/store.tsx

import { configureStore } from '@reduxjs/toolkit'
import { authApi, productsApi, unitsApi, brandsApi,supplierApi } from '@/lib/api';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            [productsApi.reducerPath]: productsApi.reducer,
            [unitsApi.reducerPath]: unitsApi.reducer,
            [brandsApi.reducerPath]: brandsApi.reducer,
            [supplierApi.reducerPath]: supplierApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(authApi.middleware)
                .concat(productsApi.middleware)
                .concat(unitsApi.middleware)
                .concat(brandsApi.middleware)
                .concat(supplierApi.middleware)
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
