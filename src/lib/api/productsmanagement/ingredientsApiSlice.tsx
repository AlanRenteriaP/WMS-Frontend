import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IngredientInput, Ingredients } from '@/types/productsmanagement/ingredients';
import { tagTypes } from './Types/tagTypes';

export const ingredientsApi = createApi({
    reducerPath: 'ingredientsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['IngredientsOverview'],  // Keep IngredientsOverview here
    endpoints: (builder) => ({
        getIngredientsOverview: builder.query<Ingredients[], void>({
            query: () => ({
                url: '/productsmanagement/ingredients/overview',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: { ingredients: Ingredients[] }) => response.ingredients,
            providesTags: ['IngredientsOverview'],  // Provides IngredientsOverview tag
        }),
        addIngredient: builder.mutation<Ingredients[], IngredientInput>({
            query: (newIngredient) => ({
                url: '/productsmanagement/ingredients/addingredient',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newIngredient,
            }),
            invalidatesTags: ['IngredientsOverview'],  // Invalidates IngredientsOverview tag
        }),
    }),
});

export const { useGetIngredientsOverviewQuery, useAddIngredientMutation } = ingredientsApi;
