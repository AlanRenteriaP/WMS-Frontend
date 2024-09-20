'use client';
import React, { useEffect, useState } from 'react';
import StoreTable from './storestable';

const Stores: React.FC = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div>
                <StoreTable />
            </div>
        </div>
    );
};

export default Stores;
