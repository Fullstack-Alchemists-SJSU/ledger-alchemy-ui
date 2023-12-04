import BaseContainer from '../../common/responsive/BaseContainer';
import Toolbar from '../../common/toolbar/Toolbar';
import { Button } from '@chakra-ui/react';
import Form from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useState } from 'react';

const Profile = () => {
	const { user } = useSelector((state: RootState) => state.rootReducer.user);
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();
	return (
		<BaseContainer>
			<div className="flex flex-col flex-1">
				<Toolbar title="Profile" />
				<div className="flex flex-1 flex-col p-4">
					<div className="flex flex-1 flex-row max-h-[10vh] align-middle">
						<div className="self-start flex-row flex-1 my-auto font-semibold">Welcome, {user?.name} </div>
						<Button className="self-end my-auto" colorScheme="linkedin" onClick={() => setEdit(!edit)}>
							{edit ? 'Cancel' : 'Edit Profile'}
						</Button>
					</div>
					<div className="flex flex-1 flex-col md:flex-row lg:flex-row items-center">
						<Form isEdit={edit} onSuccess={() => setEdit(false)} />
						<div className="flex- flex-1 flex-col">content</div>
					</div>
				</div>
			</div>
		</BaseContainer>
	);
};

export default Profile;
