import './App.css';
import Login from './components/login/login';
import ProtectedRoute from './components/protectedroute/protected-route';
import Signup from './components/signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/profile/profile';
import Dashboard from './components/dashboard/dashboard';

function App() {
	return (
		<div className="bg-slate-200">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path = "/dashboard" element = {<Dashboard/>}/>
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
