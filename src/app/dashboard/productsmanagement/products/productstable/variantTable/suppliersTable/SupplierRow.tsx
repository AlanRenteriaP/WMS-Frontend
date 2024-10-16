import React, { useState } from 'react';
import { ProductVariant, UpdateVariantInput } from '@/types/productsmanagement/products'; // Import the types
import { TableRow, TableCell, Button } from '@mui/material';
import { format } from 'date-fns';
import UpdateSupplierModal from './UpdateSupplierModal'; // Import the modal component

interface VariantRowProps {
    variant: ProductVariant;
}

const SupplierRow: React.FC<VariantRowProps> = ({ variant }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Transform ProductVariant to UpdateVariantInput
    const updateVariantData: UpdateVariantInput = {
        variant_id: variant.variant_id,
        upc: variant.upc,
        price: variant.price,
        package_size: variant.package_size,
        unit_id: variant.unit_id, // Provide default values as needed
        brand_id: variant.brand_id,
        supplier_id: variant.supplier_id,
        is_default: variant.is_default,
    };

    return (
        <>
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

                <TableCell>
                    <Button variant="contained" style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleOpen}>
                        Action
                    </Button>
                </TableCell>
            </TableRow>


            <UpdateSupplierModal open={open} handleClose={handleClose} variant={{ ...updateVariantData}}  product_id={variant.variant_id}  />
        </>
    );
};

export default SupplierRow;