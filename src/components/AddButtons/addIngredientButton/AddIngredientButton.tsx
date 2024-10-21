import React, { useState } from 'react';
import {
    Button, Modal, Box, TextField, Typography,
} from '@mui/material';
import { IngredientInput } from '@/types/productsmanagement/ingredients';
import { useAddIngredientMutation } from '@/lib/api/productsmanagement/ingredientsApiSlice';
import UnitSelect from '@/components/SelectComponents/UnitSelect';
import { SelectChangeEvent } from '@mui/material';

const AddIngredientButton = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<IngredientInput>({
        ingredient_name: '',
        default_unit_id: 0,
    });

    const [addIngredient, { isLoading, isSuccess, isError, error, reset }] = useAddIngredientMutation();


    // Reset form and mutation state on open
    const handleOpen = () => {
        setOpen(true);
        reset();  // Reset the mutation state to hide success/error messages
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        setFormData({ ingredient_name: '', default_unit_id: 0 });
    };

    // Separate change handlers
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>
    ) => {
        const { name, value } = e.target;

        if (name) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addIngredient({
                ...formData,
                default_unit_id: Number(formData.default_unit_id),
            }).unwrap();
            handleClose();
        } catch (err) {
            console.error('Failed to add ingredient:', err);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{ backgroundColor: 'green', color: 'white' }}
                onClick={handleOpen}
            >
                Add Ingredient
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6" component="h2">
                            Add New Ingredient
                        </Typography>
                        <TextField
                            label="Ingredient Name"
                            name="ingredient_name"
                            value={formData.ingredient_name}
                            onChange={handleChange }
                            fullWidth
                            sx={{ mt: 2 }}
                            required
                        />
                        <UnitSelect
                            name="default_unit_id"
                            value={formData.default_unit_id}
                            onChange={handleChange }
                            disabled={isLoading}
                        />
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Save Ingredient'}
                        </Button>
                        {isSuccess && (
                            <Typography sx={{ mt: 2 }}>
                                Ingredient added successfully!
                            </Typography>
                        )}
                        {isError && (
                            <Typography sx={{ mt: 2, color: 'red' }}>
                                Error adding ingredient: {String(error)}
                            </Typography>
                        )}
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default AddIngredientButton;
