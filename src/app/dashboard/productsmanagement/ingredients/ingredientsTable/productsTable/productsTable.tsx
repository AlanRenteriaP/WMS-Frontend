// ProductsTable.jsx
import React from 'react';
import GenericTable from '@/components/table/genericTable';
import { productsColumns} from '@/common/constants/table/columns';
import { Ingredients } from "@/types/productsmanagement";
import AddProductButton from "@/components/AddButtons/addProductsButton/AddProductButton";

interface ProductsTableProps{
    ingredient: Ingredients;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ ingredient }) => {
    const excludeColumns = ["ingredient_name"]; // Columns to exclude

    const filteredColumns = productsColumns.filter(column => !excludeColumns.includes(column.accessor));
    const {products , ...ingredientsInfo} = ingredient;

    return (
        <>
            ProductsTable      <AddProductButton  ingredient={ingredientsInfo} />
            <GenericTable
                data={products}
                columns={ filteredColumns }
                // isNested={true}
                // No renderNestedTable needed here
            />
        </>
    );
};

export default ProductsTable;
