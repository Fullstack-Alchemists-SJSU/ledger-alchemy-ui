import axios from 'axios';
import { AccountEndpoints } from './url-constants';

export const createLinkTokenService = (userSub: string) => {
    return axios.post(AccountEndpoints.LINK_TOKEN, { userSub });
};

export const getAccessTokenService = (userSub: string, public_token: string) => {
    return axios.post(AccountEndpoints.ACCESS_TOKEN, { userSub, public_token });
};

export const getAccountsByUserIdService = (userSub: string) => {
    return axios.post(AccountEndpoints.GET_ACCOUNTS_BY_USER, { userSub });
}
