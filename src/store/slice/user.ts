import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	registrationType: string;
	googleId: string;
	token: string;
};

const initialState: UserState | null = null;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
		clearUser() {
			return null;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
