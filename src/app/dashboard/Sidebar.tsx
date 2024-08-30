// Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ role }) => {
    const config = {
        admin: [
            { text: 'Admin', icon: <DashboardIcon />, path: '/admin/dashboard' },
            { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
        ],
        staff: [
            { text: 'staff', icon: <DashboardIcon />, path: '/user/dashboard' },
        ],
        supplier: [
            { text: 'Supplier', icon: <DashboardIcon />, path: '/user/dashboard' },
        ],
        client: [
            { text: 'Client', icon: <DashboardIcon />, path: '/user/dashboard' },
        ],
        supervisor: [
            { text: 'Supervisor', icon: <DashboardIcon />, path: '/user/dashboard' },
        ],
        auditor: [
            { text: 'Auditor', icon: <DashboardIcon />, path: '/user/dashboard' },
        ],
        finance_manager: [
            { text: 'Financial Manager', icon: <DashboardIcon />, path: '/user/dashboard' },
        ],
        report_viewer: [
            { text: '"Report Viewer"', icon: <DashboardIcon />, path: '/user/dashboard' },
        ],
    };

    return (
        <Drawer variant="permanent">
            <List>
                {config[role].map((item, index) => (
                    <ListItem button key={index} component="a" href={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;

