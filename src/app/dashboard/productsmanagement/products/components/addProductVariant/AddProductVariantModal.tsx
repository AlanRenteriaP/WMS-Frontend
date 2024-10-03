import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
} from '@mui/material';
import UnitSelect from './components/UnitSelect';
import BrandSelect from './components/BrandSelect';
import SupplierSelect from './components/SupplierSelect';
import { useAddProductVariantMutation } from '@/lib/api';
import { ProductVariantInput } from '@/types/productsmanagement/products';

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
    // State to manage form inputs
    const [variantData, setVariantData] = useState<Omit<ProductVariantInput, 'product_id'>>({
        unit_id: null, // Should be a valid unit ID
        price: 0, // Price of the variant
        package_size: 0, // Size of the package
        supplier_id: null, // Should be a valid supplier ID
        brand_id: null, // Should be a valid brand ID
        upc: '', // Optional, could be empty
        attributes: {}, // Optional
    });

    const [addProductVariant, { isLoading }] = useAddProductVariantMutation();

    // Handle changes for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVariantData({
            ...variantData,
            [name]: name === 'package_size' || name === 'price' ? parseFloat(value) : value,
        });
    };

    // Handle changes for select fields (e.g., Unit, Brand, Supplier)
    const handleSelectChange = (name: string, value: number) => {
        setVariantData({
            ...variantData,
            [name]: value,
        });
    };

    // Handle submitting the form
    const handleAddVariant = async () => {
        // Validate that all required fields are filled
        if (!variantData.unit_id || !variantData.supplier_id || !variantData.brand_id) {
            alert("Please fill out all required fields.");
            return;
        }

        // Prepare the request payload
        const payload: ProductVariantInput = {
            product_id: productId,
            unit_id: variantData.unit_id,
            supplier_id: variantData.supplier_id,
            brand_id: variantData.brand_id,
            package_size: variantData.package_size,
            price: variantData.price,
        };

        console.log('Payload being sent:', payload); // Log the payload to check if everything is correct

        try {
            // Call the mutation function
            await addProductVariant(payload).unwrap();
            onClose();
        } catch (error: any) {
            console.error('Error adding variant:', error.message);
            alert('Error Message: ' + JSON.stringify(error, null, 2));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Add Variant to <strong>{product_name}</strong>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Package Size"
                            name="package_size"
                            value={variantData.package_size}
                            onChange={handleInputChange}
                            type="number" // Ensure the input is numerical
                        />
                        <UnitSelect
                            value={variantData.unit_id || ''} // Provide a default empty value if not set
                            onChange={(e) => handleSelectChange('unit_id', parseInt(e.target.value))}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={variantData.price}
                            onChange={handleInputChange}
                            type="number"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <BrandSelect
                            value={variantData.brand_id || ''} // Provide a default empty value if not set
                            onChange={(e) => handleSelectChange('brand_id', parseInt(e.target.value))}
                        />
                        <SupplierSelect
                            value={variantData.supplier_id || ''} // Provide a default empty value if not set
                            onChange={(e) => handleSelectChange('supplier_id', parseInt(e.target.value))}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
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
