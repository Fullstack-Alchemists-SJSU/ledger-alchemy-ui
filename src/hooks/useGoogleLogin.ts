import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/user';

const useGoogleLogin = (url: string) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handleLogin = async (response: any) => {
		setLoading(true);

		axios
			.post(url, { credential: response.credential })
			.then((res) => {
				setLoading(false);
				if (res.data?.data) {
					dispatch(setUser(res.data.data));
				}
			})
			.catch((err) => {
				setError(err?.message);
			});
	};

	return { loading, error, handleLogin };
};

export default useGoogleLogin;
