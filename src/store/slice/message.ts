import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NetworkState from '../networkstate';
import { addMessageTaskToQueueService } from '../../services/message';

export enum Role {
	SYSTEM = 'system',
	USER = 'user',
	ASSISTANT = 'assistant',
}

export type Message = {
	id: number;
	chat: number;
	content: string;
	role: Role;
	timestamp: string;
};

export type MessageState = {
	messages: Message[];
	networkState: NetworkState;
	error: string | undefined;
};

const initialState: MessageState = {
	messages: [],
	networkState: 'idle',
	error: undefined,
};

export const addMessageTaskToQueue = createAsyncThunk(
	'message/addMessageTaskToQueue',
	async (data: { messages: Message[]; userId: number; token: string }) => {
		try {
			const response = await addMessageTaskToQueueService(data.messages, data.userId, data.token);
			return response.data;
		} catch (error: any) {
			console.log('error', error);
			throw Error(error.response.data.message);
		}
	}
);

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessages: (state, action) => {
			state.messages = action.payload;
		},

		addMessage: (state, action) => {
			if (action.payload && action.payload.id > 0) {
				state.messages = state.messages.map((message) => {
					if (message && message.timestamp === action.payload.timestamp) {
						message = action.payload;
					}
					return message;
				});
			} else {
				state.messages = [...state.messages, action.payload];
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addMessageTaskToQueue.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(addMessageTaskToQueue.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.error = undefined;
		});
		builder.addCase(addMessageTaskToQueue.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
	},
});

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
