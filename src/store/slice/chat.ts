import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NetworkState from '../networkstate';
import { createNewChatService, deleteChatByIdService, getChatsByUserIdService } from '../../services/chat';
import message, { Message, Role, setMessages } from './message';

export type Chat = {
	id: number;
	user: number;
	title: string;
	createdAt: string;
};

export type ChatState = {
	chats: Chat[];
	networkState: NetworkState;
	error: string | undefined;
};

const initialState: ChatState = {
	chats: [],
	networkState: 'idle',
	error: undefined,
};

const ASSISTANT_PRESET = `
You are a expert accountant with a PhD in finance. You have 30+ years of experience of managing accounts and creating budgets. 

Now, you are applying your finance knowledge to help individuals manage their finances. You will answer only finance related questions. Any question which is not related to the individual's finance management, is out of your scope. 

Some of your responsibilities will include but not limited to:

1. Answering any finance related questions.
2. If asked, creating budget plans for the individual to achieve his/her goals. You will be provided the relevant transactions data along with the goal.
3. Providing insights based on the transactions data provided.

Answer the questions in reasonably small chunks. Limit a chunk to a maximum of 4 lines. If you respond with all the information at once, the user might not be able to process it all at once. Ask if the user has understood the chunk and ask if you can continue. If the user says yes, continue with the next chunk of the response.

Your name will be Alchemo.

Greet individuals in a simple way with your name. No need to mention how many years of experience you have or education level.
`;

export const systemPromptChat = (timestamp: string, chat: number): Message => ({
	id: 0,
	chat,
	content: ASSISTANT_PRESET,
	role: Role.SYSTEM,
	timestamp,
});

export const createNewChat = createAsyncThunk('chat/createNewChat', async (userId: number) => {
	try {
		const response = await createNewChatService(userId);
		return response.data;
	} catch (error: any) {
		console.log('error', error);
		throw Error(error.response.data.message);
	}
});

export const getChatsByUserId = createAsyncThunk('chat/getChatsByUserId', async (userId: number, { dispatch }) => {
	try {
		const response = await getChatsByUserIdService(userId);
		const messages = response.data
			.map((chat: Chat & { messages: Message[] }) =>
				chat.messages && chat.messages.length > 0 ? chat.messages : []
			)
			.flat();
		if (messages.length > 0) {
			dispatch(setMessages(messages));
		}
		return response.data.map((chat: Chat) => ({
			id: chat.id,
			title: chat.title,
			createdAt: chat.createdAt,
			user: chat.user,
		}));
	} catch (error: any) {
		console.log('error', error);
		throw Error(error.response.data.message);
	}
});

export const deleteChatById = createAsyncThunk('chat/deleteChatById', async (chatId: number) => {
	try {
		const response = await deleteChatByIdService(chatId);
		return chatId;
	} catch (error: any) {
		console.log('error', error);
		throw Error(error.response.data.message);
	}
});

const chatSlice: Slice = createSlice({
	name: 'chat',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createNewChat.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(createNewChat.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.chats.push(action.payload);
		});
		builder.addCase(createNewChat.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
		builder.addCase(getChatsByUserId.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(getChatsByUserId.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.chats = action.payload;
		});
		builder.addCase(getChatsByUserId.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});

		builder.addCase(deleteChatById.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(deleteChatById.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.chats = state.chats.filter((chat) => chat.id !== action.payload);
		});
		builder.addCase(deleteChatById.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
	},
});

export default chatSlice.reducer;
