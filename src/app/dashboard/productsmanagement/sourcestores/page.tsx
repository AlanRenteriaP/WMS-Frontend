import React from 'react';
import SourceTable from './components/sourcetable';
import AddStoreButton from "./components/addStoreButton";
import {Typography, Box} from "@mui/material";

const SourcesStores: React.FC = () => {

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Source Store
                </Typography>
                <AddStoreButton />
            </Box>

            <SourceTable />
        </Box>
    );
};

export default SourcesStores;
