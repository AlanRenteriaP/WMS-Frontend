// src/components/products/AddProductVariantModal.tsx

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from '@mui/material';
import { useAddProductVariantMutation } from '@/lib/api/products/productsApiSlice';

interface AddProductVariantModalProps {
    open: boolean;
    onClose: () => void;
    productId: number;
    product_name: string;
}

const AddProductVariantModal: React.FC<AddProductVariantModalProps> = ({
                                                                           open,
                                                                           onClose,
                                                                           productId,
                                                                           product_name,
                                                                       }) => {
    const [variantData, setVariantData] = useState({
        presentation: '',
        quantity: '',
        unit: '',
        price: '',
        source: '',
    });

    const [addProductVariant, { isLoading }] = useAddProductVariantMutation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVariantData({
            ...variantData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddVariant = async () => {
        try {
            await addProductVariant({
                productId,
                variantData: {
                    presentation: variantData.presentation,
                    quantity: parseInt(variantData.quantity),
                    unit: variantData.unit,
                    price: parseFloat(variantData.price),
                    source: variantData.source,
                },
            }).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to add product variant:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Variant to <strong>{product_name}</strong></DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Presentation"
                            name="presentation"
                            value={variantData.presentation}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={variantData.quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Unit"
                            name="unit"
                            value={variantData.unit}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={variantData.price}
                            onChange={handleInputChange}
                            InputProps={{ startAdornment: <span>$</span> }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Source"
                            name="source"
                            value={variantData.source}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleAddVariant}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Variant'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductVariantModal;
