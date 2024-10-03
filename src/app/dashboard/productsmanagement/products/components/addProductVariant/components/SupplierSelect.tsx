import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useGetSuppliersQuery } from '@/lib/api';

interface SupplierSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    disabled?: boolean;
}

const SupplierSelect: React.FC<SupplierSelectProps> = ({ value, onChange, disabled }) => {
    const { data: suppliers, isLoading: isSuppliersLoading, error: suppliersError } = useGetSuppliersQuery();

    return (
        <FormControl fullWidth>
            <InputLabel>Supplier</InputLabel>
            <Select
                name="supplier"
                value={value}
                onChange={onChange}
                label="Supplier"
                disabled={isSuppliersLoading || !!suppliersError || disabled}
                variant="outlined" // You can choose "outlined", "filled", or "standard"
            >
                {isSuppliersLoading ? (
                    <MenuItem value="">Loading...</MenuItem>
                ) : suppliersError ? (
                    <MenuItem value="">Error loading suppliers</MenuItem>
                ) : (
                    suppliers?.map((supplier) => (
                        <MenuItem key={supplier.supplier_id} value={supplier.supplier_id}>
                            {supplier.supplier_name}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default SupplierSelect;
