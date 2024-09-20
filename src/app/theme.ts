"use client"; // Mark this file as a Client Component

// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#231810', // Customize this color
        },
        secondary: {
            main: '#FCF3C0', // Customize this color
        },
        background: {
            default: '#f4f6f8', // Background color for the entire dashboard
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;