// src/app/dashboard/productsmanagement/sourcestores/SelectComponents/brandsTable/brandsTable.tsx
"use client"
import React, { useState } from 'react';
import {
    CircularProgress,
    TextField,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, IconButton,
} from '@mui/material';
import {Brands} from '@/types/productsmanagement';
import GenericTable from "@/components/table/genericTable";
import {brandColumns} from "@/common/constants/table/columns";
import IngredientsTable from "./ingredientTable/ingredientTable";

interface BrandsTableProps {
    brands: Brands[];
}
const BrandTable: React.FC<BrandsTableProps> = ({ brands }) => {

    return (
        <>
            Brands Table
            <GenericTable
            data={brands}
            columns={brandColumns}
            isNested={true}

            renderNestedTable={(brands) => (
                brands.ingredients && brands.ingredients.length > 0 ? (
                    <IngredientsTable ingredients={brands.ingredients} />
                ): (
                    <Typography variant="body2" style={{ marginLeft: '20px' }}>
                        No products available
                    </Typography>
                )

            )}
            />

        </>
    );
};

export default BrandTable;