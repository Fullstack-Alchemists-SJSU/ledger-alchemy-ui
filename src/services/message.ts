import axios from 'axios';
import { Message } from '../store/slice/message';
import { ChatEndpoints } from './url-constants';

export const addMessageTaskToQueueService = async (messages: Message[], userId: number, token: string) => {
	return axios.post(
		ChatEndpoints.ADD_TASK_TO_QUEUE,
		{ messages, userId },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
