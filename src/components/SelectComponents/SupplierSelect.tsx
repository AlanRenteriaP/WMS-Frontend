import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useGetSuppliersQuery } from '@/lib/api/productsmanagement/supplierApiSlice';

interface SupplierSelectProps {
    value: number; // Use only number type
    onChange: (e: SelectChangeEvent<number>) => void; // Use SelectChangeEvent<number>
    disabled?: boolean;
    name: string
}

const SupplierSelect: React.FC<SupplierSelectProps> = ({ value, onChange, disabled ,name}) => {
    const { data: suppliers, isLoading: isSuppliersLoading, error: suppliersError } = useGetSuppliersQuery();

    return (
        <FormControl fullWidth>
            <InputLabel>Supplier</InputLabel>
            <Select
                name={name}
                value={value !== 0 ? value : ''} // Default to empty string if value is 0 (assuming 0 isn't a valid `supplier_id`)
                onChange={onChange}
                label="Supplier"
                disabled={isSuppliersLoading || !!suppliersError || disabled}
                variant="outlined"
            >
                {isSuppliersLoading ? (
                    <MenuItem value="">Loading...</MenuItem>
                ) : suppliersError ? (
                    <MenuItem value="">Error loading suppliers</MenuItem>
                ) : (
                    suppliers?.map((supplier) => (
                        <MenuItem key={supplier.supplier_id} value={supplier.supplier_id ?? ''}>
                            {supplier.supplier_name ?? 'Unknown Supplier'}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default SupplierSelect;