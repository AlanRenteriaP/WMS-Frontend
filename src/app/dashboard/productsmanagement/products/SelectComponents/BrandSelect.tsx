import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useGetBrandsQuery } from '@/lib/api';

interface BrandSelectProps {
    value: number; // Use only number type
    onChange: (e: SelectChangeEvent<number>) => void; // Use SelectChangeEvent<number>
    disabled?: boolean;
}

const BrandSelect: React.FC<BrandSelectProps> = ({ value, onChange, disabled }) => {
    const { data: brands, isLoading: isBrandsLoading, error: brandsError } = useGetBrandsQuery();

    return (
        <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
                name="brand"
                value={value !== 0 ? value : ''} // Default to empty string if value is 0 (assuming 0 isn't a valid `brand_id`)
                onChange={onChange}
                label="Brand"
                disabled={isBrandsLoading || !!brandsError || disabled}
                variant="outlined"
            >
                {isBrandsLoading ? (
                    <MenuItem value="">Loading...</MenuItem>
                ) : brandsError ? (
                    <MenuItem value="">Error loading brands</MenuItem>
                ) : (
                    brands?.map((brand) => (
                        <MenuItem key={brand.brand_id} value={brand.brand_id ?? ''}>
                            {brand.brand_name ?? 'Unknown Brand'}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default BrandSelect;