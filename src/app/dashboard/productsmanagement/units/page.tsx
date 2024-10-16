"use client";
import React from 'react';
import { useGetUnitsQuery } from '@/lib/api/productsmanagement/unitsApiSlice';
import {
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';
import GenericTable from '@/components/table/genericTable';
import { unitsColumns } from '@/common/constants/table/columns/unitsColumns';
import useFilteredData from '@/common/useFilteredData';

const UnitsPage: React.FC = () => {
    const { data: unitData, error, isLoading } = useGetUnitsQuery();

    // Use the useFilteredData hook
    const { search, handleSearchChange, filteredData } = useFilteredData(
        unitData,
        'unit_name', // The key to search by
        '' // Initial search value
    );

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Error fetching units</Typography>;
    }

    return (
        <Box sx={{ mx: 'auto', width: 'fit-content', padding: '10px' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                Units Table
            </Typography>

            {/* Search Input */}
            <Box display="flex" justifyContent="flex-start" mb={2} width="100%">
                <input
                    type="text"
                    placeholder="Search units..."
                    value={search}
                    onChange={handleSearchChange}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                />
            </Box>

            {/* Use GenericTable with filtered data */}
            <GenericTable data={filteredData} columns={unitsColumns} />
        </Box>
    );
};

export default UnitsPage;
