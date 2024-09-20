import React, { useEffect } from 'react';
import { useDecodeTokenQuery } from '@/lib/api/auth/authApiSlice';

interface Role {
    role_key: string;
    role_name: string;
}

interface User {
    id: number;
    name: string;
    roles: Role[];
    email: string;
    job_title: string;
    employment_start_date: string;
}


const DashboardContent: React.FC = () => {
    const { data, error, isLoading } = useDecodeTokenQuery();
    const user = data?.payload as User;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data</div>;

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <p>NAME: {user?.name ?? "UNKNOWN"}</p>
                <p>ROLE KEY: {user?.roles?.[0]?.role_key ?? "UNKNOWN"}</p>
                <p>USER: {user?.id ?? "UNKNOWN"}</p>
                <p>ROLE: {user?.roles?.length > 0 ? user.roles.map(role => role.role_name).join(", ") : "UNKNOWN"}</p>
            </div>
        </div>
    );
};

export default DashboardContent;
