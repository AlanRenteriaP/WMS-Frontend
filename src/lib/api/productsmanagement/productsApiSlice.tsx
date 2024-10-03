import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductVariantInput } from '@/types/productsmanagement/products'; // Ensure correct import path

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        // Fetch overview of products including additional fields
        getProductsOverview: builder.query<Product[], void>({
            query: () => ({
                url: '/productsmanagement/products/overview',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: { products: any[] }): Product[] => {
                // Map the response to the expected Product interface
                return response.products.map((product) => ({
                    product_id: product.product_id,
                    product_name: product.product_name,
                    default_variant_id: product.default_variant_id,
                    measurement: product.measurement,
                    number_of_variants: parseInt(product.number_of_variants, 10),
                    price_range: product.price_range,
                    last_updated: new Date(product.last_updated).toISOString(), // Use as string or convert to Date if needed
                    // Type-check and transform each variant
                    variants: (product.variants || []).map((variant: any) => ({
                        variant_id: variant.variant_id,
                        upc: variant.upc ?? null, // Ensure null if undefined
                        brand: variant.brand,
                        price: variant.price ?? null, // Ensure null if undefined
                        supplier: variant.supplier,
                        is_default: Boolean(variant.is_default), // Convert to boolean
                        last_updated: new Date(variant.last_updated).toISOString(), // Convert to Date object
                        presentation: variant.presentation,
                    })),
                }));
            },
            providesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        // Add a product variant mutation
        addProductVariant: builder.mutation<void, ProductVariantInput>({
            query: (variantData) => ({
                url: '/productsmanagement/productvariants/addvariant',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: variantData,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }], // Invalidate the products list to trigger a refetch
        }),
    }),
});

export const {
    useGetProductsOverviewQuery,
    useAddProductVariantMutation, // Export the mutation hook
} = productsApi;
