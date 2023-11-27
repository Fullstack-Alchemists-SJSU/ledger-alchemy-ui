const URLConstantsBase = {
	BASE_URL: 'http://localhost:3100',
};

const V1Routes = {
	BASE_V1: `${URLConstantsBase.BASE_URL}/api/v1`,
};

export const UserEndpoints = {
	REGISTER: `http://localhost:3000/api/v1/user`,
	LOGIN: `http://localhost:3000/api/v1/user/login`,
	GOOGLE_SIGN_UP: `http://localhost:3000/api/v1/user/auth/google`,
	UPDATE_PROFILE: (id: string) => `http://localhost:3000/api/v1/user/${id}`,
};

export const ChatEndpoints = {
	/**
	 * Chat Routes
	 */
	CREATE_CHAT: `${V1Routes.BASE_V1}/chat`,
	GET_CHATS_BY_USER: (user: string) => `${V1Routes.BASE_V1}/chat/user/${user}`,
	COMPLETION: `${V1Routes.BASE_V1}/chat/stream`,
	DELETE_CHAT_BY_ID: (chatId: number) => `${V1Routes.BASE_V1}/chat/${chatId}`,

	/**
	 * Message Queue Routes
	 */
	ADD_TASK_TO_QUEUE: `${V1Routes.BASE_V1}/message-queue`,
};

export const SocketEndpoint = {
	BASE_URL: 'http://localhost:3333',
};
