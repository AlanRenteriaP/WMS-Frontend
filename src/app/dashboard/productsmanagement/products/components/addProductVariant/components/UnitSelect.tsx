import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useGetUnitsQuery } from '@/lib/api/productsmanagement';

interface UnitSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    disabled?: boolean;
}

const UnitSelect: React.FC<UnitSelectProps> = ({ value, onChange, disabled }) => {
    const { data: units, isLoading: isUnitsLoading, error: unitsError } = useGetUnitsQuery();

    return (
        <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select
                name="unit"
                value={value}
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
