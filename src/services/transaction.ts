import axios from 'axios';
import { TransactionEndpoints } from './url-constants';

export const getTransactionsByUserIdService = (userSub: string) => {
    return axios.post(TransactionEndpoints.GET_TRANSACTIONS, { userSub });
}

export const syncTransactionsByUserIdService = (userSub: string) => {
    return axios.post(TransactionEndpoints.SYNC_TRANSACTIONS, { userSub });
}

export const readTransactionsByUserIdService = (userSub: string) => {
    return axios.post(TransactionEndpoints.READ_TRANSACITONS, { userSub });
}