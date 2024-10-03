// src/components/products/ProductRow.t`sx`
import React, { useState } from 'react';
import { Product } from '@/types/productsmanagement/products'; // Import the type
import {
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { format } from 'date-fns';
import VariantsTable from './variantTable/VariantsTable';
import AddProductVariantButton  from "../addProductVariant/AddProductVariantButton";

interface ProductRowProps {
    product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    // Format the last updated date
    const lastUpdated = product.last_updated
        ? format(new Date(product.last_updated), 'MM/dd/yyyy')
        : 'N/A';

    return (
        <>
            <TableRow>
                {/* Expand/Collapse Icon */}
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={handleToggle}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>

                {/* Product Information */}
                <TableCell component="th" scope="row">
                    {product.product_id}
                </TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.measurement || 'N/A'}</TableCell>
                <TableCell align="right">{product.number_of_variants}</TableCell>
                <TableCell>{product.price_range}</TableCell>
                <TableCell>{lastUpdated}</TableCell>
                <TableCell><AddProductVariantButton  productId={product.product_id} product_name={product.product_name}/></TableCell>
            </TableRow>

            {/* Expandable Row with Variants */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <VariantsTable variants={product.variants}  />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ProductRow;
