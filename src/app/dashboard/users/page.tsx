'use client';
import React, { useEffect, useState } from 'react';
import UsersTable from './UsersTable'; // Make sure to import UsersTable correctly

interface Role {
    role_name: string;
    role_key: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    job_title: string;
    employment_start_date: string;
    roles: Role[];
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // Initialize state for users
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${baseUrl}/users/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setUsers(data); // Update state with the fetched users
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, [baseUrl]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div>
                <UsersTable users={users} /> {/* Pass the fetched users to the UsersTable component */}
            </div>
        </div>
    );
};

export default Users;
