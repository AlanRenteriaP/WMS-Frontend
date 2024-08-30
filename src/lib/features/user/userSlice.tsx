// src/lib/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userId: number | null;
    roles: string[] | null;
    name: string | null;
    role_key: string | null;
}

const initialState: UserState = {
    userId: null,
    roles: null,
    name: null,
    role_key: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload.userId;
            state.roles = action.payload.roles;
            state.name = action.payload.name;
            state.role_key = action.payload.role_key;
        },
        clearUser: (state) => {
            state.userId = null;
            state.roles = null;
            state.name = null;
            state.role_key = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
