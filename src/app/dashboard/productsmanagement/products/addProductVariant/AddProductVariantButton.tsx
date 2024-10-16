// src/SelectComponents/products/AddProductVariantButton.tsx

import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import AddProductVariantModal from './AddProductVariantModal';

interface AddProductVariantButtonProps {
    productId: number;
    product_name: string;
}

const AddProductVariantButton: React.FC<AddProductVariantButtonProps> = ({ productId, product_name }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    fontSize: '0.875rem',
                    padding: '6px 12px',
                    textTransform: 'none',
                    backgroundColor: '#424242',
                    '&:hover': {
                        backgroundColor: '#333333',
                    },
                }}
            >
                Add Product Variant
            </Button>
            <AddProductVariantModal
                open={open}
                onClose={handleClose}
                productId={productId}
                product_name={product_name}
            />
        </Box>
    );
};

export default AddProductVariantButton;
