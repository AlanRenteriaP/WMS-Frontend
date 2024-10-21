"use client"
import React from 'react';
import { useGetIngredientsOverviewQuery } from '@/lib/api/productsmanagement/ingredientsApiSlice';
import {Box, CircularProgress, Typography} from "@mui/material";
import IngredientsTable from "./ingredientsTable/ingredientsTable";
import AddIngredientButton from "@/components/AddButtons/addIngredientButton/AddIngredientButton";


 const IngredientsPage = () => {
    const { data: ingredientsData, error, isLoading } = useGetIngredientsOverviewQuery();
     if (isLoading)
         return (
             <Box display="flex" justifyContent="center">
                 <CircularProgress />
             </Box>
         );

     if (error)
         return <Typography color="error">Error fetching ingredients </Typography>;


     return (

         <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
             <Box
                 sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                 }}
             >
                 <Typography  variant="h4"  component="h1"  sx={{fontWeight: 'bold',mb: 2,color:'primary.main'}}>
                     Ingredients
                 </Typography>
                 <AddIngredientButton />
             </Box>

             {/* Starting Table here */}
             <IngredientsTable ingredients={ingredientsData!} />
         </Box>
    );
}
export default IngredientsPage;
