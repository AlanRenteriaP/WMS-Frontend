import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useGetBrandsQuery } from '@/lib/api';

interface BrandSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    disabled?: boolean;
}

const BrandSelect: React.FC<BrandSelectProps> = ({ value, onChange, disabled }) => {
    const { data: brands, isLoading: isBrandsLoading, error: brandsError } = useGetBrandsQuery();

    return (
        <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
                name="brand"
                value={value}
                onChange={onChange}
                label="Brand"
                disabled={isBrandsLoading || !!brandsError || disabled}
                variant="outlined" // You can choose "outlined", "filled", or "standard"
            >
                {isBrandsLoading ? (
                    <MenuItem value="">Loading...</MenuItem>
                ) : brandsError ? (
                    <MenuItem value="">Error loading brands</MenuItem>
                ) : (
                    brands?.map((brand) => (
                        <MenuItem key={brand.brand_id} value={brand.brand_id}>
                            {brand.brand_name}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default BrandSelect;
