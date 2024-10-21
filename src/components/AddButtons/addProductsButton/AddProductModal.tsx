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
import UnitSelect from '@/components/SelectComponents/UnitSelect';
import BrandSelect from '@/components/SelectComponents/BrandSelect';
import SupplierSelect from '@/components/SelectComponents/SupplierSelect';
import { useAddProductMutation  } from '@/lib/api/productsmanagement/productsApiSlice';
import { useGetIngredientsOverviewQuery} from "@/lib/api/productsmanagement/ingredientsApiSlice";
import {useGetBrandsOverviewQuery } from "@/lib/api/productsmanagement/brandsApiSlice";
import { AddProductInput } from '@/types/productsmanagement/products';
import { Ingredients } from '@/types/productsmanagement/ingredients'


interface AddProductVariantModalProps {
    open: boolean;
    onClose: () => void;
    ingredientInfo: Omit<Ingredients, 'products'>;
}

const AddProductModal: React.FC<AddProductVariantModalProps> = ({
                                                                           open,
                                                                           onClose,ingredientInfo
                                                                       }) => {

    const [productData, setProductData] = useState({
        unit_id: 0,
        supplier_id: 0,
        brand_id: 0,
        price: 0,
        package_size: 0,
    });


    const [addProduct, { isLoading }] = useAddProductMutation();
    const { refetch: refetchIngredients } = useGetIngredientsOverviewQuery();
    const {refetch: refetchBrands } =  useGetBrandsOverviewQuery();
    // Handle changes for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setProductData({
            ...productData,
            [name]: name === 'package_size' ? parseFloat(value) : value,
        });
    };

    // Handle changes for select fields (e.g., Unit, Brand, Supplier)
    const handleSelectChange = (name: string, value: number) => {
        setProductData({
            ...productData,
            [name]: value,
        });
    };


    // Handle submitting the form
    const handleAddProduct = async () => {
        // Validate that all required fields are filled
        if (!productData.unit_id || !productData.package_size || !productData.brand_id) {
            alert("Please fill out all required fields.");
            return;
        }

        // Prepare the request payload
        const payload: AddProductInput = {
            brand_id: productData.brand_id,
            package_size: productData.package_size,
            unit_id: productData.unit_id,
            ingredient_id: ingredientInfo.ingredient_id
        };

        console.log('Payload being sent:', payload); // Log the payload to check if everything is correct

        try {
            // Call the mutation function
            const result = await addProduct(payload).unwrap();
            console.log('Product added successfully:', result);
            refetchIngredients();
            refetchBrands();
            onClose();
        } catch (error: any) {
            console.error('Error adding variant:', error.message);
            alert('Error Message: ' + JSON.stringify(error, null, 2));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {ingredientInfo.ingredient_name}
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Package Size"
                            name="package_size"
                            value={productData.package_size}
                            onChange={handleInputChange}
                            type="number" // Ensure the input is numerical
                        />
                        <UnitSelect
                            name="unit"
                            value={productData.unit_id} // Pass the value as a number
                            onChange={(e) => handleSelectChange('unit_id', parseInt(e.target.value as string, 10))}
                            disabled={isLoading}
                        />

                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <BrandSelect
                            name="unit_id"
                            value={productData.brand_id} // Provide a default empty value if not set
                            onChange={(e) => handleSelectChange('brand_id',parseInt(e.target.value as string, 10))}
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
                    onClick={handleAddProduct}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Product'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductModal;
