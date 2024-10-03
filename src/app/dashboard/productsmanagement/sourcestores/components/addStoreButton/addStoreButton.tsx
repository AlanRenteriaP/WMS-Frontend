"use client"
import { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

const AddStoreButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} onClick={handleOpen}>
                Add Store
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
                    <Typography variant="h6" component="h2">
                        Add New Source Store
                    </Typography>
                    <TextField label="Store Name" fullWidth sx={{ mt: 2 }} />
                    <TextField label="Location" fullWidth sx={{ mt: 2 }} />
                    {/* Add more fields as needed */}
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default AddStoreButton;
