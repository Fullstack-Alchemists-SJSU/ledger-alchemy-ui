const URLConstantsBase = {
	BASE_URL: 'http://localhost:3100',
};

const V1Routes = {
	BASE_V1: `${URLConstantsBase.BASE_URL}/api/v1`,
};

export const UserEndpoints = {
	REGISTER: `${V1Routes.BASE_V1}/user`,
	LOGIN: `${V1Routes.BASE_V1}/user/login`,
	GOOGLE_SIGN_UP: `${V1Routes.BASE_V1}/user/auth/google`,
	UPDATE_PROFILE: (id: number) => `${V1Routes.BASE_V1}/user/${id}`,
};

export const ChatEndpoints = {
	CREATE_CHAT: `${V1Routes.BASE_V1}/chat`,
	GET_CHATS_BY_USER: (user: number) => `${V1Routes.BASE_V1}/chat/user/${user}`,
	COMPLETION: `${V1Routes.BASE_V1}/chat/stream`,
};
