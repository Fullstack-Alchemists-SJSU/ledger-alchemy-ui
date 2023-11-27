import axios from 'axios';
import { UserEndpoints } from './url-constants';
import { User } from '../store/slice/user';

export function loginService(email: string, password: string) {
	return axios.post(UserEndpoints.LOGIN, {
		email,
		password,
	});
}

export function registerService(user: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
}) {
	return axios.post(UserEndpoints.REGISTER, {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password,
		phone: user.phone,
		registrationType: 'EMAIL',
	});
}

export function updateProfileService(user: User) {
	return axios.put(UserEndpoints.UPDATE_PROFILE(user.sub), user, {
		headers: { Authorization: `Bearer ${user.sub}` },
	});
}
