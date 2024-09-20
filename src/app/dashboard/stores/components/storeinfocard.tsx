'use client';
import React from 'react';
import { Card, CardContent, Typography, Grid, Divider, Box } from '@mui/material';

interface StoreInfoCardProps {
    store: {
        store_name: string;
        store_address: string;
        store_phone_number: string;
        store_email: string;
        store_hours_of_operation: string;
        store_contact_person: string;
        store_contact_title: string;
        store_alternate_phone_number: string;
        store_status: string;
        store_type: string;
        store_capacity: number;
        latitude: number;
        longitude: number;
        store_payment_terms: string;
        store_credit_limit: number;
        notes: string;
        is_main_store: boolean;
        branch: string;
    };
}

const StoreInfoCard: React.FC<StoreInfoCardProps> = ({ store }) => {
    console.log(store);
    return (
        <Box>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5" component="div" gutterBottom>
                        {store.store_name} {store.is_main_store && "(Main Store)"}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6" component="div" color="textSecondary">
                        {store.branch}
                    </Typography>
                </Grid>
            </Grid>
            <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                        <Typography variant="subtitle1" gutterBottom>Contact Information</Typography>
                        <Typography variant="body2">
                            <strong>Contact Person:</strong> {store.store_contact_person} ({store.store_contact_title})
                        </Typography>
                        <Typography variant="body2">
                            <strong>Phone Number:</strong> {store.store_phone_number || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Alternate Phone Number:</strong> {store.store_alternate_phone_number || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Email:</strong> {store.store_email || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Hours of Operation:</strong> {store.store_hours_of_operation || "N/A"}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                        <Typography variant="subtitle1" gutterBottom>Store Information</Typography>
                        <Typography variant="body2">
                            <strong>Status:</strong> {store.store_status || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Type:</strong> {store.store_type || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Capacity:</strong> {store.store_capacity || "N/A"} pesos average
                        </Typography>
                        <Typography variant="body2">
                            <strong>Address:</strong> {store.store_address || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Location:</strong> Latitude {store.latitude || "N/A"}, Longitude {store.longitude || "N/A"}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                        <Typography variant="subtitle1" gutterBottom>Financial Information</Typography>
                        <Typography variant="body2">
                            <strong>Payment Terms:</strong> {store.store_payment_terms || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Credit Limit:</strong>
                              ${store.store_credit_limit || "N/A"}

                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body2">
                        <strong>Notes:</strong> {store.notes || "N/A"}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StoreInfoCard;
