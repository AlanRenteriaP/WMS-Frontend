import React, { useState } from 'react';
import GenericTable from "@/components/table/genericTable";
import { Products } from '@/types/productsmanagement/products';
import { productsColumns } from "@/common/constants/table/columns";
import ProductModal from "@/components/modals/ProductModal/ProductModal";

interface ProductsTableProps {
    products: Products[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState<Products | null>(null); // State to track the selected product
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const handleRowClick = (rowData: Products) => {
        setSelectedProduct(rowData); // Set the clicked row's data
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedProduct(null); // Reset the selected product
    };

    return (
        <>
            {/* Render GenericTable with row click handling */}
            <GenericTable
                data={products}
                columns={productsColumns}
                onRowClick={handleRowClick} // Pass the row click handler
                enableRowClick={true} // Ensure rows are clickable
            />

            {/* Render ProductModal and pass relevant props */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    );
};

export default ProductsTable;
