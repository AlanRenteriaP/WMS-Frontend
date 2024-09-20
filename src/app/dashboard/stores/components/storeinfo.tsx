import React from 'react';
import StoreInfoCard from './storeinfocard';
import StoreBranches from './storebranches';
import StoreRoutes from './storeroutes';
import StoreHistory from './storehistory';
import { Card, CardContent } from '@mui/material';

const StoreInfo = ({ selectedStore }) => {
    return (

            <div>
            {/* Store Info */}
            <div>
            <StoreInfoCard store={selectedStore} />
            </div>
                    {/* Order History */}
                    <div>
                            <StoreHistory store={selectedStore} />
                    </div>

            {/* Store Branches */}
            <div>
                {/* Add your table component for store branches here */}
                    <StoreBranches store={selectedStore} />

            </div>

            {/* Route Information */}
            <div>
                {/* Add your route information component here */}
                    <StoreRoutes store={selectedStore} />
            </div>


            </div>

    );
};

export default StoreInfo;



