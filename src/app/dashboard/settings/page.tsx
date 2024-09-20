'use client';
import React from 'react';
import DashboardContent from "../DashboardContent";
import Sidebar from "@/app/dashboard/Sidebar";
import { useAppSelector } from '@/lib/hooks';


const Settings: React.FC = () => {
    const role_key = useAppSelector((state) => state.user.role_key);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <DashboardContent/>
            butt settings
        </div>
    );
};

export default Settings;
