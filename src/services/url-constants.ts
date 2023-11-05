const URLConstantsBase = {
	BASE_URL: 'http://localhost:3000',
};

const V1Routes = {
	BASE_V1: `${URLConstantsBase.BASE_URL}/api/v1`,
}

export const UserEndpoints = {
	REGISTER: `${V1Routes.BASE_V1}/user`,
	LOGIN: `${V1Routes.BASE_V1}/user/login`,
	GOOGLE_SIGN_UP: `${V1Routes.BASE_V1}/user/auth/google`,
};
