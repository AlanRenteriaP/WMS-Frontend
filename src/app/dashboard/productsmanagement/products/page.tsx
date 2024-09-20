'use client';
import React, { useEffect, useState } from 'react';
import ProductsTable from "./ProductsTable";

const Products: React.FC = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div>
               products
            </div>

            <ProductsTable />
        </div>
    );
};

export default Products;
