// src/lib/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserRole {
    role_name: string;
    role_key: string;
}

interface UserState {
    userId: number | null;
    roles: UserRole[] | null;
    name: string | null;
    job_title: string | null;
    email: string | null;
    role_key: string | null; // Add this line
}

const initialState: UserState = {
    userId: null,
    roles: null,
    name: null,
    job_title: null,
    email: null,
    role_key: null, // Add this line
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload.userId;
            state.roles = action.payload.roles;
            state.name = action.payload.name;
            state.job_title = action.payload.job_title;
            state.email = action.payload.email;
            state.role_key = action.payload.role_key; // Add this line
        },
        clearUser: (state) => {
            state.userId = null;
            state.roles = null;
            state.name = null;
            state.job_title = null;
            state.email = null;
            state.role_key = null; // Add this line
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
