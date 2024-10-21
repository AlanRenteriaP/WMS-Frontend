// src/app/dashboard/layout.tsx
"use client";

import React, { useEffect } from 'react';
import { useDecodeTokenQuery } from '@/lib/api/auth/authApiSlice';
import Sidebar from './Sidebar';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
    const { data, error, isLoading } = useDecodeTokenQuery();


    const role_key = data?.payload?.roles?.[0]?.role_key;
    if (isLoading) return <div>Loading...</div>;

    if (error) {
        // Handle the error appropriately
        let errorMessage = 'An unknown error occurred';

        if ('status' in error) {
            // FetchBaseQueryError
            if (typeof error.status === 'number') {
                // HTTP error from the server
                const err = error as FetchBaseQueryError;
                if (err.data && typeof err.data === 'object') {
                    const data = err.data as { [key: string]: any };
                    if ('error' in data && typeof data.error === 'string') {
                        errorMessage = data.error;
                    } else if ('message' in data && typeof data.message === 'string') {
                        errorMessage = data.message;
                    }
                } else {
                    errorMessage = `HTTP Error ${err.status}`;
                }
            } else {
                // Non-HTTP errors like 'FETCH_ERROR', 'PARSING_ERROR', 'CUSTOM_ERROR'
                errorMessage = error.error ?? errorMessage;
            }
        } else if ('message' in error) {
            // SerializedError
            errorMessage = error.message ?? errorMessage;
        }

        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div style={{display: 'flex', height: '100vh'}}>
            {role_key && <div style={{width: '250px'}}><Sidebar/></div>}
            <div style={{flex: 1, padding: '20px'}}>
                {children}
            </div>
        </div>
    );
}
