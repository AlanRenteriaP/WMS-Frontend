"use client"
import React from 'react';
import {Typography, Box, Button, CircularProgress} from "@mui/material";
import AddSupplierButton from "@/components/AddButtons/AddSupplierButton/AddSupplierButton";
import {useGetSuppliersOverviewQuery} from "@/lib/api/productsmanagement/supplierApiSlice";
import SuppliersTable from './supplierTable/SuppliersTable';


const SuppliersPage = () => {
    const { data: supplierData,error, isLoading } = useGetSuppliersOverviewQuery();

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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography  variant="h4"  component="h1"  sx={{fontWeight: 'bold',mb: 2,color:'primary.main'}}>
                    Supplier
                </Typography>
                <AddSupplierButton/>
            </Box>

            {/* Starting Table here */}
            <SuppliersTable suppliers={supplierData!} />
        </Box>
    );
};

export default SuppliersPage;