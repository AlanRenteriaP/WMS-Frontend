"use client";
import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import {SupplierInput} from '@/types/productsmanagement/suppliers';
import {useAddSupplierMutation} from "@/lib/api/productsmanagement/supplierApiSlice";

const AddSupplierButton = () => {
    // State for Modal
    const [open, setOpen] = useState(false);
    const [addSupplier, { isLoading, isSuccess, isError, error }] = useAddSupplierMutation();

    const [formData, setFormData] = useState<SupplierInput>({
        supplier_name: '',
        location: '',
    });


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addSupplier(formData).unwrap();
            // Optionally reset form or show success message
            setFormData({ supplier_name: '', location: '' });
            handleClose(); // Close the modal on success

        } catch (err) {
            console.error('Failed to add supplier:', err);
        }
    };

    return (
        <>
            <Button variant="contained" color="success" onClick={handleOpen}>
                Add Supplier
            </Button>

            <Modal open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" component="h2">
                            Add New Supplier
                        </Typography>

                        {/* Supplier Name Input */}
                        <TextField
                            label="Supplier Name"
                            fullWidth
                            name="supplier_name"
                            sx={{mt: 2}}
                            value={formData.supplier_name}
                            onChange={handleChange}
                            required
                        />

                        {/* Supplier Location Input */}
                        <TextField
                            label="Supplier Location"
                            fullWidth
                            name="location"
                            sx={{mt: 2}}
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />

                        {/* Save Button */}
                        <Button type="submit" variant="contained" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Save Supplier'}
                        </Button>
                        {isSuccess && <p>Supplier added successfully!</p>}
                        {isError && <p>Error adding supplier: {String(error)}</p>}
                    </Box>
                </form>
            </Modal>
        </>
);
};

export default AddSupplierButton;
