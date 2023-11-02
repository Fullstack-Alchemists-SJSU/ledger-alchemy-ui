const URLConstantsBase = {
	BASE_URL: 'http://localhost:3000',
};

const URLConstants = {
	GOOGLE_SIGN_UP: `${URLConstantsBase.BASE_URL}/api/v1/user/auth/google`,
	LOGIN: `${URLConstantsBase.BASE_URL}/api/v1/user/login`,
};

export default URLConstants;
