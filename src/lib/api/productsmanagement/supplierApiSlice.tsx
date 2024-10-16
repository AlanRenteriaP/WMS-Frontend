import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Suppliers,SupplierInput } from '@/types/productsmanagement';

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
                url: '/productsmanagement/suppliers/overview',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: { suppliers: Suppliers[] }): Suppliers[] => response.suppliers,
            providesTags: ['Suppliers'],
        }),
        addSupplier: builder.mutation<Suppliers, SupplierInput>({
            query: (newSupplier) => ({
                url: '/productsmanagement/suppliers/addsupplier',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newSupplier,
            }),
            invalidatesTags: ['Suppliers'],
        }),
    }),
});

export const { useGetSuppliersQuery, useAddSupplierMutation } = supplierApi;