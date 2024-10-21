import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, Modal, Typography
} from '@mui/material';
import SupplierSelect from "@/components/SelectComponents/SupplierSelect";

// Define props for the modal (e.g., open state and callbacks)
interface ProductModalProps {
    open: boolean;
    onClose: () => void;
}

const AddSupplierToProductModal: React.FC<ProductModalProps> = ({ open, onClose }) => {

    const [SupplierPriceData, setProductData] = useState({
        supplier_id: 0,
        product_id: 0,
        price: 0,
    });

    // Handle changes for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({
            ...SupplierPriceData,
            [name]: name === 'price' ? parseFloat(value) : value,
        });
    };

    // Handle changes for select fields (e.g., Supplier)
    const handleSelectChange = (name: string, value: number) => {
        setProductData({
            ...SupplierPriceData,
            [name]: value,
        });
    };

    // Handle modal submit (e.g., send data to API)
    const handleSubmit = () => {
        // Validate the inputs before proceeding
        if (SupplierPriceData.supplier_id === 0 || SupplierPriceData.price <= 0) {
            alert('Please select a valid supplier and price.');
            return;
        }

        // Submit logic (you can integrate an API call here)
        console.log('Supplier ID:', SupplierPriceData.supplier_id, 'Price:', SupplierPriceData.price);
        onClose(); // Close modal after submitting
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-supplier-modal-title"
            aria-describedby="add-supplier-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="add-supplier-modal-title" variant="h6" component="h2">
                    Add Supplier to Product
                </Typography>
                <Typography id="add-supplier-modal-description" sx={{ mt: 2 }}>
                    Please select a supplier and provide the price they sell at.
                </Typography>

                {/* Supplier Select */}
                <Box sx={{ mt: 3 }}>
                    <SupplierSelect
                        name="supplier_id"
                        value={SupplierPriceData.supplier_id}
                        onChange={(e) => handleSelectChange('supplier_id', parseInt(e.target.value as string, 10))}
                    />
                </Box>

                {/* Price Input */}
                <Box sx={{ mt: 3 }}>
                    <TextField
                        label="Price"
                        name="price" // Add the name attribute here
                        type="number"
                        value={SupplierPriceData.price || ''} // Ensure value is empty if price is 0
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>

                {/* Modal Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button onClick={onClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Add Supplier
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddSupplierToProductModal;
