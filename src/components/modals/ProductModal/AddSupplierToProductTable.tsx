import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Box,
    Modal,
    CircularProgress, Typography
} from '@mui/material';
import AddSupplierToProductModal from './AddSupplierToProductModal';
import useToggle from "@/common/useToggle";
import {useGetSupplierProductPriceQuery} from '@/lib/api/productsmanagement/productsApiSlice';
interface ProductModalProps {
    product: any;
}

const AddSupplierToProductTable: React.FC<ProductModalProps> = ({product }) => {
    const { open, handleOpen, handleClose } = useToggle();
    // Fetch the data using the query hook
    const { data: suppliers, error, isLoading } = useGetSupplierProductPriceQuery(product.product_id);

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );

    if (error)
        return <Typography color="error">Error fetching ingredients </Typography>;



    return (
        <div style={{paddingTop: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                <div>
                    {/* Button to open the modal */}
                    <Button variant="contained" onClick={handleOpen}>
                        Open Add Supplier Modal
                    </Button>

                    {/* Modal that is controlled by the useToggle hook */}
                    <AddSupplierToProductModal open={open} onClose={handleClose}/>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Supplier</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>is default</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {suppliers?.map(supplier => {
                            console.log(supplier); // This will log the supplier object to the console

                            return (
                                <TableRow
                                    key={supplier.supplier_id}
                                    style={{
                                        backgroundColor: supplier.is_default ? 'white' : 'lightcoral !important'
                                    }}
                                >
                                    <TableCell>{supplier.supplier_name}</TableCell>
                                    <TableCell>${supplier.default_price}</TableCell>
                                    <TableCell>{String(supplier.is_default)}</TableCell>
                                </TableRow>
                            );
                        })}



                    </TableBody>
                </Table>
            </TableContainer>



        </div>
    );
};

export default AddSupplierToProductTable;
