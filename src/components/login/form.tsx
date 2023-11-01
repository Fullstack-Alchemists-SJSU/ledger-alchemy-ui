import { FormControl, FormLabel, Input, Button, FormErrorMessage, FormHelperText, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import useGoogleLogin from '../../hooks/useGoogleLogin';
import URLConstants from '../../services/url-constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Form = () => {
	const { handleLogin } = useGoogleLogin(URLConstants.GOOGLE_SIGN_UP);
	const user = useSelector((state: RootState) => state.rootReducer.user);
	const navigation = useNavigate();

	useEffect(() => {
		if (!user) {
			const google = (window as any).google;
			if (google) {
				google.accounts.id.initialize({
					client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
					callback: handleLogin,
				});

				google.accounts.id.prompt();
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
			navigation('/profile');
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
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const validateForm = () => {
		if (!email || (email.length < 3 && !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i))) {
			setErrors((errors) => ({ ...errors, email: 'Email must be at least 3 characters.' }));
		} else {
			setErrors((errors) => ({ ...errors, email: '' }));
		}

		if (!password || password.length < 8) {
			setErrors((errors) => ({ ...errors, password: 'Password must be at least 8 characters.' }));
		} else {
			setErrors((errors) => ({ ...errors, password: '' }));
		}
	};

	return (
		<div className="min-w-full px-8">
			<div className="text-2xl font-bold text-center mb-8">Getting Started.</div>
			<FormControl isInvalid={errors.email ? true : false} className="mb-4">
				<FormLabel>Email</FormLabel>
				<Input type="email" value={email} onChange={handleEmailChange} />
				<FormHelperText>We never share your email.</FormHelperText>
				<FormErrorMessage>{errors.email}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={errors.password ? true : false} className="mb-4">
				<FormLabel>Password</FormLabel>
				<Input type="password" value={password} onChange={handlePasswordChange} />
				<FormHelperText>Must be at least 8 characters.</FormHelperText>
				<FormErrorMessage>{errors.password}</FormErrorMessage>
			</FormControl>
			<FormControl className="mb-4 text-center">
				<Button type="button" colorScheme="facebook" onClick={() => validateForm()}>
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
