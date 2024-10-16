// ProductsTable.jsx
import React from 'react';
import GenericTable from '@/components/table/genericTable';
import { productsColumns} from '@/common/constants/table/columns';
import { Products } from "@/types/productsmanagement";

interface ProductsTableProps{
    products: Products[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
    const excludeColumns = ["brand_name"]; // Columns to exclude

    const filteredColumns = productsColumns.filter(column => !excludeColumns.includes(column.accessor));



    return (
        <>
            ProductsTable
            <GenericTable
                data={products}
                columns={filteredColumns}
                // isNested={true}
                // No renderNestedTable needed here
            />
        </>
    );
};

export default ProductsTable;
