import { FormControl, FormLabel, Input, Button, FormErrorMessage, FormHelperText, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

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

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value);
	};

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const validateForm = () => {
		if (!firstName || firstName.length < 3) {
			setErrors((errors) => ({ ...errors, firstName: 'First name must be at least 3 characters.' }));
		} else {
			setErrors((errors) => ({ ...errors, firstName: '' }));
		}

		if (!lastName || lastName.length < 3) {
			setErrors((errors) => ({ ...errors, lastName: 'Last name must be at least 3 characters.' }));
		} else {
			setErrors((errors) => ({ ...errors, lastName: '' }));
		}

		if (!phone || phone.length < 10) {
			setErrors((errors) => ({ ...errors, phone: 'Phone must be at least 10 characters.' }));
		} else {
			setErrors((errors) => ({ ...errors, phone: '' }));
		}

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
			<div className="flex flex-row gap-2 mb-4">
				<FormControl isInvalid={errors.firstName ? true : false}>
					<FormLabel>First Name</FormLabel>
					<Input type="text" value={firstName} onChange={handleFirstNameChange} />
					<FormErrorMessage>{errors.firstName}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={errors.lastName ? true : false}>
					<FormLabel>Last Name</FormLabel>
					<Input type="text" value={lastName} onChange={handleLastNameChange} />
					<FormErrorMessage>{errors.lastName}</FormErrorMessage>
				</FormControl>
			</div>
			<FormControl isInvalid={errors.phone ? true : false} className="mb-4">
				<FormLabel>Phone</FormLabel>
				<Input type="tel" value={phone} onChange={handlePhoneChange} />
				<FormHelperText>We never share your phone.</FormHelperText>
				<FormErrorMessage>{errors.phone}</FormErrorMessage>
			</FormControl>
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
				<Button type="button" colorScheme="blackAlpha" onClick={() => validateForm()}>
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
		</div>
	);
};
export default Form;
