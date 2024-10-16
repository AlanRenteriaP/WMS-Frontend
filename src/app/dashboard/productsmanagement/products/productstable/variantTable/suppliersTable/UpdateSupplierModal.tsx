'use client';

import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { UpdateVariantInput } from '@/types/productsmanagement/products';
import UnitSelect from '@/app/dashboard/productsmanagement/products/SelectComponents/UnitSelect';
import BrandSelect from '@/app/dashboard/productsmanagement/products/SelectComponents/BrandSelect';
import SupplierSelect from '@/app/dashboard/productsmanagement/products/SelectComponents/SupplierSelect';
import { useSetVariantActiveMutation, useUpdateProductVariantMutation } from '@/lib/api/productsmanagement';


interface UpdateVariantModalProps {
    open: boolean;
    handleClose: () => void;
    variant: UpdateVariantInput;
    product_id: number;
}

const UpdateSupplierModal: React.FC<UpdateVariantModalProps> = ({ open, handleClose, variant, product_id }) => {
    const [updatedVariant, setUpdatedVariant] = React.useState<UpdateVariantInput>(variant);
    const [setVariantActive] = useSetVariantActiveMutation();
    const [updateProductVariant] = useUpdateProductVariantMutation();

    useEffect(() => {
        setUpdatedVariant(variant);
    }, [variant]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedVariant({ ...updatedVariant, [name]: value });
    };

    const handleSelectChange = (name: string, value: number) => {
        setUpdatedVariant({ ...updatedVariant, [name]: value });
    };

    const handleSave = async () => {
        try {
            // Trigger an action to save the updatedVariant
            console.log('Saving updated variant:', updatedVariant);
            await updateProductVariant({ id: updatedVariant.variant_id, data: updatedVariant }).unwrap();
            handleClose();
        } catch (error) {
            console.error('Error saving variant:', error);
        }
    };

    const submitChangeActive = async () => {
        try {
            await setVariantActive({ product_id: product_id, variant_id: variant.variant_id }).unwrap();
            console.log('Activating variant');
        } catch (error) {
            console.error('Error activating variant:', error);
        }
    };


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Product Variant</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2  }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Package Size"
                            name="package_size"
                            value={updatedVariant.package_size || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                        <UnitSelect
                            value={updatedVariant.unit_id || 0}
                            onChange={(e) => handleSelectChange('unit_id', parseInt(e.target.value as string, 10))}
                        />
                    </Box>
                    <TextField
                        margin="dense"
                        label="Price"
                        name="price"
                        value={updatedVariant.price || ''}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <BrandSelect
                            value={updatedVariant.brand_id || 0}
                            onChange={(e) => handleSelectChange('brand_id', parseInt(e.target.value as string, 10))}
                        />
                        <SupplierSelect
                            value={updatedVariant.supplier_id || 0}
                            onChange={(e) => handleSelectChange('supplier_id', parseInt(e.target.value as string, 10))}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>{!updatedVariant.is_default ? (
                <Button onClick={submitChangeActive} color="primary">
                    Make Active
                </Button>
            ) : (
                <Button disabled color="primary">
                    Currently Active
                </Button>
            )}
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateSupplierModal;