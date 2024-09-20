// src/lib/api/auth/authApiSlice.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

interface JwtPayloadResponse {
    payload: {
        id: number;
        name: string;
        email: string;
        job_title: string;
        employment_start_date: string;
        roles: Array<{
            role_name: string;
            role_key: string;
        }>;
    };
}

console.log('authapislice here we go');
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include', // Ensure cookies are sent with the request
    prepareHeaders: (headers, { getState }) => {
        console.log('Fetching or re-fetching data');
        return headers;
    }
});

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        decodeToken: builder.query<JwtPayloadResponse, void>({
            query: () => ({
                url: '/auth/decodeToken',
                method: 'GET',
            }),

        }),
    }),
});

export const { useLoginUserMutation, useDecodeTokenQuery } = authApi;
