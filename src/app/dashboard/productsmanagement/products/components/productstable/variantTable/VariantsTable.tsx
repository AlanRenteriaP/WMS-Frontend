// src/components/products/VariantsTable.tsx
import React from 'react';
import { ProductVariant } from '@/types/productsmanagement/products'; // Import the type
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import VariantRow from './VariantRow';



const VariantsTable: React.FC<{ variants: ProductVariant[] }> = ({ variants }) => {

    return (
        <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
                Variants
            </Typography>
            <Table size="small" aria-label="variants">
                <TableHead>
                    <TableRow>
                        <TableCell>Variant ID (SKU)</TableCell> {/* Display the `variant_id` or `upc` if available */}
                        <TableCell>UPC</TableCell> {/* Display `upc` if available */}
                        <TableCell>package_size</TableCell> {/* e.g., "500 ml" using `package_size` and `unit_name` */}
                        <TableCell align="right">Price</TableCell> {/* Display `price` */}
                        <TableCell>Status</TableCell> {/* Display the status, e.g., 'active' or 'inactive' */}
                        <TableCell>Supplier</TableCell> {/* Supplier name from `supplier_name` */}
                        <TableCell>Brand</TableCell> {/* Supplier name from `supplier_name` */}
                        <TableCell>Last Updated</TableCell> {/* Display the last updated date (`price_date`) */}
                        <TableCell>Actions</TableCell> {/* For edit/delete actions */}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {variants.map((variant) => (
                        <VariantRow key={variant.variant_id} variant={variant}    />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default VariantsTable;
