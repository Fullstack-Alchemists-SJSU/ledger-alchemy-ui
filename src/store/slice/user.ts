import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NetworkState from '../networkstate';
import { loginService, registerService, updateProfileService } from '../../services/user';

export type User = {
	token: string;
	email: string;
	email_verified: string;
	name: string;
	nickname: string;
	picture: string;
	sub: string;
	updated_at: string;
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
		return response.data;
	} catch (error: any) {
		console.log('error', error);
		throw Error(error.response.data.message);
	}
});

export const register = createAsyncThunk(
	'user/register',
	async (user: { firstName: string; lastName: string; email: string; password: string; phone: string }) => {
		try {
			const response = await registerService(user);
			return response.data;
		} catch (error: any) {
			console.log('error', error);
			throw Error(error.response.data.message);
		}
	}
);

export const updateProfile = createAsyncThunk('user/updateProfile', async (user: User) => {
	try {
		const response = await updateProfileService(user);
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
		resetNetworkState(state) {
			state.networkState = 'idle';
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
		builder.addCase(updateProfile.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(updateProfile.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.user = action.payload;
			state.error = undefined;
		});
		builder.addCase(updateProfile.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
	},
});

export const { setUser, clearUser, resetNetworkState } = userSlice.actions;

export default userSlice.reducer;
