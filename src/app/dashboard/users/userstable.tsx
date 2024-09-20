import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';

interface Role {
    role_name: string;
    role_key: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    job_title: string;
    employment_start_date: string;
    roles: Role[];
}

interface UsersTableProps {
    users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" gutterBottom component="div" sx={{ padding: '16px' }}>
                User List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Employment Start Date</TableCell>
                        <TableCell>Roles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.job_title}</TableCell>
                            <TableCell>
                                {new Date(user.employment_start_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {user.roles.map((role, index) => (
                                    <div key={index}>
                                        <strong>{role.role_name}</strong> ({role.role_key})
                                    </div>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;