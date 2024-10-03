import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Suppliers } from '@/types/productsmanagement/suppliers';

export const supplierApi = createApi({
    reducerPath: 'supplierApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Suppliers'],
    endpoints: (builder) => ({
        getSuppliers: builder.query<Suppliers[], void>({
            query: () => ({
                url: '/productsmanagement/supplierstores/getstores',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: { suppliers: Suppliers[] }): Suppliers[] => response.suppliers,
        }),
    }),
});

export const { useGetSuppliersQuery } = supplierApi;
