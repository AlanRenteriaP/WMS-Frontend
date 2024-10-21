import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Suppliers,SupplierInput } from '@/types/productsmanagement';
import {tagTypes} from "./Types/tagTypes";
export const supplierApi = createApi({
    reducerPath: 'supplierApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: tagTypes,
    endpoints: (builder) => ({
        getSuppliers: builder.query<Suppliers[], void>({
            query: () => ({
                url: '/productsmanagement/suppliers/getsuppliers',
                method: 'GET',
                    header :{
                        'Content-Type': 'application/json',
                    }
            }),
            transformResponse: (response: {suppliers: Suppliers[]}) =>  response.suppliers,
            providesTags: ['Suppliers'],
        }),
        getSuppliersOverview: builder.query<Suppliers[], void>({
            query: () => ({
                url: '/productsmanagement/suppliers/overview',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: { suppliersOverview: Suppliers[] }): Suppliers[] => response.suppliersOverview,
            providesTags: ['SuppliersOverview'],
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
            invalidatesTags: ['SuppliersOverview','Suppliers'],
        }),
    }),
});

export const { useGetSuppliersOverviewQuery, useGetSuppliersQuery , useAddSupplierMutation } = supplierApi;