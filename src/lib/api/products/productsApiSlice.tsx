// src/lib/api/products/productsApiSlice.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductVariant } from '@/types/products';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Products'], // Ensure 'Products' is correctly specified
    endpoints: (builder) => ({
        getProductsWithVariants: builder.query<Product[], void>({
            query: () => ({
                url: '/products/products_with_variants',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: [{ type: 'Products', id: 'LIST' }], // Adjusted here
        }),
        addProductVariant: builder.mutation<
            ProductVariant,
            { productId: number; variantData: Partial<ProductVariant> }
        >({
            query: ({ productId, variantData }) => ({
                url: `/products/${productId}/variants`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: variantData,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }], // Adjusted here
        }),
    }),
});

export const {
    useGetProductsWithVariantsQuery,
    useAddProductVariantMutation,
} = productsApi;
