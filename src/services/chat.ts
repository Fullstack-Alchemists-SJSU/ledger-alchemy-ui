import axios from 'axios';
import { ChatEndpoints } from './url-constants';
import { Message } from '../store/slice/message';

export const createNewChatService = (userId: number) => {
	return axios.post(ChatEndpoints.CREATE_CHAT, { user: userId });
};

export const getChatsByUserIdService = (userId: number) => {
	return axios.get(ChatEndpoints.GET_CHATS_BY_USER(userId));
};
