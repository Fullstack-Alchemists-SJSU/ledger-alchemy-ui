import { FormControl, FormLabel, Input, Button, FormErrorMessage, FormHelperText, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import useGoogleLogin from '../../../hooks/useGoogleLogin';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../../store/slice/user';
import Error from '../../common/error/Error';

const Form = () => {
	const { handleLogin } = useGoogleLogin();
	const { user, networkState, error } = useSelector((state: RootState) => state.rootReducer.user);
	const navigation = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			const google = (window as any).google;
			if (google) {
				google.accounts.id.initialize({
					client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
					callback: handleLogin,
				});

				if (!user || user == null) {
					google.accounts.id.prompt();
				}
				google.accounts.id.renderButton(document.getElementById('loginDiv'), {
					theme: 'outline',
					size: 'large',
				});
			} else {
				console.log('google is not defined');
			}
		}
	}, [handleLogin]);

	useEffect(() => {
		if (user) {
			navigation('/');
		}
	}, [user]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrors((errors) => ({ ...errors, email: '' }));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrors((errors) => ({ ...errors, password: '' }));
	};

	const handleLoginClick = () => {
		if (!email || email.length < 3 || !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
			setErrors((errors) => ({ ...errors, email: 'Enter a valid email.' }));
		} else if (!password || password.length < 8) {
			setErrors((errors) => ({ ...errors, password: 'Password must be at least 8 characters.' }));
		} else {
			if (networkState === 'idle' || networkState === 'error') {
				dispatch(login({ email, password }) as any);
			}
		}
	};

	return (
		<div className="min-w-full px-8">
			<div className="text-2xl font-bold text-center mb-8">Login</div>
			{error && <Error text={error} />}
			<FormControl isInvalid={errors.email ? true : false} className="mb-4">
				<FormLabel>Email</FormLabel>
				<Input type="email" value={email} onChange={handleEmailChange} placeholder="john@example.com" />
				<FormErrorMessage>{errors.email}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={errors.password ? true : false} className="mb-4">
				<FormLabel>Password</FormLabel>
				<Input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
				<FormErrorMessage>{errors.password}</FormErrorMessage>
			</FormControl>
			<FormControl className="mb-4 text-center">
				<Button type="button" colorScheme="facebook" onClick={() => handleLoginClick()}>
					Login
				</Button>
			</FormControl>

			<div className="flex flex-row items-center">
				<hr className="flex-1" />
				<span className="mx-4 text-gray-400">Or Login With</span>
				<hr className="flex-1" />
			</div>
			<div className="flex flex-row gap-4 justify-center my-6">
				<div id="loginDiv"></div>
			</div>

			<div className="text-center text-gray-400">
				Dont have an account?
				{}{' '}
				<Link to="/signup" className="underline text-gray-500">
					Create one!
				</Link>
			</div>
		</div>
	);
};
export default Form;
