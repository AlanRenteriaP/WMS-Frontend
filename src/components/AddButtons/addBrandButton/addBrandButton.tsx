"use client"
import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import {BrandInput} from "@/types/productsmanagement";
import {useAddBrandMutation} from "@/lib/api/productsmanagement/brandsApiSlice";

const AddBrandButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [addBrand, {isLoading,isSuccess, isError,error}] = useAddBrandMutation();

    const [formData, setFormData] = useState<BrandInput>({
        brand_name: '',
    })

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await addBrand(formData).unwrap();
            setFormData({ brand_name: ''});
            handleClose();
        } catch(err) {
            console.error('Failed to add brand:', err);
        }
    }

    return (
        <>
            <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} onClick={handleOpen}>
                Add Brand
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <form onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2">
                        Add New Brand
                    </Typography>
                    <TextField label="Brand Name" name="brand_name" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
                    {/* Add more fields as needed */}
                    <Button variant="contained" sx={{ mt: 2 }} type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Save Brand'}
                    </Button>
                        {isSuccess && <p>Brand added successfully!</p>}
                        {isError && <p>Error adding Brand: {String(error)}</p>}
                     </form>
                </Box>
            </Modal>
        </>
    );
};

export default AddBrandButton;
