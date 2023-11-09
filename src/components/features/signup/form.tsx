import { FormControl, FormLabel, Input, Button, FormErrorMessage, FormHelperText, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { register, resetNetworkState } from '../../../store/slice/user';
import Error from '../../common/error/Error';
import ModalComponent from '../../common/modal/Modal';
import { text } from 'stream/consumers';
import { useNavigate } from 'react-router-dom';

const Form = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
	});

	const { networkState, error } = useSelector((state: RootState) => state.rootReducer.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value);
		setErrors((errors) => ({ ...errors, firstName: '' }));
	};

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
		setErrors((errors) => ({ ...errors, lastName: '' }));
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
		setErrors((errors) => ({ ...errors, phone: '' }));
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrors((errors) => ({ ...errors, email: '' }));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrors((errors) => ({ ...errors, password: '' }));
	};

	const handleSignupClick = () => {
		if (!firstName || firstName.length < 3) {
			setErrors((errors) => ({ ...errors, firstName: 'First name must be at least 3 characters.' }));
		} else if (!lastName || lastName.length < 3) {
			setErrors((errors) => ({ ...errors, lastName: 'Last name must be at least 3 characters.' }));
		} else if (!phone || phone.length < 10) {
			setErrors((errors) => ({ ...errors, phone: 'Phone must be at least 10 characters.' }));
		} else if (!email || email.length < 3 || !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
			setErrors((errors) => ({ ...errors, email: 'Enter a valid email.' }));
		} else if (!password || password.length < 8) {
			setErrors((errors) => ({ ...errors, password: 'Password must be at least 8 characters.' }));
		} else {
			dispatch(register({ firstName, lastName, phone, email, password }) as any);
		}
	};

	return (
		<div className="min-w-full px-8 py-4 h-fit">
			<div className="text-2xl font-bold text-center mb-8">Getting Started.</div>
			{error && <Error text={error} />}
			{networkState === 'success' && (
				<ModalComponent
					isOpen={networkState === 'success'}
					title="Registration Complete"
					message="You have registered successfully. Please login to continue."
					primaryButtonAction={{
						text: 'Continue',
						action: () => {
							dispatch(resetNetworkState());
							navigate('/');
						},
					}}
				/>
			)}
			<div className="flex flex-row gap-2 mb-4">
				<FormControl isInvalid={!!errors.firstName}>
					<FormLabel>First Name</FormLabel>
					<Input type="text" value={firstName} onChange={handleFirstNameChange} />
					<FormErrorMessage className="text-start">{errors.firstName}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!errors.lastName}>
					<FormLabel>Last Name</FormLabel>
					<Input type="text" value={lastName} onChange={handleLastNameChange} />
					<FormErrorMessage className="text-start">{errors.lastName}</FormErrorMessage>
				</FormControl>
			</div>
			<FormControl isInvalid={!!errors.phone} className="mb-4">
				<FormLabel>Phone</FormLabel>
				<Input type="tel" value={phone} onChange={handlePhoneChange} />
				<FormHelperText className="text-start">We never share your phone.</FormHelperText>
				<FormErrorMessage className="text-start">{errors.phone}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.email} className="mb-4">
				<FormLabel>Email</FormLabel>
				<Input type="email" value={email} onChange={handleEmailChange} />
				<FormHelperText className="text-start">We never share your email.</FormHelperText>
				<FormErrorMessage className="text-start">{errors.email}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.password} className="mb-4">
				<FormLabel>Password</FormLabel>
				<Input type="password" value={password} onChange={handlePasswordChange} />
				<FormHelperText className="text-start">Must be at least 8 characters.</FormHelperText>
				<FormErrorMessage className="text-start">{errors.password}</FormErrorMessage>
			</FormControl>
			<FormControl className="mb-4 text-center">
				<Button
					isLoading={networkState === 'loading'}
					loadingText="Please wait"
					type="button"
					colorScheme="linkedin"
					onClick={() => handleSignupClick()}
				>
					Submit
				</Button>
			</FormControl>

			{/* <div className="flex flex-row items-center">
				<hr className="flex-1" />
				<span className="mx-4 text-gray-400">Or Sign Up With</span>
				<hr className="flex-1" />
			</div>
			<div className="flex flex-row gap-4 justify-center my-6">
				<div id="loginDiv"></div>
				<IconButton
					size="lg"
					aria-label="Facebook Login"
					rounded="full"
					className="flex- flex-row"
					colorScheme="facebook"
					icon={<FaFacebook />}
				/>
				<IconButton
					size="lg"
					aria-label="Twitter Login"
					rounded="full"
					className="flex- flex-row"
					colorScheme="twitter"
					icon={<FaTwitter />}
				/>
			</div> */}

			<div className="text-center text-gray-400">
				Already have an account?
				{}{' '}
				<Link to="/" className="underline text-gray-500">
					Login!
				</Link>
			</div>
		</div>
	);
};
export default Form;
