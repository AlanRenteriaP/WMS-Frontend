import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent, // Import SelectChangeEvent type from MUI
} from '@mui/material';
import { useGetUnitsQuery } from '@/lib/api/productsmanagement';

interface UnitSelectProps {
    value: number; // Use only number type
    onChange: (e: SelectChangeEvent<number>) => void; // Use SelectChangeEvent<number> instead
    disabled?: boolean;
}

const UnitSelect: React.FC<UnitSelectProps> = ({ value, onChange, disabled }) => {
    const { data: units, isLoading: isUnitsLoading, error: unitsError } = useGetUnitsQuery();

    return (
        <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select
                name="unit"
                value={value !== 0 ? value : ''} // Default to empty string if value is 0 (assuming 0 isn't a valid `unit_id`)
                onChange={onChange} // No change needed here
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
                        <MenuItem key={unit.unit_id} value={unit.unit_id || ''}>
                            {unit.unit_name}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default UnitSelect;