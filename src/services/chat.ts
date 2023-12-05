import axios from 'axios';
import { ChatEndpoints } from './url-constants';

export const createNewChatService = (userSub: string, token: string) => {
	return axios.post(ChatEndpoints.CREATE_CHAT, { user: userSub }, { headers: { Authorization: `Bearer ${token}` } });
};

export const getChatsByUserIdService = (userSub: string) => {
	return axios.get(ChatEndpoints.GET_CHATS_BY_USER(userSub));
};

export const deleteChatByIdService = (chatId: number) => {
	return axios.delete(ChatEndpoints.DELETE_CHAT_BY_ID(chatId));
};
