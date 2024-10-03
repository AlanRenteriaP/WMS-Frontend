import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Brand } from '@/types/productsmanagement/brands';

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
    }),
});

export const { useGetBrandsQuery } = brandsApi;
