import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NetworkState from '../networkstate';
import { stat } from 'fs';
import { loginService, registerService } from '../../services/user';
import { CardFooter } from '@chakra-ui/react';
import { Axios, AxiosError } from 'axios';
import { debug } from 'console';

export type User = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	registrationType: string;
	googleId: string;
	token: string;
};

export type UserState = {
	user: User | null;
	networkState: NetworkState;
	error: string | undefined;
};

const initialState: UserState = {
	user: null,
	networkState: 'idle',
	error: undefined,
};

export const login = createAsyncThunk('user/login', async (credentials: { email: string; password: string }) => {
	try {
		const response = await loginService(credentials.email, credentials.password);
		console.log('response', response);
		return response.data;
	} catch (error: any) {
		console.log('error', error);
		throw Error(error.response.data.message);
	}
});

export const register = createAsyncThunk('user/register', async (user: { firstName: string; lastName: string; email: string; password: string; phone: string }) => {
	try {
		const response = await registerService(user);
		return response.data;
	} catch (error: any) {
		console.log('error', error);
		throw Error(error.response.data.message);
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			return { ...state, user: action.payload, networkState: 'success' };
		},
		clearUser() {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.user = action.payload;
			state.error = undefined;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
		builder.addCase(register.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.user = null;
			state.error = undefined;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.networkState = 'error';
			console.log('action', action);
			state.error = action.error.message;
		});
	},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
