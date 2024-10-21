'use client';
import React, { useEffect, useState } from 'react';
import ProductsTable from "@/app/dashboard/productsmanagement/products/productstable/ProductsTable";
import {Box, Button, Typography, Container, CircularProgress} from "@mui/material";
import {  useGetAllProductsQuery } from '@/lib/api/productsmanagement/productsApiSlice';
import AddProductButton from "@/components/AddButtons/addProductsButton/AddProductButton";
const Products: React.FC = () => {
       const { data: productsData, error, isLoading } = useGetAllProductsQuery();

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );

    if (error)
        return <Typography color="error">Error fetching products </Typography>;


    return (
        <Container maxWidth="lg" sx={{ mt: 4, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Products
                </Typography>
              {/*<AddProductButton   />*/}
            </Box>

            <ProductsTable products={productsData!} />
        </Container>
    );
};

export default Products;
