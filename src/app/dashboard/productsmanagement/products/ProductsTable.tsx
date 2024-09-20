// src/app/dashboard/products/ProductsTable.tsx
import React, { useState } from 'react';
import { useGetProductsWithVariantsQuery } from '@/lib/api/products/productsApiSlice';
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
import ProductRow from './components/ProductRow'; // Import ProductRow component
import { Product } from '@/types/products'; // Import Product type

const ProductsTable = () => {
    const { data: products, error, isLoading } = useGetProductsWithVariantsQuery();
    const [search, setSearch] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.toLowerCase());
    };

    const filteredProducts = products?.filter((product: Product) =>
        product.product_name.toLowerCase().includes(search)
    );

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    if (error)
        return <Typography color="error">Error fetching products</Typography>;

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <TextField
                fullWidth
                label="Search Products"
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
                            <TableCell>Product Name</TableCell>
                            <TableCell>Measurement</TableCell>
                            <TableCell align="right">Number of Variants</TableCell>
                            <TableCell align="right">Total Quantity</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts?.map((product: Product) => (
                            <ProductRow key={product.id} product={product} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductsTable;
