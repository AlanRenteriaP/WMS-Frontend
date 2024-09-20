// Explicitly mark this file as a Client Component
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import Image from "next/image";
import { useLoginUserMutation } from '@/lib/api';


interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

const LoginPage: React.FC = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // As we're using cookies, we don't need to check for token storage, just handle login status.
        if (!email || !password) {
            return; // Possibly set an error message about required fields
        }

        try {
            // Triggering the login mutation
            await loginUser({ email, password }).unwrap();
            router.push('/dashboard'); // Redirect on successful login
        } catch (error) {
            console.error('An error occurred during login:', error);
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                        backgroundColor: 'white',
                        borderRadius: 1,
                        boxShadow: 3,
                    }}
                >
                    <Image
                        src="/proyecto-logo.png"
                        alt="Logo"
                        width={500}
                        height={391.6954}
                        priority
                    />
                    <Typography component="h1" variant="h5">
                        Sign in to your account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} method="post">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error}
                        />
                        {error && (
                            <Typography sx={{ color: 'red', mt: 2 }}>
                                {'status' in error && (error as ApiError).data ? (error as ApiError).data.message || 'Login failed. Please check your email and password.' :
                                    'An unexpected error occurred. Please try again.'}
                            </Typography>
                        )}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                        <Box display="flex" justifyContent="space-between">
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
