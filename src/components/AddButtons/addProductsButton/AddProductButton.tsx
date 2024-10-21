// src/SelectComponents/products/AddProductButton.tsx

import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import AddProductModal from './AddProductModal';
import useToggle from "@/common/useToggle";
import { Ingredients } from '@/types/productsmanagement/ingredients'

interface AddProductProps {
    ingredient: Omit<Ingredients, 'products'>; // Exclude 'products' from Ingredients
}

const AddProductButton: React.FC<AddProductProps>  = ( {ingredient }) => {
    const { open, handleOpen, handleClose, toggle } = useToggle();

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
                Add Product
            </Button>
            <AddProductModal
                open={open}
                onClose={handleClose}

                ingredientInfo={ingredient}
            />
        </Box>
    );
};

export default AddProductButton;
