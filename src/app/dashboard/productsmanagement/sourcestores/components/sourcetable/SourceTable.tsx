// src/app/dashboard/productsmanagement/sourcestores/components/sourcetable/sourcetable.tsx
"use client"
import React, { useState } from 'react';
import { useGetSourceStoresQuery } from '@/lib/api/productsmanagement';
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
    Paper,
} from '@mui/material';
import { Suppliers } from '@/types/productsmanagement'; // Import Product type (singular)




const SourceTable = () => {
    const { data: sourceStoresData, error, isLoading } = useGetSourceStoresQuery();  // Renamed 'Suppliers' to 'sourceStoresData'
    const [search, setSearch] = useState('');
    console.log('we got in the sourcetable file');
console.log(sourceStoresData);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.toLowerCase());
    };

    const filteredProducts = sourceStoresData?.filter((sourceStore: Suppliers) => // Changed type to singular 'SourceStore'
        sourceStore.name.toLowerCase().includes(search)
    );

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    if (error)
        return <Typography color="error">Error fetching source stores</Typography>; // Updated error message

    return (
        <Box >

            <TextField
                fullWidth
                label="Search Source Store"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={{ mb: 3 }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell /> {/* Empty cell for expand/collapse button */}
                            <TableCell>Store Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell align="right">Contact Information</TableCell>
                            <TableCell align="right">Associated Brands</TableCell>
                            <TableCell>Number of Products</TableCell>
                            <TableCell>Last Purchase Date</TableCell>
                            <TableCell>Availability</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts?.map((sourceStore: Suppliers) => (   // Properly render each store
                            <TableRow key={sourceStore.id}> {/* Ensure unique key */}
                                <TableCell /> {/* Empty cell for future expand/collapse button */}
                                <TableCell>{sourceStore.name}</TableCell>
                                <TableCell>{sourceStore.location}</TableCell>
                                <TableCell align="right">{sourceStore.contactInformation}</TableCell>
                                <TableCell align="right">{sourceStore.associatedBrands}</TableCell>
                                <TableCell>{sourceStore.numberOfProducts}</TableCell>
                                <TableCell>{sourceStore.lastPurchaseDate}</TableCell>
                                <TableCell>{sourceStore.isAvailable ? 'Available' : 'Unavailable'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SourceTable;
