import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/slice/user';

const Profile = () => {
	const user: any = useSelector((state: RootState) => state.rootReducer.user);
	const dispatch = useDispatch();

	return (
		<div>
			<h1>{user.firstName}</h1>
			<button onClick={() => dispatch(clearUser())}>Logout</button>
		</div>
	);
};

export default Profile;
