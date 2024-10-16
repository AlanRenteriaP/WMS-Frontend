"use client"
import React from 'react';
import BrandTable from './brandsTable';
import AddBrandButton from "@/components/AddButtons/addBrandButton";
import {Typography, Box, CircularProgress} from "@mui/material";
import { useGetProductsOverviewQuery } from '@/lib/api/productsmanagement/brandsApiSlice';

const BrandsPage = () => {
        const { data: brandsData,error,isLoading } = useGetProductsOverviewQuery();

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );

    if (error)
        return <Typography color="error">Error fetching suppliers</Typography>;



    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography  variant="h4"  component="h1"  sx={{fontWeight: 'bold',mb: 2,color:'primary.main'}}>
                Brands
                </Typography>
                <AddBrandButton />
            </Box>

            <BrandTable brands={brandsData!} />
        </Box>
    );
};

export default BrandsPage;
