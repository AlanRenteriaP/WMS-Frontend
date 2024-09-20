'use client';
import React from 'react';
import DashboardContent from "../DashboardContent";
import Sidebar from "@/app/dashboard/Sidebar";
import { useAppSelector } from '@/lib/hooks';

const DashBoardPage: React.FC = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <DashboardContent/>
        </div>
    );
};

export default DashBoardPage;