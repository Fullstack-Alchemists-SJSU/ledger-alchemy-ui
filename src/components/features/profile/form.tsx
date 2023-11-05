import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { RootState } from '../../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateProfile } from '../../../store/slice/user';
import Error from '../../common/error/Error';

type FormProps = {
	isEdit: boolean;
	onSuccess: () => void;
};

const Form = ({ isEdit, onSuccess }: FormProps) => {
	var { user, networkState, error } = useSelector((state: RootState) => state.rootReducer.user);
	const [updatedUser, setUpdatedUser] = useState(user);
	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (networkState === 'success') {
			onSuccess();
		}
	}, [networkState]);

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedUser((user) => ({ ...(updatedUser as any), firstName: e.target.value }));
		setErrors((errors) => ({ ...errors, firstName: '' }));
	};

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedUser((user) => ({ ...(updatedUser as any), lastName: e.target.value }));
		setErrors((errors) => ({ ...errors, lastName: '' }));
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedUser((user) => ({ ...(updatedUser as any), phone: e.target.value }));
		setErrors((errors) => ({ ...errors, phone: '' }));
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedUser((user) => ({ ...(updatedUser as any), email: e.target.value }));
		setErrors((errors) => ({ ...errors, email: '' }));
	};

	const hasUserChanged = () => {
		if (user?.firstName !== updatedUser?.firstName) {
			return true;
		} else if (user?.lastName !== updatedUser?.lastName) {
			return true;
		} else if (user?.phone !== updatedUser?.phone) {
			return true;
		} else if (user?.email !== updatedUser?.email) {
			return true;
		} else {
			return false;
		}
	};

	const handleUpdateClick = () => {
		if (!updatedUser?.firstName || updatedUser?.firstName.length < 3) {
			setErrors((errors) => ({ ...errors, firstName: 'First name must be at least 3 characters.' }));
		} else if (!updatedUser?.lastName || updatedUser?.lastName.length < 3) {
			setErrors((errors) => ({ ...errors, lastName: 'Last name must be at least 3 characters.' }));
		} else if (!updatedUser?.phone || updatedUser?.phone.length < 10) {
			setErrors((errors) => ({ ...errors, phone: 'Phone must be at least 10 characters.' }));
		} else if (
			!updatedUser?.email ||
			updatedUser?.email.length < 3 ||
			!updatedUser?.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
		) {
			setErrors((errors) => ({ ...errors, email: 'Enter a valid email.' }));
		} else {
			dispatch(updateProfile(updatedUser) as any);
		}
	};

	return (
		<div className="flex flex-1 flex-col px-0 md:px-[5rem]">
			{error && <Error text={error} />}
			<div className="flex flex-row gap-2 mb-4">
				<FormControl isInvalid={!!errors.firstName}>
					<FormLabel>First Name</FormLabel>
					<Input
						bgColor={isEdit ? 'white' : 'gray.100'}
						disabled={!isEdit}
						borderColor="gray"
						type="text"
						value={updatedUser?.firstName}
						onChange={handleFirstNameChange}
					/>
					<FormErrorMessage className="text-start">{errors.firstName}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!errors.lastName}>
					<FormLabel>Last Name</FormLabel>
					<Input
						bgColor={isEdit ? 'white' : 'gray.100'}
						disabled={!isEdit}
						borderColor="gray"
						type="text"
						value={updatedUser?.lastName}
						onChange={handleLastNameChange}
					/>
					<FormErrorMessage className="text-start">{errors.lastName}</FormErrorMessage>
				</FormControl>
			</div>
			<FormControl isInvalid={!!errors.phone} className="mb-4">
				<FormLabel>Phone</FormLabel>
				<Input
					bgColor={isEdit ? 'white' : 'gray.100'}
					disabled={!isEdit}
					borderColor="gray"
					type="tel"
					value={updatedUser?.phone}
					onChange={handlePhoneChange}
				/>
				<FormHelperText className="text-start">We never share your phone.</FormHelperText>
				<FormErrorMessage className="text-start">{errors.phone}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.email} className="mb-4">
				<FormLabel>Email</FormLabel>
				<Input
					bgColor={isEdit ? 'white' : 'gray.100'}
					disabled={!isEdit}
					borderColor="gray"
					type="email"
					value={updatedUser?.email}
					onChange={handleEmailChange}
				/>
				<FormHelperText className="text-start">We never share your email.</FormHelperText>
				<FormErrorMessage className="text-start">{errors.email}</FormErrorMessage>
			</FormControl>
			{isEdit && (
				<FormControl className="mb-4 text-center">
					<Button
						isLoading={networkState === 'loading'}
						loadingText="Please wait"
						type="button"
						colorScheme="linkedin"
						isDisabled={!hasUserChanged()}
						onClick={() => handleUpdateClick()}
					>
						Update Profile
					</Button>
				</FormControl>
			)}
		</div>
	);
};

export default Form;
