import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Brands, BrandInput} from '@/types/productsmanagement';
import {tagTypes} from "./Types/tagTypes";



export const brandsApi = createApi({
    reducerPath: 'brandsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: tagTypes,
    endpoints: (builder) => ({
        getBrands: builder.query<Brands[], void>({
            query: () => ({
                url: '/productsmanagement/brands/all',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            transformResponse: (response: { brands: Brands[] }): Brands[] => response.brands,
            providesTags: ['Brands'],
        }),
        getBrandsOverview: builder.query<Brands[], void>({
            query: () => ({
                url: '/productsmanagement/brands/overview',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            transformResponse: (response: { brands: Brands[] }): Brands[] => response.brands,
            providesTags: ['BrandOverview'],
        }),
        addBrand: builder.mutation<Brands, BrandInput>({
            query: (newBrand) => ({
                url: '/productsmanagement/brands/addbrand',
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: newBrand,
            }),
            invalidatesTags: ['BrandOverview', 'Brands'],
        })
    }),
});

export const { useGetBrandsQuery, useGetBrandsOverviewQuery, useAddBrandMutation } = brandsApi;