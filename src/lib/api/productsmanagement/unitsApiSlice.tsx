import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Unit } from '@/types/productsmanagement/units';

export const unitsApi = createApi({
    reducerPath: 'unitsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Units'],
    endpoints: (builder) => ({
        getUnits: builder.query<Unit[], void>({
            query: () => ({
                url: '/productsmanagement/units/getunits',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            transformResponse: (response: { units: Unit[] }): Unit[] => response.units,
        })
    }),
});

export const { useGetUnitsQuery } = unitsApi;