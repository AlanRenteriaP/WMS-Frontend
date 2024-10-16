import React, { useState } from 'react';
import { ProductVariant, UpdateVariantInput } from '@/types/productsmanagement/products'; // Import the types
import {TableRow, TableCell, Button, Collapse, Box, IconButton} from '@mui/material';
import { format } from 'date-fns';
import UpdateVariantModal from './UpdateVariantModal';
import VariantsTable from "./VariantsTable";
import SuppliersTable from "./suppliersTable/SuppliersTable";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";

interface VariantRowProps {
    variant: ProductVariant;
}

const VariantRow: React.FC<VariantRowProps> = ({ variant }) => {
    const [open, setOpen] = useState(false);
    const [expand, setExpand] = useState(false);

    const handleToggle = () => {
        setExpand(!expand);
    };
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

                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={handleToggle}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>

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
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <SuppliersTable   />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <UpdateVariantModal open={open} handleClose={handleClose} variant={{ ...updateVariantData}}  product_id={variant.variant_id}  />
        </>
    );
};

export default VariantRow;