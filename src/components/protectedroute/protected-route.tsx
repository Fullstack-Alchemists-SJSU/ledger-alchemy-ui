import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const user = useSelector((state: RootState) => state.rootReducer.user);
	if (!user) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
