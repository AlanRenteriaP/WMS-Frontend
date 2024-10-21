// UnitSelect.tsx

import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useGetUnitsQuery } from '@/lib/api/productsmanagement/unitsApiSlice';
// UnitSelect.tsx

interface UnitSelectProps {
    value: number;
    onChange: (e: SelectChangeEvent<number>) => void;
    disabled?: boolean;
    name: string;
}

const UnitSelect: React.FC<UnitSelectProps> = ({ value, onChange, disabled, name }) => {
    const { data: units, isLoading: isUnitsLoading, error: unitsError } = useGetUnitsQuery();

    return (
        <FormControl fullWidth >
            <InputLabel>Unit</InputLabel>
            <Select
                name={name}
                value={value !== 0 ? value : ''}
                onChange={onChange}
                label="Unit"
                variant="outlined"
                disabled={isUnitsLoading || !!unitsError || disabled}
            >
                {isUnitsLoading ? (
                    <MenuItem value="">Loading...</MenuItem>
                ) : unitsError ? (
                    <MenuItem value="">Error loading units</MenuItem>
                ) : (
                    units?.map((unit) => (
                        <MenuItem key={unit.unit_id} value={unit.unit_id}>
                            {unit.unit_name}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default UnitSelect;
