import axios from 'axios';
import { AccountEndpoints } from './url-constants';

export const createLinkTokenService = (userSub: string, token: string) => {
	return axios.post(AccountEndpoints.LINK_TOKEN, { userSub }, { headers: { Authorization: `Bearer ${token}` } });
};

export const getAccessTokenService = (userSub: string, public_token: string, token: string) => {
	return axios.post(
		AccountEndpoints.ACCESS_TOKEN,
		{ userSub, public_token },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};

export const getAccountsByUserIdService = (userSub: string, token: string) => {
	return axios.post(
		AccountEndpoints.GET_ACCOUNTS_BY_USER,
		{ userSub },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};
