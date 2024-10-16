// ProductsTable.jsx
import React from 'react';
import GenericTable from '@/components/table/genericTable';
import { Column } from '@/types/common/table';
import ProductsTable from './productTable/ProductsTable';
import {Ingredients} from "@/types/productsmanagement";
import { ingredientsColumns } from "@/common/constants/table/columns";
import {Typography} from '@mui/material';
// Define the props type
interface IngredientsTableProps {
    ingredients: Ingredients[]; // Expect an array of Supplier objects
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }) => {


    return (
        <>
            IngredientsTable
            <GenericTable
                data={ingredients}
                columns={ingredientsColumns}
                isNested={true} // Set to true to show expand/collapse arrow
                renderNestedTable={(ingredient) =>
                    ingredient.products && ingredient.products.length > 0 ? (
                        <ProductsTable products={ingredient.products} />
                    ) : (
                        <Typography variant="body2" style={{ marginLeft: '20px' }}>
                            No products available
                        </Typography>
                    )
                }
            />
        </>
    );
};

export default IngredientsTable;
