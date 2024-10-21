// src/app/dashboard/Sidebar.tsx


// Sidebar.tsx
import React, { FC } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Link as MuiLink,
    Drawer,
} from '@mui/material';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useDecodeTokenQuery } from '@/lib/api/auth/authApiSlice';

interface MenuItem {
    text: string;
    path: string;
}

interface Category {
    text: string;
    icon: React.ReactNode;
    items: MenuItem[];
}

type RoleKey =
    | 'admin'
    | 'staff'
    | 'supplier'
    | 'client'
    | 'supervisor'
    | 'auditor'
    | 'finance_manager'
    | 'report_viewer';

interface Config {
    [key: string]: Category[];
}

interface Role {
    role_key: RoleKey;
}

interface Payload {
    roles: Role[];
}

interface DecodeTokenResponse {
    payload: Payload;
}

const Sidebar: FC = () => {
    const theme = useTheme();
    const iconStyle = { fontSize: '2rem', color: theme.palette.primary.main };

    const { data, error, isLoading } = useDecodeTokenQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data</div>;

    const role = (data as DecodeTokenResponse)?.payload?.roles?.[0]?.role_key || 'staff';

    const config: Config = {
        admin: [
            // {
            //     text: 'Point of Sale',
            //     icon: <DashboardIcon sx={iconStyle} />,
            //     items: [
            //         { text: 'Sales Overview', path: '/dashboard' },
            //         { text: 'Transaction History', path: '/dashboard' },
            //         { text: 'Customers', path: '/dashboard' },
            //     ],
            // },
            // {
            //     text: 'Inventory Management',
            //     icon: <InventoryIcon sx={iconStyle} />,
            //     items: [
            //         { text: 'Inventory Levels', path: '/dashboard/productsmanagement/products' },
            //         { text: 'Stock Adjustments', path: '/dashboard/productsmanagement/sourcestores' },
            //         { text: 'Reorder Points', path: '/dashboard/inventory' },
            //     ],
            // },
            {
                text: 'Products Management',
                icon: <ShoppingBasketIcon sx={iconStyle} />,
                items: [
                    { text: 'Ingredients', path: '/dashboard/productsmanagement/ingredients' },
                    { text: 'Products', path: '/dashboard/productsmanagement/products' },
                    { text: 'Brands', path: '/dashboard/productsmanagement/brands' },
                    { text: 'Supplier Stores', path: '/dashboard/productsmanagement/suppliers' },
                    { text: 'Units', path: '/dashboard/productsmanagement/units' },
                ],
            },
            // {
            //     text: 'Purchasing',
            //     icon: <PeopleIcon sx={iconStyle} />,
            //     items: [
            //         { text: 'Purchase Orders', path: '/dashboard/clients' },
            //         { text: 'Suppliers', path: '/dashboard/client-stores' },
            //     ],
            // },
            // {
            //     text: 'Recipes',
            //     icon: <AssignmentIcon sx={iconStyle} />,
            //     items: [
            //         { text: 'Add Recipe', path: '/dashboard/routes' },
            //         { text: 'Manage Recipes', path: '/dashboard/route-schedules' },
            //         { text: 'Manage Ingredients', path: '/dashboard/route-clients' },
            //     ],
            // },
            // {
            //     text: 'User Management',
            //     icon: <PeopleIcon sx={iconStyle} />,
            //     items: [
            //         { text: 'User Profiles', path: '/dashboard/users' },
            //         { text: 'Role Assignments', path: '/dashboard/roles' },
            //     ],
            // },
            // {
            //     text: 'Reports and Analytics',
            //     icon: <DashboardIcon sx={iconStyle} />,
            //     items: [
            //         { text: 'Sales Reports', path: '/dashboard/reports' },
            //         { text: 'Inventory Reports', path: '/dashboard/reports' },
            //         { text: 'Purchase Reports ', path: '/dashboard/reports' }
            //     ],
            // },
            {
                text: 'Settings',
                icon: <SettingsIcon sx={iconStyle} />,
                items: [
                    { text: 'User Settings', path: '/dashboard/user-settings' },
                    { text: 'System Settings', path: '/dashboard/system-settings' },
                ],
            },
            {
                text: 'Help & Support',
                icon: <HelpOutlineIcon sx={iconStyle} />,
                items: [{ text: 'FAQs and Assistance', path: '/dashboard/help' }],
            },
        ],
        staff: [
            {
                text: 'Staff',
                icon: <DashboardIcon sx={iconStyle} />,
                items: [{ text: 'Dashboard', path: '/user/dashboard' }],
            },
        ],
        supplier: [
            {
                text: 'Supplier',
                icon: <StorefrontIcon sx={iconStyle} />,
                items: [{ text: 'Dashboard', path: '/user/dashboard' }],
            },
        ],
        client: [
            {
                text: 'Client',
                icon: <PeopleIcon sx={iconStyle} />,
                items: [{ text: 'Dashboard', path: '/user/dashboard' }],
            },
        ],
        supervisor: [
            {
                text: 'Supervisor',
                icon: <AssignmentIcon sx={iconStyle} />,
                items: [{ text: 'Dashboard', path: '/user/dashboard' }],
            },
        ],
        auditor: [
            {
                text: 'Auditor',
                icon: <AssignmentIcon sx={iconStyle} />,
                items: [{ text: 'Dashboard', path: '/user/dashboard' }],
            },
        ],
        finance_manager: [
            {
                text: 'Financial Manager',
                icon: <DashboardIcon sx={iconStyle} />,
                items: [{ text: 'Dashboard', path: '/user/dashboard' }],
            },
        ],
        report_viewer: [
            {
                text: 'Report Viewer',
                icon: <DashboardIcon sx={iconStyle} />,
                items: [{ text: 'Dashboard', path: '/user/dashboard' }],
            },
        ],
    };


    const items: Category[] = config[role] || [];

    const linkStyles = {
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        padding: '10px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary.main,
            '& .MuiListItemIcon-root': {
                color: theme.palette.secondary.main,
            },
            '& .MuiListItemText-root .MuiTypography-root': {
                color: theme.palette.secondary.main,
            },
        },
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
            }}
        >
            <List style={{ width: '100%' }}>
                <ListItem style={{ justifyContent: 'center', marginBottom: 20 }}>
                    <Image src="/proyecto-mini-logo.png" alt="Logo" width={100} height={1000} layout="responsive" />
                </ListItem>
                {items.map((category: Category, index: number) => (
                    <Accordion
                        key={index}
                        disableGutters
                        sx={{ boxShadow: 'none', width: '100%', backgroundColor: 'transparent' }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{ paddingLeft: 2, paddingRight: 2 }}
                        >
                            <ListItemIcon sx={{ minWidth: 'auto', marginRight: 2 }}>{category.icon}</ListItemIcon>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
                            >
                                {category.text}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ paddingLeft: 4 }}>
                            <List component="div" disablePadding>
                                {category.items.map((item: MenuItem, idx: number) => (
                                    <ListItem key={idx} sx={{ width: '100%' }}>
                                        <Link href={item.path} passHref legacyBehavior>
                                            <MuiLink sx={linkStyles}>
                                                <ListItemText
                                                    primary={item.text}
                                                    primaryTypographyProps={{
                                                        sx: { color: theme.palette.text.primary, fontSize: '0.875rem' },
                                                    }}
                                                />
                                            </MuiLink>
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
