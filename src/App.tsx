import './App.css';
import Login from './components/features/login/login';
import ProtectedRoute from './components/common/protectedroute/protected-route';
import Signup from './components/features/signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/features/profile/profile';

function App() {
	return (
		<div className="bg-slate-200">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
