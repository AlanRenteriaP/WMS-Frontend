import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Brand, Ingredients,Products } from '@/types/productsmanagement/brands';



export const brandsApi = createApi({
    reducerPath: 'brandsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Brands'],
    endpoints: (builder) => ({
        getBrands: builder.query<Brand[], void>({
            query: () => ({
                url: '/productsmanagement/brands',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            transformResponse: (response: { brands: Brand[] }): Brand[] => response.brands,
        }),
        getProductsOverview: builder.query<Brand[], void>({
            query: () => ({
                url: '/productsmanagement/brands/overview',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            transformResponse: (response: { brands: Brand[] }): Brand[] => response.brands,
        }),
    }),
});

export const { useGetBrandsQuery, useGetProductsOverviewQuery } = brandsApi;