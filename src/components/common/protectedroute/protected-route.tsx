import { Navigate } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }: { children: React.ComponentType }): JSX.Element => {
	const { isAuthenticated } = useAuth0();

	const ProtectedComponent = withAuthenticationRequired(children);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <ProtectedComponent />;
};

export default ProtectedRoute;
