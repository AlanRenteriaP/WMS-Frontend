import React from 'react';
import { Box, Modal, Typography, Divider } from "@mui/material";
import AddSupplierToProductTable from "@/components/modals/ProductModal/AddSupplierToProductTable";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }} // Remove outline here
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 24,
                    width: 400,
                    maxWidth: '90%',
                    textAlign: 'center',
                    outline: 'none', // Remove the outline from the Box component
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Product Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {product && (
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>ID:</strong> {product.product_id}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Brand ID:</strong> {product.brand_name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Package Size:</strong> {product.package_size}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Ingredient ID:</strong> {product.ingredient_name}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Default Supplier Product ID:</strong> {product.default_supplier_product_id || 'N/A'}
                        </Typography>
                    </Box>
                )}


                <AddSupplierToProductTable  product={product} />
            </Box>
        </Modal>
    );
};

export default ProductModal;
