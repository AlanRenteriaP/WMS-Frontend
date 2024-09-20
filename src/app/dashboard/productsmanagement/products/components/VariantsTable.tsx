// src/components/products/VariantsTable.tsx
import React from 'react';
import { ProductVariant } from '@/types/products'; // Import the type
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

interface VariantsTableProps {
    variants: ProductVariant[];
}

const VariantsTable: React.FC<VariantsTableProps> = ({ variants }) => {
    return (
        <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
                Variants
            </Typography>
            <Table size="small" aria-label="variants">
                <TableHead>
                    <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Presentation</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Last Updated</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {variants.map((variant) => (
                        <VariantRow key={variant.id} variant={variant} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default VariantsTable;
