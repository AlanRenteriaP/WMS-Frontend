"use client"; // Mark this file as a Client Component

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import Image from "next/image";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email || !password) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('token', data.token);

                // Redirect to another page after successful login
                router.push('/dashboard');
            } else {
                // Handle login failure
                setError('Login failed. Please check your email and password.');
            }
        } catch (error) {
            setError('An error occurred during login. Please try again.');
            console.error('An error occurred during login:', error);
        } finally {
            setLoading(false);
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
                        src="/reto-logo.png"
                        alt="Logo"
                        className="dark:invert"
                        width={500}
                        height={391.6954}
                        priority
                    />
                    <Typography component="h1" variant="h5">
                        Sign in to your account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                {error}
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
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
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
