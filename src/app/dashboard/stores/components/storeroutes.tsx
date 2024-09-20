import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Storeroutes = ({ selectedStore }) => {
    // Dummy data for demonstration purposes
    const routes = [
        { routeName: 'Route A', orderNumber: '001', amount: '$200', date: '2024-08-01' },
        { routeName: 'Route B', orderNumber: '002', amount: '$350', date: '2024-07-15' },
        { routeName: 'Route C', orderNumber: '003', amount: '$150', date: '2024-06-20' },
        // Add more routes as needed
    ];

    return (
        <Card>
            <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    Store Routes
                </Typography>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Route Name</TableCell>
                                <TableCell>Order Number</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {routes.map((route, index) => (
                                <TableRow key={index}>
                                    <TableCell>{route.routeName}</TableCell>
                                    <TableCell>{route.orderNumber}</TableCell>
                                    <TableCell>{route.amount}</TableCell>
                                    <TableCell>{route.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default Storeroutes;
