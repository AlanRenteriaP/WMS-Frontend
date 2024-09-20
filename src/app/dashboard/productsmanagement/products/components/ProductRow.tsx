// src/components/products/ProductRow.tsx
import React, { useState } from 'react';
import { Product } from '@/types/products'; // Import the type
import {
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { format } from 'date-fns';
import VariantsTable from './VariantsTable';
import AddProductVariantButton from "./addProductVariant/AddProductVariantButton";

interface ProductRowProps {
    product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
    const [open, setOpen] = useState(false);

    const totalQuantity = product.variants.reduce(
        (total, variant) => total + (variant.quantity || 0),
        0
    );

    const lastUpdated = product.last_updated
        ? format(new Date(product.last_updated), 'MM/dd/yyyy')
        : 'N/A';

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={handleToggle}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {product.product_name}
                </TableCell>
                <TableCell>{product.measurement_name || 'N/A'}</TableCell>
                <TableCell align="right">{product.variants.length}</TableCell>
                <TableCell align="right">{totalQuantity}</TableCell>
                <TableCell>{lastUpdated}</TableCell>
                <TableCell><AddProductVariantButton productId={product.id} product_name={product.product_name} /> </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <VariantsTable variants={product.variants} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ProductRow;
