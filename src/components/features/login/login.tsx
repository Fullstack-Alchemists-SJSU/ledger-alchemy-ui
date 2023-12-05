import { useState, useEffect } from 'react';
import { Button, Image } from '@chakra-ui/react';
import Banner from '../signup/assets/banner.png';
import ResponsiveCenteredCard from '../../common/responsive/ResponsiveCenteredCard';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../store/slice/user';
import { RootState } from '../../../store/store';

const Login = (): JSX.Element => {
	const [width, _] = useState(window.innerWidth);
	const { user: storedUser } = useSelector((state: RootState) => state.rootReducer.user);
	const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			(async () => {
				const token = await getAccessTokenSilently();
				dispatch(setUser({ ...user, token }));
				navigate('/');
			})();
		}
	}, [user]);

	return (
		<ResponsiveCenteredCard>
			<div className="flex flex-row flex-1">
				<div className="flex flex-col flex-1 justify-center overflow-auto items-center">
					<Button type="button" colorScheme="facebook" onClick={() => loginWithRedirect()}>
						{isAuthenticated ? 'Logout' : 'Login'}
					</Button>
					{/* <Form />
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
					</div> */}
				</div>

				{width >= 640 && (
					<div className="flex flex-1 invisible md:visible">
						<Image src={Banner} objectFit="cover" className="flex-1 rounded-tr-lg rounded-br-lg" />
					</div>
				)}
			</div>
		</ResponsiveCenteredCard>
	);
};

export default Login;
