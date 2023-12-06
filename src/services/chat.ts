import axios from 'axios';
import { ChatEndpoints } from './url-constants';

export const createNewChatService = (userSub: string, token: string) => {
	return axios.post(ChatEndpoints.CREATE_CHAT, { user: userSub }, { headers: { Authorization: `Bearer ${token}` } });
};

export const getChatsByUserIdService = (userSub: string, token: string) => {
	return axios.get(ChatEndpoints.GET_CHATS_BY_USER(userSub), { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteChatByIdService = (chatId: number, token: string) => {
	return axios.delete(ChatEndpoints.DELETE_CHAT_BY_ID(chatId), { headers: { Authorization: `Bearer ${token}` } });
};
