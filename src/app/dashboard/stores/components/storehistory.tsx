import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StoreHistory = ({ selectedStore }) => {
    // Dummy data for demonstration
    const orderHistory = [
        { orderNumber: '001', route: 'Route A', date: '2024-08-01', amount: 200 },
        { orderNumber: '002', route: 'Route B', date: '2024-07-15', amount: 350 },
        { orderNumber: '003', route: 'Route A', date: '2024-06-20', amount: 150 },
        // Add more orders here
    ];

    const totalAmountLastMonth = 200;  // Replace with real calculation
    const totalAmountLast3Months = 700;  // Replace with real calculation
    const totalAmountLastYear = 1500;  // Replace with real calculation

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total Amount Spent
                </Typography>
                <Typography variant="body1">
                    Last Month: ${totalAmountLastMonth}
                </Typography>
                <Typography variant="body1">
                    Last 3 Months: ${totalAmountLast3Months}
                </Typography>
                <Typography variant="body1">
                    Last Year: ${totalAmountLastYear}
                </Typography>
            </CardContent>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Number</TableCell>
                                <TableCell>Route</TableCell>
                                <TableCell>Date Ordered</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderHistory.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>{order.orderNumber}</TableCell>
                                    <TableCell>{order.route}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>${order.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default StoreHistory;
