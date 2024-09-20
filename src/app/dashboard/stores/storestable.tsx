'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CardContent,Paper, Card,Typography, Button, Modal,Drawer, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddStore from './components/addstore';
import StoreInfo from './components/storeinfo';
interface Store {
    store_id: number;
    store_name: string;
    store_address: string;
    store_contact_person: string;
    store_type: string;
    branch: string;
    store_contact_title: string;
    store_phone_number: string;
    store_alternate_phone_number: string;
    store_email:string;
    store_hours_of_operation: string;
    store_status: string;
    store_capacity: string;
    store_payment_terms: string;
    store_credit_limit: number;
}

const StoresTable: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const toggleAddDrawer = (open: boolean) => () => {
        setAddDrawerOpen(open);
    };

    const toggleViewModal = (open: boolean) => () => {
        setViewModalOpen(open);
    };

    const handleAddDrawerClose = () => {
        setAddDrawerOpen(false);
    };

    const handleViewModalClose = () => {
        setViewModalOpen(false);
        setSelectedStore(null);
    };

    const handleAddStoreSuccess = (newStore: Store) => {
        console.log('Handling store success');
        console.log(newStore);  // This will now be the complete Store object
        setStores((prevStores) => [...prevStores, newStore]); // Add the new store to the list
        handleAddDrawerClose(); // Close the add store drawer after adding the store
    };

    const handleRowClick = (store: Store) => {
        setSelectedStore(store);
        setViewModalOpen(true);
    };

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch(`${baseUrl}/stores/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log(data);
                // Assuming data is an array of stores
                const filteredData = data.map((store: any) => ({
                    store_id: store.store_id,
                    store_name: store.store_name,
                    store_address: store.store_address,
                    store_contact_person: store.store_contact_person,
                    store_type: store.store_type,
                    branch: store.branch,
                    store_contact_title: store.store_contact_title,
                    store_phone_number: store.store_phone_number,
                    store_alternate_phone_number: store.store_alternate_phone_number,
                    store_email: store.store_email,
                    store_hours_of_operation: store.store_hours_of_operation,
                    store_status: store.store_status,
                    store_capacity: store.store_capacity,
                    store_payment_terms: store.store_payment_terms,
                    store_credit_limit: store.store_credit_limit,
                }));
                setStores(filteredData);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, [baseUrl]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <TableContainer component={Paper} className="w-full max-w-4xl mx-auto">
                <div className="flex justify-between items-center p-4">
                    <Typography variant="h6" component="div">
                        Stores Table
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'green', color: 'white', marginLeft: 'auto' }}
                        startIcon={<span>+</span>}
                        onClick={toggleAddDrawer(true)}
                    >
                        ADD STORE
                    </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Store Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Contact Person</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Branch</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stores.map((store) => (
                            <TableRow
                                key={store.store_id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#001f3f',
                                        '& .MuiTableCell-root': {
                                            color: 'white',
                                        },
                                    },
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleRowClick(store)}
                            >
                                <TableCell>{store.store_name}</TableCell>
                                <TableCell>{store.store_address}</TableCell>
                                <TableCell>{store.store_contact_person}</TableCell>
                                <TableCell>{store.store_type}</TableCell>
                                <TableCell>{store.branch}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Drawer for Adding a Store */}
            <Drawer
                anchor="bottom"
                open={addDrawerOpen}
                onClose={toggleAddDrawer(false)}
            >
                <Box sx={{ padding: 2, position: 'relative' }}>
                    <IconButton
                        onClick={toggleAddDrawer(false)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <AddStore onSubmitSuccess={handleAddStoreSuccess} />
                </Box>
            </Drawer>

            {/* Modal for Viewing Store Details */}
            <Modal
                open={viewModalOpen}
                onClose={toggleViewModal(false)}
                aria-labelledby="store-details-title"
                aria-describedby="store-details-description"
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: 1200,
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        p: 2,
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                    }}
                >
                    <IconButton
                        onClick={handleViewModalClose}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Card>
                        <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <StoreInfo selectedStore={selectedStore} />
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
};

export default StoresTable;
