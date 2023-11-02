import axios from 'axios';
import URLConstants from './url-constants';

export function loginService(email: string, password: string) {
	return axios.post(URLConstants.LOGIN, {
		email,
		password,
	});
}
