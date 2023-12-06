import axios from 'axios';
import { TransactionEndpoints } from './url-constants';

export const getTransactionsByUserIdService = (userSub: string, token: string) => {
	return axios.post(
		TransactionEndpoints.GET_TRANSACTIONS,
		{ userSub },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};

export const syncTransactionsByUserIdService = (userSub: string, token: string) => {
	return axios.post(
		TransactionEndpoints.SYNC_TRANSACTIONS,
		{ userSub },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};

export const readTransactionsByUserIdService = (userSub: string, token: string) => {
	return axios.post(
		TransactionEndpoints.READ_TRANSACITONS,
		{ userSub },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};
