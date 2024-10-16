import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductVariantInput,UpdateVariantInput } from '@/types/productsmanagement/products'; // Ensure correct import path

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
                return response.products.map((product) => ({
                    product_id: product.product_id,
                    product_name: product.product_name,
                    default_variant_id: product.default_variant_id,
                    measurement: product.measurement,
                    number_of_variants: parseInt(product.number_of_variants, 10),
                    price_range: product.price_range,
                    last_updated: new Date(product.last_updated).toISOString(),
                    variants: (product.variants || []).map((variant: any) => ({
                        variant_id: variant.variant_id,
                        upc: variant.upc ?? null,
                        package_size: variant.package_size,
                        brand: variant.brand,
                        brand_id: variant.brand_id ?? 0, // Ensure brand_id is included
                        price: variant.price ?? null,
                        supplier: variant.supplier,
                        supplier_id: variant.supplier_id ?? 0, // Ensure supplier_id is included
                        unit_id: variant.unit_id ?? 0, // Ensure unit_id is included
                        is_default: Boolean(variant.is_default),
                        last_updated: new Date(variant.last_updated).toISOString(),
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
        // Add the mutation to set a variant as active
        setVariantActive: builder.mutation<void, { product_id: number, variant_id: number }>({
            query: ({ product_id, variant_id }) => ({
                url: `/productsmanagement/products/setActive/${product_id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { default_variant_id: variant_id }, // Update the product's default_variant_id
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        updateProductVariant: builder.mutation<void, { id: number, data: UpdateVariantInput  }>({
            query: ({ id, data }) => ({
                url: `/productsmanagement/productvariants/updatevariant/${id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),

    }),
});

export const {
    useGetProductsOverviewQuery,
    useAddProductVariantMutation,
    useSetVariantActiveMutation, // Add this line
    useUpdateProductVariantMutation, // Export the update mutation hook
} = productsApi;

