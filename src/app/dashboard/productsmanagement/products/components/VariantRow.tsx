// src/components/products/VariantRow.tsx
import React from 'react';
import { ProductVariant } from '@/types/products'; // Import the type
import { TableRow, TableCell } from '@mui/material';
import { format } from 'date-fns';

interface VariantRowProps {
    variant: ProductVariant;
}

const VariantRow: React.FC<VariantRowProps> = ({ variant }) => {
    return (
        <TableRow>
            <TableCell>{variant.sku}</TableCell>
            <TableCell>{variant.presentation || 'N/A'}</TableCell>
            <TableCell align="right">{variant.quantity || 0}</TableCell>
            <TableCell>{variant.unit || 'N/A'}</TableCell>
            <TableCell align="right">{variant.price || 0}</TableCell>
            <TableCell>{variant.is_active ? 'Active' : 'Inactive'}</TableCell>
            <TableCell>{variant.source || 'N/A'}</TableCell>
            <TableCell>
                {variant.updated_at
                    ? format(new Date(variant.updated_at), 'MM/dd/yyyy')
                    : 'N/A'}
            </TableCell>
            <TableCell>{/* Actions */}</TableCell>
        </TableRow>
    );
};

export default VariantRow;
