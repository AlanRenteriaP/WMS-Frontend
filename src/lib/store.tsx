// src/lib/store.tsx

import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/lib/api/auth/authApiSlice';
import { unitsApi } from '@/lib/api/productsmanagement/unitsApiSlice';
import {productsApi} from '@/lib/api/productsmanagement/productsApiSlice';
import {ingredientsApi} from '@/lib/api/productsmanagement/ingredientsApiSlice';
import {brandsApi} from '@/lib/api/productsmanagement/brandsApiSlice';
import {supplierApi} from '@/lib/api/productsmanagement/supplierApiSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            [ingredientsApi.reducerPath]: ingredientsApi.reducer,
            [productsApi.reducerPath]: productsApi.reducer,
            [unitsApi.reducerPath]: unitsApi.reducer,
            [brandsApi.reducerPath]: brandsApi.reducer,
            [supplierApi.reducerPath]: supplierApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(authApi.middleware)
                .concat(ingredientsApi.middleware)
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
