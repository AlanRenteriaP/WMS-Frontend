// ProductsTable.jsx
import React from 'react';
import GenericTable from '@/components/table/genericTable';
import { Column } from '@/types/common/table';
import ProductsTable from './productsTable/productsTable';
import {Ingredients} from "@/types/productsmanagement";
import { ingredientsColumns } from "@/common/constants/table/columns";
import {Typography} from '@mui/material';
import AddProductButton from "@/components/AddButtons/addProductsButton/AddProductButton";
// Define the props type
interface IngredientsTableProps {
    ingredients: Ingredients[]; // Expect an array of Supplier objects
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }) => {


    return (
        <>
            <GenericTable
                data={ingredients}
                columns={ingredientsColumns}
                isNested={true} // Set to true to show expand/collapse arrow
                renderNestedTable={(ingredient) => {
                    // Destructure the products array from the ingredient object
                    const { products, ...ingredientsInfo } = ingredient;

                    return products && products.length > 0 ? (
                        <ProductsTable ingredient={ingredient} />
                    ) : (
                        <Typography variant="body2" component="div" style={{ marginLeft: '20px' }}>
                            No products available, please <AddProductButton ingredient={ingredientsInfo} />
                        </Typography>
                    );
                }}
            />
        </>
    );
};

export default IngredientsTable;
