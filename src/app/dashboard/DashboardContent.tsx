"use client";

import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUser } from '@/lib/features/user/userSlice';

interface DecodedTokenPayload {
    id: number;
    roles: { role_name: string; role_key: string }[];
    name: string;
}

interface DecodedToken {
    payload: DecodedTokenPayload;
}

const DashboardContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userId, roles, name, role_key } = useAppSelector((state) => state.user);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        console.log("DashboardContent useEffect is running");
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        if (token) {
            fetch(`${baseUrl}/auth/decodetoken?token=${encodeURIComponent(token)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((data: DecodedToken) => {
                    console.log("Decoded data:", data);
                    dispatch(setUser({
                        userId: data.payload.id,
                        roles: data.payload.roles.map(role => role.role_name),
                        name: data.payload.name,
                        role_key: data.payload.roles.length > 0 ? data.payload.roles[0].role_key : null,
                    }));
                })
                .catch(error => console.error("Failed to decode token:", error));
        }
    }, [baseUrl, dispatch]);

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <p>NAME: {name ?? "UNKNOWN"}</p>
                <p>role_key: {role_key ?? "UNKNOWN"}</p>
                <p>USER: {userId ?? "UNKNOWN"}</p>
                <p>ROLE: {roles && roles.length > 0 ? roles.join(", ") : "UNKNOWN"}</p>
            </div>
        </div>
    );
};

export default DashboardContent;
