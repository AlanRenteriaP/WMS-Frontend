import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import storeData from '../storeData'; // Import the mock data

const StoreBranches = () => {
    const store = storeData; // Use the mock data

    return (
        <Box>
            <Typography
                variant="h5"
                component="h2"
                align="left"
                gutterBottom
                sx={{ marginTop: 2, marginBottom: 2 }}
            >
                Branches Associated
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Store Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Contact Person</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Branch</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store.sisters.map((branch, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor: branch.id === store.id ? '#f4f6f8' : 'inherit',
                                    fontWeight: branch.id === store.id ? 'bold' : 'normal',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <TableCell>{branch.name}</TableCell>
                                <TableCell>{branch.address}</TableCell>
                                <TableCell>{branch.contactPerson}</TableCell>
                                <TableCell>{branch.type}</TableCell>
                                <TableCell>{branch.branch}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StoreBranches;
