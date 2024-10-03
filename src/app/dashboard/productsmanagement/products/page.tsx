'use client';
import React, { useEffect, useState } from 'react';
import ProductsTable from "./components/productstable/ProductsTable";
import {Box, Button, Typography,Container} from "@mui/material";

const Products: React.FC = () => {

    return (
        <Container maxWidth="lg" sx={{ mt: 4, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Products
                </Typography>
                <Button variant="contained" color="success">
                    Add Product
                </Button>
            </Box>

            <ProductsTable />
        </Container>
    );
};

export default Products;
