'use client';
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent
} from '@mui/material';

interface AddStoreProps {
    onSubmitSuccess: (newStore: Store) => void;
}

interface Store {
    store_id: number;
    store_name: string;
    store_address: string;
    store_contact_person: string;
    store_type: string;
    // Add other relevant fields here
}

const AddStore: React.FC<AddStoreProps> = ({ onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        storeName: '',
        storeAddress: '',
        storePhoneNumber: '',
        storeBranch: '',
        storeEmail: '',
        storeContactPerson: '',
        storeContactTitle: '',
        storeAlternatePhoneNumber: '',
        storeType: '',
        notes: '',
        isMainStore: false,
    });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<unknown>, name: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: event.target.value as string,
        }));
    };

    const generateRandomData = () => {
        const randomString = (length: number) => Math.random().toString(36).substring(2, 2 + length);
        const randomNumber = (max: number) => Math.floor(Math.random() * max);

        setFormData({
            storeName: `Store ${randomString(5)}`,
            storeAddress: `${randomNumber(1000)} Main St`,
            storeBranch:`Branch Number ${randomNumber(1000)} `,
            storePhoneNumber: `${randomNumber(900)}-555-${randomNumber(9000)}`,
            storeEmail: `test${randomString(5)}@example.com`,
            storeContactPerson: `Person ${randomString(5)}`,
            storeContactTitle: ['Owner', 'Sales Person', 'Manager'][randomNumber(3)],
            storeAlternatePhoneNumber: `${randomNumber(900)}-555-${randomNumber(9000)}`,
            storeType: ['Retail', 'Wholesale', 'Distribution', 'Warehouse'][randomNumber(4)],
            notes: `Sample notes ${randomString(10)}`,
            isMainStore: Boolean(randomNumber(2)),
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newStore = {
            ...formData,
        };
        console.log('Adding new store:', newStore);

        try {
            const response = await fetch(`${baseUrl}/stores/addstore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStore),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Store added successfully:', result.store);

                // Call the callback with the new store data to update the table
                onSubmitSuccess(result.store);

                // Optionally, clear the form or handle success UI feedback
            } else {
                console.error('Failed to add store:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while adding store:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 600 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    Add a New Store
                </Typography>

                {/* Store Name and Store Type */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Store Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="store-type-label">Store Type</InputLabel>
                        <Select
                            labelId="store-type-label"
                            id="storeType"
                            value={formData.storeType}
                            onChange={(e) => handleSelectChange(e, 'storeType')}
                            label="Store Type"
                            name="storeType"
                        >
                            <MenuItem value="Retail">Retail</MenuItem>
                            <MenuItem value="Wholesale">Wholesale</MenuItem>
                            <MenuItem value="Distribution">Distribution</MenuItem>
                            <MenuItem value="Warehouse">Warehouse</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Store Address */}
                <TextField
                    label="Store Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleChange}
                />

                <TextField
                    label="Store Branch"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="storeBranch"
                    value={formData.storeBranch}
                    onChange={handleChange}
                />

                {/* Phone Number and Alternate Phone Number */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="storePhoneNumber"
                        value={formData.storePhoneNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Alternate Phone Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="storeAlternatePhoneNumber"
                        value={formData.storeAlternatePhoneNumber}
                        onChange={handleChange}
                    />
                </Box>

                {/* Email */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="storeEmail"
                        value={formData.storeEmail}
                        onChange={handleChange}
                    />
                </Box>

                {/* Contact Person and Contact Title */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Contact Person"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="storeContactPerson"
                        value={formData.storeContactPerson}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="contact-title-label">Contact Title</InputLabel>
                        <Select
                            labelId="contact-title-label"
                            id="storeContactTitle"
                            value={formData.storeContactTitle}
                            onChange={(e) => handleSelectChange(e, 'storeContactTitle')}
                            label="Contact Title"
                            name="storeContactTitle"
                        >
                            <MenuItem value="Owner">Owner</MenuItem>
                            <MenuItem value="Sales Person">Sales Person</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Notes */}
                <TextField
                    label="Notes"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Add Store
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={generateRandomData}
                        sx={{ ml: 2 }}
                        fullWidth
                    >
                        Fill Form
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddStore;
