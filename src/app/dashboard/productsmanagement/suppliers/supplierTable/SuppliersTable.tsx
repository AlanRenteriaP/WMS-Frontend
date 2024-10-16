import React from 'react';
import GenericTable from '@/components/table/genericTable';
import { Column } from '@/types/common/table';
import IngredientsTable from './ingredientsTable/IngredientsTable';
import { Suppliers } from '@/types/productsmanagement'; // Ensure you're importing the correct type
import {supplierColumns} from '@/common/constants/table/columns/supplierColumns';
import {Typography} from "@mui/material";

// Define the props type
interface SuppliersTableProps {
    suppliers: Suppliers[]; // Expect an array of Supplier objects
}

const SuppliersTable: React.FC<SuppliersTableProps> = ({ suppliers }) => {



    return (
        <>
            Suppliers Table
        <GenericTable
            data={suppliers}
            columns={supplierColumns}
            isNested={true} // Set to true to show expand/collapse arrow
            // Set to true to show expand/collapse arrow

            renderNestedTable={(suppliers) => (
                suppliers.ingredients && suppliers.ingredients.length  > 0 ? (
                <IngredientsTable ingredients={suppliers.ingredients} />
                ) : (
                    <Typography variant="body2" style={{ marginLeft: '20px' }}>
                        No products available
                    </Typography>
                )
            )}
        />
        </>
    );
};

export default SuppliersTable;
