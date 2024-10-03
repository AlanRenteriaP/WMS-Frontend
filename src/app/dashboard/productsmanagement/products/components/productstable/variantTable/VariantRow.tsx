import React from 'react';
import { ProductVariant } from '@/types/productsmanagement/products'; // Import the type
import { TableRow, TableCell } from '@mui/material';
import { format } from 'date-fns';

interface VariantRowProps {
    variant: ProductVariant;
}

const VariantRow: React.FC<VariantRowProps> = ({ variant}) => {
    console.log(variant);



    return (
        <TableRow>
            <TableCell>{variant.variant_id}</TableCell>
            <TableCell>{variant.upc || 'N/A'}</TableCell>
            <TableCell align="right">{variant.presentation || 0}</TableCell>
            <TableCell align="right">{variant.price || 0}</TableCell>
            <TableCell
                style={{
                    fontWeight: variant.is_default ? 'bold' : 'normal',
                    color: variant.is_default ? 'green' : 'gray',
                }}
            >
                {variant.is_default ? 'Active' : 'Inactive'}
            </TableCell>
            <TableCell>{variant.supplier || 'N/A'}</TableCell>
            <TableCell>{variant.brand || 'N/A'}</TableCell>

            <TableCell align="center" style={{ verticalAlign: 'middle' }}>
                {format(variant.last_updated, 'dd-MM-yyyy')}
            </TableCell>


            <TableCell>Grey Action Button</TableCell>
        </TableRow>
    );
};

export default VariantRow;
