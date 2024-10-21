import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Products, AddProductInput, SupplierPricebyProductId} from '@/types/productsmanagement/products';
import { tagTypes } from './Types/tagTypes';
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/src/query/baseQueryTypes";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['IngredientsOverview', 'Products','SupplierPriceTable'],  // Add shared tags here
    endpoints: (builder) => ({
        getAllProducts: builder.query<Products[], void>({
            query: () => ({
                url: '/productsmanagement/products/getall',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: { products: Products[] }) => response.products,
            providesTags: ['Products'],  // Provides Products tag
        }),
        addProduct: builder.mutation<void, AddProductInput>({
            query: (newProduct) => ({
                url: '/productsmanagement/products/add',
                method: 'POST',
                body: newProduct,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [ 'Products'],  // Invalidates both IngredientsOverview and Products tags
        }),

        getSupplierProductPrice: builder.query<SupplierPricebyProductId[], number>({
            query: (productID) => ({
                url: `/productsmanagement/products//SupplierPricebyId?product_id=${productID}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['SupplierPriceTable'],
        }),
    }),
});

export const { useGetAllProductsQuery, useAddProductMutation ,useGetSupplierProductPriceQuery} = productsApi;
